import type { CalculatorInput } from '../types/calculator';

export type Locale = 'ko' | 'en';

export const SUPPORTED_LOCALES: Locale[] = ['ko', 'en'];
export const DEFAULT_LOCALE: Locale = 'ko';

interface LocaleCurrencyConfig {
  currencyCode: 'KRW' | 'USD';
  numberLocale: string;
  defaultInput: CalculatorInput;
}

// 통화별 예시 기본값 — 실시간 환율 변환이 아니라 각 통화권에서 그럴듯한 소형 카페 예시치
export const LOCALE_CONFIG: Record<Locale, LocaleCurrencyConfig> = {
  ko: {
    currencyCode: 'KRW',
    numberLocale: 'ko-KR',
    defaultInput: {
      rent: 1500000,
      maintenanceFee: 200000,
      laborCost: 2800000,
      otherFixedCost: 300000,
      avgPrice: 4500,
      avgCost: 1500,
      dailyCups: 120,
      businessDays: 26,
    },
  },
  en: {
    currencyCode: 'USD',
    numberLocale: 'en-US',
    defaultInput: {
      rent: 2000,
      maintenanceFee: 200,
      laborCost: 4000,
      otherFixedCost: 300,
      avgPrice: 4.5,
      avgCost: 1.5,
      dailyCups: 120,
      businessDays: 26,
    },
  },
};

export const CURRENCY_UNIT: Record<Locale, { label: string; position: 'prefix' | 'suffix' }> = {
  ko: { label: '원', position: 'suffix' },
  en: { label: '$', position: 'prefix' },
};
