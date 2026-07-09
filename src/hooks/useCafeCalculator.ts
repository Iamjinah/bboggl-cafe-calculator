import { useMemo, useState } from 'react';
import type { CalculatorInput, CalculatorResult } from '../types/calculator';
import { LOCALE_CONFIG, type Locale } from '../config/locale';

export function useCafeCalculator(locale: Locale) {
  const [input, setInput] = useState<CalculatorInput>(LOCALE_CONFIG[locale].defaultInput);

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
