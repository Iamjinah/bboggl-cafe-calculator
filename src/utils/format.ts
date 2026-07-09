import { LOCALE_CONFIG, type Locale } from '../config/locale';

export function formatCurrency(value: number, locale: Locale): string {
  const { currencyCode, numberLocale } = LOCALE_CONFIG[locale];

  if (currencyCode === 'KRW') {
    return `${Math.round(value).toLocaleString(numberLocale)}원`;
  }

  return new Intl.NumberFormat(numberLocale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCups(value: number, locale: Locale): string {
  const rounded = Math.ceil(value);
  const { numberLocale } = LOCALE_CONFIG[locale];
  return locale === 'ko' ? `${rounded.toLocaleString(numberLocale)}잔` : `${rounded.toLocaleString(numberLocale)} cups`;
}
