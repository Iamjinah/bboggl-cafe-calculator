import type { ReactNode } from 'react';

interface ResultCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function ResultCard({ icon, label, value, highlight }: ResultCardProps) {
  return (
    <div className={`result-card${highlight ? ' result-card--primary' : ''}`}>
      <div className="icon-wrap">{icon}</div>
      <div>
        <p className="label">{label}</p>
        <p className="value">{value}</p>
      </div>
    </div>
  );
}

export default ResultCard;
