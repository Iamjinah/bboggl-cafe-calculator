import { createContext, useContext, type ReactNode } from 'react';
import { translations, type TranslationKey } from './translations';
import type { Locale } from '../config/locale';

interface LocaleContextValue {
  locale: Locale;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  locale: Locale;
  children: ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  const t = (key: TranslationKey) => translations[locale][key];
  return <LocaleContext.Provider value={{ locale, t }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}
