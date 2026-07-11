export interface LoanInput {
  principal: number; // 대출 원금
  annualRate: number; // 연 이자율 (%)
  years: number; // 대출 기간 (년)
}

export interface LoanResult {
  monthlyPayment: number; // 월 상환액 (원리금균등)
  totalInterest: number; // 총 이자
  totalPayment: number; // 총 상환액
}

export interface LoanLocationState {
  input: LoanInput;
  result: LoanResult;
}
