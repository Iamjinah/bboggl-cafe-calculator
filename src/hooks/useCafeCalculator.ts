import { useMemo, useState } from 'react';
import type { CalculatorInput, CalculatorResult } from '../types/calculator';

// 화면이 비어 보이지 않도록 채워둔 더미 초기값 (소형 카페 기준)
const DEFAULT_INPUT: CalculatorInput = {
  rent: 1500000,
  maintenanceFee: 200000,
  laborCost: 2800000,
  otherFixedCost: 300000,
  avgPrice: 4500,
  avgCost: 1500,
  dailyCups: 120,
  businessDays: 26,
};

export function useCafeCalculator() {
  const [input, setInput] = useState<CalculatorInput>(DEFAULT_INPUT);

  const updateField = (field: keyof CalculatorInput, value: number) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const result: CalculatorResult = useMemo(() => {
    const {
      rent,
      maintenanceFee,
      laborCost,
      otherFixedCost,
      avgPrice,
      avgCost,
      dailyCups,
      businessDays,
    } = input;

    const fixedCost = rent + maintenanceFee + laborCost + otherFixedCost;
    const monthlyRevenue = avgPrice * dailyCups * businessDays;
    const monthlyMaterialCost = avgCost * dailyCups * businessDays;
    const monthlyExpense = monthlyMaterialCost + fixedCost;
    const monthlyProfit = monthlyRevenue - monthlyExpense;

    const marginPerCup = avgPrice - avgCost;
    const breakEvenCups =
      businessDays > 0 && marginPerCup > 0
        ? Math.ceil(fixedCost / businessDays / marginPerCup)
        : null;

    return { monthlyRevenue, monthlyExpense, monthlyProfit, breakEvenCups };
  }, [input]);

  return { input, updateField, result };
}
