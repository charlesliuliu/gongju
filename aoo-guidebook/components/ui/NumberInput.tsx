'use client';

interface NumberInputProps {
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  unit,
  min = 0,
  max,
  step = 1,
  placeholder,
  required = false,
  error,
}: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '') {
      onChange('');
    } else {
      const num = parseFloat(newValue);
      if (!isNaN(num)) {
        onChange(num);
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {unit && <span className="text-gray-400 font-normal ml-1.5">({unit})</span>}
      </label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        required={required}
        className={`input-field ${
          error
            ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
            : ''
        }`}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
