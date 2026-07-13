import type { Locale } from './locale';

// 허브가 커질수록 여기 데이터만 추가하면 새 계산기가 목록에 등장 (라우트는 App.tsx에서 연결)
export type CalcCategory = 'business' | 'salary' | 'loan' | 'saving';

export interface CalculatorMeta {
  slug: string; // URL 경로이자 고유 id
  category: CalcCategory;
  icon: string; // 이모지
  status: 'live' | 'coming';
  name: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const CATEGORY_LABELS: Record<CalcCategory, Record<Locale, string>> = {
  business: { ko: '창업·사업', en: 'Business' },
  salary: { ko: '급여·노동', en: 'Salary & Work' },
  loan: { ko: '대출·금융', en: 'Loans & Finance' },
  saving: { ko: '저축·투자', en: 'Savings & Investing' },
};

export const CATEGORY_ORDER: CalcCategory[] = ['business', 'salary', 'loan', 'saving'];

export const CALCULATORS: CalculatorMeta[] = [
  {
    slug: 'cafe-profit',
    category: 'business',
    icon: '☕',
    status: 'live',
    name: { ko: '카페 월수익 계산기', en: 'Cafe Profit Calculator' },
    description: {
      ko: '창업 전, 하루 몇 잔 팔아야 남는지 계산',
      en: 'How many cups a day to break even',
    },
  },
  // 아래는 로드맵(준비 중) — 순서대로 실제 계산기로 채워 나감
  {
    slug: 'salary-net',
    category: 'salary',
    icon: '💰',
    status: 'live',
    name: { ko: '연봉 실수령액 계산기', en: 'Net Salary Calculator' },
    description: { ko: '세금·4대보험 뗀 월 실수령액', en: 'Take-home pay after tax' },
  },
  {
    slug: 'loan-repayment',
    category: 'loan',
    icon: '🏦',
    status: 'live',
    name: { ko: '대출 이자 계산기', en: 'Loan Repayment Calculator' },
    description: { ko: '원리금 월 상환액과 총이자', en: 'Monthly payment and total interest' },
  },
  {
    slug: 'compound-interest',
    category: 'saving',
    icon: '📈',
    status: 'coming',
    name: { ko: '복리 계산기', en: 'Compound Interest Calculator' },
    description: { ko: '시간이 만드는 복리 수익', en: 'Growth from compounding over time' },
  },
];
