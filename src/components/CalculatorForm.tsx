import InputField from './InputField';
import type { CalculatorInput } from '../types/calculator';

interface CalculatorFormProps {
  input: CalculatorInput;
  onChange: (field: keyof CalculatorInput, value: number) => void;
  onCalculate: () => void;
}

function CalculatorForm({ input, onChange, onCalculate }: CalculatorFormProps) {
  return (
    <section className="calculator-form">
      <h2 className="form-section-title form-section-title--first">고정비</h2>
      <div className="form-grid">
        <InputField label="월세" unit="원" value={input.rent} onChange={(v) => onChange('rent', v)} />
        <InputField
          label="관리비"
          unit="원"
          value={input.maintenanceFee}
          onChange={(v) => onChange('maintenanceFee', v)}
        />
        <InputField
          label="인건비"
          unit="원"
          value={input.laborCost}
          onChange={(v) => onChange('laborCost', v)}
        />
        <InputField
          label="기타 고정비"
          unit="원"
          value={input.otherFixedCost}
          onChange={(v) => onChange('otherFixedCost', v)}
        />
      </div>

      <h2 className="form-section-title">판매 정보</h2>
      <div className="form-grid">
        <InputField
          label="음료 1잔 평균 판매가"
          unit="원"
          value={input.avgPrice}
          onChange={(v) => onChange('avgPrice', v)}
        />
        <InputField
          label="음료 1잔 평균 원가"
          unit="원"
          value={input.avgCost}
          onChange={(v) => onChange('avgCost', v)}
        />
        <InputField
          label="하루 평균 판매잔 수"
          unit="잔"
          value={input.dailyCups}
          onChange={(v) => onChange('dailyCups', v)}
        />
        <InputField
          label="월 영업일수"
          unit="일"
          value={input.businessDays}
          onChange={(v) => onChange('businessDays', v)}
        />
      </div>

      <button type="button" className="btn calculate-btn" onClick={onCalculate}>
        결과 확인하기
      </button>
    </section>
  );
}

export default CalculatorForm;
