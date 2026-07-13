export interface SalaryInput {
  annualSalary: number; // 연봉 (세전, 비과세 포함)
  taxFreeMonthly: number; // 월 비과세액 (식대 등)
  dependents: number; // 부양가족 수 (본인 포함)
}

export interface SalaryDeductions {
  nationalPension: number; // 국민연금 (월)
  healthInsurance: number; // 건강보험 (월)
  longTermCare: number; // 장기요양보험 (월)
  employmentInsurance: number; // 고용보험 (월)
  incomeTax: number; // 소득세 (월, 추정)
  localIncomeTax: number; // 지방소득세 (월, 소득세의 10%)
}

export interface SalaryResult {
  grossMonthly: number; // 월 세전 급여 (연봉 / 12)
  netMonthly: number; // 월 실수령액
  netAnnual: number; // 연 실수령액
  totalDeduction: number; // 월 공제액 합계
  deductions: SalaryDeductions; // 항목별 공제 내역
}

export interface SalaryLocationState {
  input: SalaryInput;
  result: SalaryResult;
}
