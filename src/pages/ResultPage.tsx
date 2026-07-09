import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCards from '../components/ResultCards';
import DisplayAd from '../components/ads/DisplayAd';
import Footer from '../components/Footer';
import type { ResultLocationState } from '../types/calculator';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultLocationState | null;

  // 새로고침 등으로 직접 /result에 들어온 경우 입력 데이터가 없으므로 첫 화면으로 돌려보냄
  useEffect(() => {
    if (!state) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="app-shell">
      <DisplayAd size="wide" />

      <header className="result-header">
        <span className="app-badge">☕ 카큘레이터</span>
        <h1>계산 결과</h1>
        <p className="subtitle">입력하신 정보를 기준으로 예상 손익을 계산했어요.</p>
      </header>

      <div className="result-layout">
        <ResultCards result={state.result} />
        <DisplayAd size="square" />
      </div>

      <button type="button" className="btn recalculate-btn" onClick={() => navigate('/')}>
        다시 계산하기
      </button>

      <DisplayAd size="wide" />
      <Footer />
    </div>
  );
}

export default ResultPage;
