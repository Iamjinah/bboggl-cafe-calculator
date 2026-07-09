import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CalculatorForm from '../components/CalculatorForm';
import Footer from '../components/Footer';
import InterstitialAd from '../components/ads/InterstitialAd';
import { useCafeCalculator } from '../hooks/useCafeCalculator';
import type { ResultLocationState } from '../types/calculator';

function CalculatorPage() {
  const { input, updateField, result } = useCafeCalculator();
  const [showAd, setShowAd] = useState(false);
  const navigate = useNavigate();

  const handleAdClose = () => {
    setShowAd(false);
    const state: ResultLocationState = { input, result };
    navigate('/result', { state });
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
