import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalculatorPage from './pages/CalculatorPage';
import ResultPage from './pages/ResultPage';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
