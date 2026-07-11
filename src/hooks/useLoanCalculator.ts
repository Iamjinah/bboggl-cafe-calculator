import { useMemo, useState } from 'react';
import type { LoanInput, LoanResult } from '../types/loan';
import type { Locale } from '../config/locale';

// 통화권별 예시 기본값 (환율 변환 아님, 각 통화에서 그럴듯한 예시치)
const LOAN_DEFAULTS: Record<Locale, LoanInput> = {
  ko: { principal: 30000000, annualRate: 5, years: 5 },
  en: { principal: 30000, annualRate: 6, years: 5 },
};

export function useLoanCalculator(locale: Locale) {
  const [input, setInput] = useState<LoanInput>(LOAN_DEFAULTS[locale]);

  const updateField = (field: keyof LoanInput, value: number) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const result: LoanResult = useMemo(() => {
    const { principal, annualRate, years } = input;
    const n = Math.round(years * 12); // 총 상환 개월 수
    const r = annualRate / 100 / 12; // 월 이자율

    if (principal <= 0 || n <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0 };
    }

    // 원리금균등상환: 이자율 0%면 원금을 개월수로 균등 분할
    const monthlyPayment =
      r === 0 ? principal / n : (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - principal;

    return { monthlyPayment, totalInterest, totalPayment };
  }, [input]);

  return { input, updateField, result };
}
