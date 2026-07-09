import ResultCard from './ResultCard';
import type { CalculatorResult } from '../types/calculator';
import { formatCurrency, formatCups } from '../utils/format';

interface ResultCardsProps {
  result: CalculatorResult;
}

// 둥근 라인 아이콘 (stroke 기반, .icon 클래스 스타일 적용)
const iconRevenue = (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M3 17l6-6 4 4 8-9" />
    <path d="M15 6h6v6" />
  </svg>
);

const iconExpense = (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M6 2h9l3 3v17H6z" />
    <path d="M9 8h6M9 12h6M9 16h4" />
  </svg>
);

const iconProfit = (
  <svg className="icon" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12h6M12 9v6" />
  </svg>
);

const iconBreakEven = (
  <svg className="icon" viewBox="0 0 24 24">
    <path d="M4 8h13a3 3 0 0 1 0 6h-1" />
    <path d="M4 8v9a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-3" />
    <path d="M4 8l1-4h9l1 4" />
  </svg>
);

function ResultCards({ result }: ResultCardsProps) {
  const { monthlyRevenue, monthlyExpense, monthlyProfit, breakEvenCups } = result;

  return (
    <section className="result-section">
      <ResultCard
        highlight
        icon={iconProfit}
        label="예상 월순이익"
        value={formatCurrency(monthlyProfit)}
      />
      <ResultCard icon={iconRevenue} label="예상 월매출" value={formatCurrency(monthlyRevenue)} />
      <ResultCard icon={iconExpense} label="예상 월지출" value={formatCurrency(monthlyExpense)} />
      <ResultCard
        icon={iconBreakEven}
        label="하루 손익분기점 판매잔 수"
        value={breakEvenCups !== null ? formatCups(breakEvenCups) : '계산 불가 (판매가 ≤ 원가)'}
      />
    </section>
  );
}

export default ResultCards;
