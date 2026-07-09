interface InputFieldProps {
  label: string;
  value: number;
  unit: string;
  onChange: (value: number) => void;
}

function InputField({ label, value, unit, onChange }: InputFieldProps) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <div className="input-wrap">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={Number.isNaN(value) ? '' : value}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
        />
        <span className="unit">{unit}</span>
      </div>
    </div>
  );
}

export default InputField;
