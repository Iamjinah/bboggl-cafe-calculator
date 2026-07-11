import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import LocaleLayout from './pages/LocaleLayout';
import HubPage from './pages/HubPage';
import CalculatorPage from './pages/CalculatorPage';
import ResultPage from './pages/ResultPage';
import LoanCalculatorPage from './pages/LoanCalculatorPage';
import LoanResultPage from './pages/LoanResultPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { DEFAULT_LOCALE } from './config/locale';

// 알 수 없는 하위 경로는 해당 언어의 허브로 되돌림 (locale 유지)
function LocaleFallback() {
  const { locale } = useParams<{ locale: string }>();
  return <Navigate to={`/${locale ?? DEFAULT_LOCALE}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 허브 이전(단일 계산기) 시절 구 경로 호환 리다이렉트 */}
        <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
        <Route path="/result" element={<Navigate to={`/${DEFAULT_LOCALE}/cafe-profit`} replace />} />
        <Route path="/privacy" element={<Navigate to={`/${DEFAULT_LOCALE}/privacy`} replace />} />

        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index element={<HubPage />} />
          <Route path="cafe-profit" element={<CalculatorPage />} />
          <Route path="cafe-profit/result" element={<ResultPage />} />
          <Route path="loan-repayment" element={<LoanCalculatorPage />} />
          <Route path="loan-repayment/result" element={<LoanResultPage />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<LocaleFallback />} />
        </Route>

        <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
