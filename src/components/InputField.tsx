interface InputFieldProps {
  label: string;
  value: number;
  unit: string;
  unitPosition?: 'prefix' | 'suffix';
  onChange: (value: number) => void;
}

function InputField({ label, value, unit, unitPosition = 'suffix', onChange }: InputFieldProps) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <div className="input-wrap">
        {unitPosition === 'prefix' && <span className="unit unit--prefix">{unit}</span>}
        <input
          type="number"
          inputMode="decimal"
          step="any"
          min={0}
          value={Number.isNaN(value) ? '' : value}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          className={unitPosition === 'prefix' ? 'has-prefix' : undefined}
        />
        {unitPosition === 'suffix' && <span className="unit">{unit}</span>}
      </div>
    </div>
  );
}

export default InputField;
