import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/Footer';
import InterstitialAd from '../components/ads/InterstitialAd';
import { useLoanCalculator } from '../hooks/useLoanCalculator';
import { useLocale } from '../i18n/LocaleContext';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { CURRENCY_UNIT } from '../config/locale';
import type { LoanLocationState } from '../types/loan';

function LoanCalculatorPage() {
  const { locale, t } = useLocale();
  const { input, updateField, result } = useLoanCalculator(locale);
  const [showAd, setShowAd] = useState(false);
  const navigate = useNavigate();

  useSeoMeta({
    locale,
    path: '/loan-repayment',
    title: t('loanMetaTitle'),
    description: t('loanMetaDescription'),
  });

  const currency = CURRENCY_UNIT[locale];

  const handleAdClose = () => {
    setShowAd(false);
    const state: LoanLocationState = { input, result };
    navigate(`/${locale}/loan-repayment/result`, { state });
  };

  return (
    <div className="app-shell">
      <Link to={`/${locale}`} className="back-to-hub">
        {t('navAllCalculators')}
      </Link>

      <header className="app-header">
        <LanguageSwitcher />
        <span className="app-badge">{t('loanBadge')}</span>
        <h1>{t('loanTitle')}</h1>
        <p className="subtitle">{t('loanSubtitle')}</p>
      </header>

      <section className="calculator-form">
        <div className="form-grid">
          <InputField
            label={t('loanFieldPrincipal')}
            unit={currency.label}
            unitPosition={currency.position}
            value={input.principal}
            onChange={(v) => updateField('principal', v)}
          />
          <InputField
            label={t('loanFieldRate')}
            unit={t('loanUnitPercent')}
            value={input.annualRate}
            onChange={(v) => updateField('annualRate', v)}
          />
          <InputField
            label={t('loanFieldYears')}
            unit={t('loanUnitYears')}
            value={input.years}
            onChange={(v) => updateField('years', v)}
          />
        </div>

        <button type="button" className="btn calculate-btn" onClick={() => setShowAd(true)}>
          {t('calculateButton')}
        </button>
      </section>

      <Footer />
      {showAd && <InterstitialAd onClose={handleAdClose} />}
    </div>
  );
}

export default LoanCalculatorPage;
