import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalculatorPage from './pages/CalculatorPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
