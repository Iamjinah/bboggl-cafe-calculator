import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import DisplayAd from '../components/ads/DisplayAd';
import Footer from '../components/Footer';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLocale } from '../i18n/LocaleContext';
import { formatCurrency } from '../utils/format';
import type { LoanLocationState } from '../types/loan';

const iconMonthly = (
  <svg className="icon" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18M7 15h4" />
  </svg>
);

const iconInterest = (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M19 5 5 19" />
    <circle cx="7.5" cy="7.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);

const iconTotal = (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M4 5h16l-8 7 8 7H4l8-7z" />
  </svg>
);

function LoanResultPage() {
  const { locale, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LoanLocationState | null;

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

  // 새로고침 등으로 입력 데이터 없이 진입하면 계산기 화면으로 돌려보냄
  useEffect(() => {
    if (!state) {
      navigate(`/${locale}/loan-repayment`, { replace: true });
    }
  }, [state, navigate, locale]);

  if (!state) return null;

  const { result } = state;

  return (
    <div className="app-shell">
      <DisplayAd size="wide" />

      <header className="result-header">
        <LanguageSwitcher />
        <span className="app-badge">{t('loanBadge')}</span>
        <h1>{t('loanResultPageTitle')}</h1>
        <p className="subtitle">{t('loanResultPageSubtitle')}</p>
      </header>

      <div className="result-layout">
        <section className="result-section">
          <ResultCard
            highlight
            icon={iconMonthly}
            label={t('loanResultMonthly')}
            value={formatCurrency(result.monthlyPayment, locale)}
          />
          <ResultCard
            icon={iconInterest}
            label={t('loanResultTotalInterest')}
            value={formatCurrency(result.totalInterest, locale)}
          />
          <ResultCard
            icon={iconTotal}
            label={t('loanResultTotalPayment')}
            value={formatCurrency(result.totalPayment, locale)}
          />
        </section>
        <DisplayAd size="square" />
      </div>

      <button
        type="button"
        className="btn recalculate-btn"
        onClick={() => navigate(`/${locale}/loan-repayment`)}
      >
        {t('recalculateButton')}
      </button>

      <DisplayAd size="wide" />
      <Footer />
    </div>
  );
}

export default LoanResultPage;
