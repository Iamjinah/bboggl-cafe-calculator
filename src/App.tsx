import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LocaleLayout from './pages/LocaleLayout';
import CalculatorPage from './pages/CalculatorPage';
import ResultPage from './pages/ResultPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { DEFAULT_LOCALE } from './config/locale';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기존에 검색엔진에 등록된 구 경로 호환용 리다이렉트 */}
        <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
        <Route path="/result" element={<Navigate to={`/${DEFAULT_LOCALE}/result`} replace />} />
        <Route path="/privacy" element={<Navigate to={`/${DEFAULT_LOCALE}/privacy`} replace />} />

        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index element={<CalculatorPage />} />
          <Route path="result" element={<ResultPage />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>

        <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
