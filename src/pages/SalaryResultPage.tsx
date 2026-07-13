import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import DisplayAd from '../components/ads/DisplayAd';
import Footer from '../components/Footer';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLocale } from '../i18n/LocaleContext';
import { formatCurrency } from '../utils/format';
import type { SalaryLocationState } from '../types/salary';
import type { TranslationKey } from '../i18n/translations';

const iconNet = (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const iconAnnual = (
  <svg className="icon" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M3 10h18M8 2v4M16 2v4" />
  </svg>
);

const iconDeduction = (
  <svg className="icon" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8" />
  </svg>
);

// 공제 항목 표시 순서와 라벨 키 (내역 브레이크다운용)
const DEDUCTION_ROWS: { key: keyof SalaryLocationState['result']['deductions']; label: TranslationKey }[] = [
  { key: 'nationalPension', label: 'salaryDeductionPension' },
  { key: 'healthInsurance', label: 'salaryDeductionHealth' },
  { key: 'longTermCare', label: 'salaryDeductionCare' },
  { key: 'employmentInsurance', label: 'salaryDeductionEmployment' },
  { key: 'incomeTax', label: 'salaryDeductionIncomeTax' },
  { key: 'localIncomeTax', label: 'salaryDeductionLocalTax' },
];

function SalaryResultPage() {
  const { locale, t } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as SalaryLocationState | null;

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
      navigate(`/${locale}/salary-net`, { replace: true });
    }
  }, [state, navigate, locale]);

  if (!state) return null;

  const { result } = state;

  return (
    <div className="app-shell">
      <DisplayAd size="wide" />

      <header className="result-header">
        <LanguageSwitcher />
        <span className="app-badge">{t('salaryBadge')}</span>
        <h1>{t('salaryResultPageTitle')}</h1>
        <p className="subtitle">{t('salaryResultPageSubtitle')}</p>
      </header>

      <div className="result-layout">
        <section className="result-section">
          <ResultCard
            highlight
            icon={iconNet}
            label={t('salaryResultNetMonthly')}
            value={formatCurrency(result.netMonthly, locale)}
          />
          <ResultCard
            icon={iconAnnual}
            label={t('salaryResultNetAnnual')}
            value={formatCurrency(result.netAnnual, locale)}
          />
          <ResultCard
            icon={iconDeduction}
            label={t('salaryResultTotalDeduction')}
            value={formatCurrency(result.totalDeduction, locale)}
          />

          <div className="deduction-list">
            <p className="deduction-list-title">{t('salaryDeductionBreakdown')}</p>
            {DEDUCTION_ROWS.map((row) => (
              <div key={row.key} className="deduction-row">
                <span>{t(row.label)}</span>
                <span>{formatCurrency(result.deductions[row.key], locale)}</span>
              </div>
            ))}
          </div>
        </section>
        <DisplayAd size="square" />
      </div>

      <button
        type="button"
        className="btn recalculate-btn"
        onClick={() => navigate(`/${locale}/salary-net`)}
      >
        {t('recalculateButton')}
      </button>

      <DisplayAd size="wide" />
      <Footer />
    </div>
  );
}

export default SalaryResultPage;
