import type { Locale } from '../config/locale';

const ko = {
  badge: '☕ 카큘레이터',
  title: '카페 창업 전, 하루 몇 잔 팔아야 남는지 계산해보세요.',
  subtitle: '월세·인건비 등 고정비와 판매 정보를 입력하면 예상 손익을 바로 확인할 수 있어요.',
  sectionFixedCost: '고정비',
  sectionSalesInfo: '판매 정보',
  fieldRent: '월세',
  fieldMaintenanceFee: '관리비',
  fieldLaborCost: '인건비',
  fieldOtherFixedCost: '기타 고정비',
  fieldAvgPrice: '음료 1잔 평균 판매가',
  fieldAvgCost: '음료 1잔 평균 원가',
  fieldDailyCups: '하루 평균 판매잔 수',
  fieldBusinessDays: '월 영업일수',
  unitCups: '잔',
  unitDays: '일',
  calculateButton: '결과 확인하기',
  resultProfit: '예상 월순이익',
  resultRevenue: '예상 월매출',
  resultExpense: '예상 월지출',
  resultBreakEven: '하루 손익분기점 판매잔 수',
  breakEvenUnavailable: '계산 불가 (판매가 ≤ 원가)',
  resultPageTitle: '계산 결과',
  resultPageSubtitle: '입력하신 정보를 기준으로 예상 손익을 계산했어요.',
  recalculateButton: '다시 계산하기',
  footerDisclaimer:
    '본 계산기는 단순 참고용이며 실제 수익은 상권, 운영 방식, 세금, 계절, 인건비에 따라 달라질 수 있습니다.',
  footerPrivacyLink: '개인정보처리방침',
  adCloseLabel: '광고 닫기',
  adDialogLabel: '광고',
  metaTitle: '카큘레이터 - 손쉬운 카페 수익 계산',
  metaDescription: '카페 창업 전, 하루 몇 잔 팔아야 남는지 계산해보는 카큘레이터 월수익 계산기',
  privacyMetaTitle: '개인정보처리방침 | 카큘레이터',
};

const en: typeof ko = {
  badge: '☕ Ka-culator',
  title: 'Before opening a cafe, find out how many cups a day you need to sell to break even.',
  subtitle:
    'Enter fixed costs like rent and labor plus your sales info to see your estimated profit instantly.',
  sectionFixedCost: 'Fixed Costs',
  sectionSalesInfo: 'Sales Info',
  fieldRent: 'Rent',
  fieldMaintenanceFee: 'Maintenance Fee',
  fieldLaborCost: 'Labor Cost',
  fieldOtherFixedCost: 'Other Fixed Costs',
  fieldAvgPrice: 'Average Price per Cup',
  fieldAvgCost: 'Average Cost per Cup',
  fieldDailyCups: 'Average Cups Sold per Day',
  fieldBusinessDays: 'Business Days per Month',
  unitCups: 'cups',
  unitDays: 'days',
  calculateButton: 'See Results',
  resultProfit: 'Estimated Monthly Profit',
  resultRevenue: 'Estimated Monthly Revenue',
  resultExpense: 'Estimated Monthly Expense',
  resultBreakEven: 'Daily Break-even Cups',
  breakEvenUnavailable: 'Not available (price ≤ cost)',
  resultPageTitle: 'Your Results',
  resultPageSubtitle: "Here's your estimated profit based on what you entered.",
  recalculateButton: 'Calculate Again',
  footerDisclaimer:
    'This calculator is for reference only. Actual profit may vary by location, operations, taxes, season, and labor costs.',
  footerPrivacyLink: 'Privacy Policy',
  adCloseLabel: 'Close ad',
  adDialogLabel: 'Advertisement',
  metaTitle: 'Ka-culator - Easy Cafe Profit Calculator',
  metaDescription:
    'Find out how many cups a day you need to sell to break even before opening a cafe, with Ka-culator.',
  privacyMetaTitle: 'Privacy Policy | Ka-culator',
};

export const translations: Record<Locale, typeof ko> = { ko, en };

export type TranslationKey = keyof typeof ko;
