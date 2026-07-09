import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CalculatorForm from '../components/CalculatorForm';
import Footer from '../components/Footer';
import InterstitialAd from '../components/ads/InterstitialAd';
import { useCafeCalculator } from '../hooks/useCafeCalculator';
import { useLocale } from '../i18n/LocaleContext';
import { useSeoMeta } from '../hooks/useSeoMeta';
import type { ResultLocationState } from '../types/calculator';

function CalculatorPage() {
  const { locale, t } = useLocale();
  const { input, updateField, result } = useCafeCalculator(locale);
  const [showAd, setShowAd] = useState(false);
  const navigate = useNavigate();

  useSeoMeta({ locale, path: '', title: t('metaTitle'), description: t('metaDescription') });

  const handleAdClose = () => {
    setShowAd(false);
    const state: ResultLocationState = { input, result };
    navigate(`/${locale}/result`, { state });
  };

  return (
    <div className="app-shell">
      <Header />
      <CalculatorForm input={input} onChange={updateField} onCalculate={() => setShowAd(true)} />
      <Footer />
      {showAd && <InterstitialAd onClose={handleAdClose} />}
    </div>
  );
}

export default CalculatorPage;
