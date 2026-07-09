import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCards from '../components/ResultCards';
import DisplayAd from '../components/ads/DisplayAd';
import Footer from '../components/Footer';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLocale } from '../i18n/LocaleContext';
import type { ResultLocationState } from '../types/calculator';

function ResultPage() {
  const { locale, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultLocationState | null;

  // 결과 페이지는 입력 상태에 의존하므로 검색엔진 색인에서 제외
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // 새로고침 등으로 직접 /result에 들어온 경우 입력 데이터가 없으므로 첫 화면으로 돌려보냄
  useEffect(() => {
    if (!state) {
      navigate(`/${locale}`, { replace: true });
    }
  }, [state, navigate, locale]);

  if (!state) return null;

  return (
    <div className="app-shell">
      <DisplayAd size="wide" />

      <header className="result-header">
        <LanguageSwitcher />
        <span className="app-badge">{t('badge')}</span>
        <h1>{t('resultPageTitle')}</h1>
        <p className="subtitle">{t('resultPageSubtitle')}</p>
      </header>

      <div className="result-layout">
        <ResultCards result={state.result} />
        <DisplayAd size="square" />
      </div>

      <button type="button" className="btn recalculate-btn" onClick={() => navigate(`/${locale}`)}>
        {t('recalculateButton')}
      </button>

      <DisplayAd size="wide" />
      <Footer />
    </div>
  );
}

export default ResultPage;
