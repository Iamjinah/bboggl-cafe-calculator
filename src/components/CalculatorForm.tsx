import InputField from './InputField';
import { useLocale } from '../i18n/LocaleContext';
import { CURRENCY_UNIT } from '../config/locale';
import type { CalculatorInput } from '../types/calculator';

interface CalculatorFormProps {
  input: CalculatorInput;
  onChange: (field: keyof CalculatorInput, value: number) => void;
  onCalculate: () => void;
}

function CalculatorForm({ input, onChange, onCalculate }: CalculatorFormProps) {
  const { locale, t } = useLocale();
  const currency = CURRENCY_UNIT[locale];

  return (
    <section className="calculator-form">
      <h2 className="form-section-title form-section-title--first">{t('sectionFixedCost')}</h2>
      <div className="form-grid">
        <InputField
          label={t('fieldRent')}
          unit={currency.label}
          unitPosition={currency.position}
          value={input.rent}
          onChange={(v) => onChange('rent', v)}
        />
        <InputField
          label={t('fieldMaintenanceFee')}
          unit={currency.label}
          unitPosition={currency.position}
          value={input.maintenanceFee}
          onChange={(v) => onChange('maintenanceFee', v)}
        />
        <InputField
          label={t('fieldLaborCost')}
          unit={currency.label}
          unitPosition={currency.position}
          value={input.laborCost}
          onChange={(v) => onChange('laborCost', v)}
        />
        <InputField
          label={t('fieldOtherFixedCost')}
          unit={currency.label}
          unitPosition={currency.position}
          value={input.otherFixedCost}
          onChange={(v) => onChange('otherFixedCost', v)}
        />
      </div>

      <h2 className="form-section-title">{t('sectionSalesInfo')}</h2>
      <div className="form-grid">
        <InputField
          label={t('fieldAvgPrice')}
          unit={currency.label}
          unitPosition={currency.position}
          value={input.avgPrice}
          onChange={(v) => onChange('avgPrice', v)}
        />
        <InputField
          label={t('fieldAvgCost')}
          unit={currency.label}
          unitPosition={currency.position}
          value={input.avgCost}
          onChange={(v) => onChange('avgCost', v)}
        />
        <InputField
          label={t('fieldDailyCups')}
          unit={t('unitCups')}
          value={input.dailyCups}
          onChange={(v) => onChange('dailyCups', v)}
        />
        <InputField
          label={t('fieldBusinessDays')}
          unit={t('unitDays')}
          value={input.businessDays}
          onChange={(v) => onChange('businessDays', v)}
        />
      </div>

      <button type="button" className="btn calculate-btn" onClick={onCalculate}>
        {t('calculateButton')}
      </button>
    </section>
  );
}

export default CalculatorForm;
