import { useMemo, useState } from 'react';
import type { SalaryInput, SalaryResult, SalaryDeductions } from '../types/salary';
import type { Locale } from '../config/locale';

// ─────────────────────────────────────────────────────────────
// 요율·공제 기준값 (2025년 기준). 매년 바뀌므로 여기만 갱신하면 됨.
//   - 4대보험 요율: 근로자 부담분만 반영
//   - 국민연금 상·하한: 2025.7~2026.6 적용 기준소득월액
// 실제 급여명세서의 소득세는 '근로소득 간이세액표'로 원천징수되고
// 연말정산에서 정산되므로, 아래 소득세는 '연간 추정 기준'의 참고값이다.
// ─────────────────────────────────────────────────────────────
const RATES = {
  nationalPension: 0.045, // 국민연금 4.5%
  healthInsurance: 0.03545, // 건강보험 3.545% (전체 7.09%의 절반)
  longTermCareOfHealth: 0.1295, // 장기요양 = 건강보험료 × 12.95%
  employmentInsurance: 0.009, // 고용보험(실업급여) 0.9%
  localIncomeTax: 0.1, // 지방소득세 = 소득세 × 10%
};

const PENSION_BASE_MAX = 6370000; // 국민연금 기준소득월액 상한
const PENSION_BASE_MIN = 400000; // 국민연금 기준소득월액 하한
const PERSONAL_DEDUCTION = 1500000; // 인적공제 1명당 연 150만원

const SALARY_DEFAULTS: SalaryInput = {
  annualSalary: 40000000,
  taxFreeMonthly: 200000, // 식대 비과세 한도(월 20만원)를 기본값으로
  dependents: 1, // 본인 포함
};

// 근로소득공제 (총급여 구간별) — 연 단위
function earnedIncomeDeduction(grossAnnual: number): number {
  if (grossAnnual <= 5_000_000) return grossAnnual * 0.7;
  if (grossAnnual <= 15_000_000) return 3_500_000 + (grossAnnual - 5_000_000) * 0.4;
  if (grossAnnual <= 45_000_000) return 7_500_000 + (grossAnnual - 15_000_000) * 0.15;
  if (grossAnnual <= 100_000_000) return 12_000_000 + (grossAnnual - 45_000_000) * 0.05;
  return 14_750_000 + (grossAnnual - 100_000_000) * 0.02;
}

// 종합소득 과세표준 구간별 산출세액 (누진공제 방식)
function incomeTaxFromBase(taxBase: number): number {
  if (taxBase <= 0) return 0;
  if (taxBase <= 14_000_000) return taxBase * 0.06;
  if (taxBase <= 50_000_000) return taxBase * 0.15 - 1_260_000;
  if (taxBase <= 88_000_000) return taxBase * 0.24 - 5_760_000;
  if (taxBase <= 150_000_000) return taxBase * 0.35 - 15_440_000;
  if (taxBase <= 300_000_000) return taxBase * 0.38 - 19_940_000;
  if (taxBase <= 500_000_000) return taxBase * 0.4 - 25_940_000;
  if (taxBase <= 1_000_000_000) return taxBase * 0.42 - 35_940_000;
  return taxBase * 0.45 - 65_940_000;
}

// 근로소득세액공제 (산출세액 기준). 한도는 총급여 구간에 따라 다름.
function earnedIncomeTaxCredit(computedTax: number, grossAnnual: number): number {
  const credit =
    computedTax <= 1_300_000
      ? computedTax * 0.55
      : 715_000 + (computedTax - 1_300_000) * 0.3;

  // 한도: 총급여 3,300만 이하 74만 / 7,000만 이하 66만~74만 구간 / 초과 50만~66만
  let limit: number;
  if (grossAnnual <= 33_000_000) {
    limit = 740_000;
  } else if (grossAnnual <= 70_000_000) {
    limit = Math.max(660_000, 740_000 - (grossAnnual - 33_000_000) * 0.008);
  } else {
    limit = Math.max(500_000, 660_000 - (grossAnnual - 70_000_000) * 0.5);
  }
  return Math.min(credit, limit);
}

// 월 소득세(추정): 연간 결정세액을 계산해 12로 나눔
function estimateMonthlyIncomeTax(
  grossAnnual: number,
  dependents: number,
  annualPension: number,
): number {
  const incomeAmount = grossAnnual - earnedIncomeDeduction(grossAnnual); // 근로소득금액
  const personalDeduction = PERSONAL_DEDUCTION * Math.max(1, dependents);
  const taxBase = Math.max(0, incomeAmount - personalDeduction - annualPension);
  const computedTax = incomeTaxFromBase(taxBase); // 산출세액
  const credit = earnedIncomeTaxCredit(computedTax, grossAnnual);
  const finalTax = Math.max(0, computedTax - credit); // 결정세액
  return finalTax / 12;
}

export function useSalaryCalculator(_locale: Locale) {
  const [input, setInput] = useState<SalaryInput>(SALARY_DEFAULTS);

  const updateField = (field: keyof SalaryInput, value: number) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const result: SalaryResult = useMemo(() => {
    const { annualSalary, taxFreeMonthly, dependents } = input;
    const grossMonthly = annualSalary / 12;

    if (annualSalary <= 0) {
      const empty: SalaryDeductions = {
        nationalPension: 0,
        healthInsurance: 0,
        longTermCare: 0,
        employmentInsurance: 0,
        incomeTax: 0,
        localIncomeTax: 0,
      };
      return {
        grossMonthly: 0,
        netMonthly: 0,
        netAnnual: 0,
        totalDeduction: 0,
        deductions: empty,
      };
    }

    // 4대보험·소득세는 과세소득(= 월급 − 비과세) 기준
    const taxableMonthly = Math.max(0, grossMonthly - taxFreeMonthly);
    const grossAnnualTaxable = taxableMonthly * 12;

    // 국민연금: 기준소득월액 상·하한 적용
    const pensionBase = Math.min(Math.max(taxableMonthly, PENSION_BASE_MIN), PENSION_BASE_MAX);
    const nationalPension = pensionBase * RATES.nationalPension;

    const healthInsurance = taxableMonthly * RATES.healthInsurance;
    const longTermCare = healthInsurance * RATES.longTermCareOfHealth;
    const employmentInsurance = taxableMonthly * RATES.employmentInsurance;

    const incomeTax = estimateMonthlyIncomeTax(
      grossAnnualTaxable,
      dependents,
      nationalPension * 12,
    );
    const localIncomeTax = incomeTax * RATES.localIncomeTax;

    const deductions: SalaryDeductions = {
      nationalPension: Math.round(nationalPension),
      healthInsurance: Math.round(healthInsurance),
      longTermCare: Math.round(longTermCare),
      employmentInsurance: Math.round(employmentInsurance),
      incomeTax: Math.round(incomeTax),
      localIncomeTax: Math.round(localIncomeTax),
    };

    const totalDeduction =
      deductions.nationalPension +
      deductions.healthInsurance +
      deductions.longTermCare +
      deductions.employmentInsurance +
      deductions.incomeTax +
      deductions.localIncomeTax;

    const netMonthly = grossMonthly - totalDeduction;

    return {
      grossMonthly,
      netMonthly,
      netAnnual: netMonthly * 12,
      totalDeduction,
      deductions,
    };
  }, [input]);

  return { input, updateField, result };
}
