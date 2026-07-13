import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../components/Footer';
import InterstitialAd from '../components/ads/InterstitialAd';
import SalaryGuide from '../components/SalaryGuide';
import { useSalaryCalculator } from '../hooks/useSalaryCalculator';
import { useLocale } from '../i18n/LocaleContext';
import { useSeoMeta } from '../hooks/useSeoMeta';
import type { SalaryLocationState } from '../types/salary';

function SalaryCalculatorPage() {
  const { locale, t } = useLocale();
  const { input, updateField, result } = useSalaryCalculator(locale);
  const [showAd, setShowAd] = useState(false);
  const navigate = useNavigate();

  useSeoMeta({
    locale,
    path: '/salary-net',
    title: t('salaryMetaTitle'),
    description: t('salaryMetaDescription'),
  });

  const handleAdClose = () => {
    setShowAd(false);
    const state: SalaryLocationState = { input, result };
    navigate(`/${locale}/salary-net/result`, { state });
  };

  return (
    <div className="app-shell">
      <Link to={`/${locale}`} className="back-to-hub">
        {t('navAllCalculators')}
      </Link>

      <header className="app-header">
        <LanguageSwitcher />
        <span className="app-badge">{t('salaryBadge')}</span>
        <h1>{t('salaryTitle')}</h1>
        <p className="subtitle">{t('salarySubtitle')}</p>
      </header>

      <section className="calculator-form">
        <div className="form-grid">
          <InputField
            label={t('salaryFieldAnnual')}
            unit={t('salaryUnitWon')}
            value={input.annualSalary}
            onChange={(v) => updateField('annualSalary', v)}
          />
          <InputField
            label={t('salaryFieldTaxFree')}
            unit={t('salaryUnitWon')}
            value={input.taxFreeMonthly}
            onChange={(v) => updateField('taxFreeMonthly', v)}
          />
          <InputField
            label={t('salaryFieldDependents')}
            unit={t('salaryUnitPeople')}
            value={input.dependents}
            onChange={(v) => updateField('dependents', v)}
          />
        </div>

        <button type="button" className="btn calculate-btn" onClick={() => setShowAd(true)}>
          {t('calculateButton')}
        </button>
      </section>

      <SalaryGuide />

      <Footer />
      {showAd && <InterstitialAd onClose={handleAdClose} />}
    </div>
  );
}

export default SalaryCalculatorPage;
