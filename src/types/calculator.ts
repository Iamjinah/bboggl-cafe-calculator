export interface CalculatorInput {
  rent: number;
  maintenanceFee: number;
  laborCost: number;
  otherFixedCost: number;
  avgPrice: number;
  avgCost: number;
  dailyCups: number;
  businessDays: number;
}

export interface CalculatorResult {
  monthlyRevenue: number;
  monthlyExpense: number;
  monthlyProfit: number;
  /** margin(판매가-원가)이 0 이하면 손익분기점을 계산할 수 없어 null */
  breakEvenCups: number | null;
}

export interface ResultLocationState {
  input: CalculatorInput;
  result: CalculatorResult;
}
