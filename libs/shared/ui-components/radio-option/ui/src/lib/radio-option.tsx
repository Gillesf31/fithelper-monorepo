interface RadioOptionProps<T extends string> {
  readonly label: string;
  readonly value: T;
  readonly checked: boolean;
  readonly onChange: (value: T) => void;
  readonly name: string;
  readonly className?: string;
}

export function RadioOption<T extends string>({
  label,
  value,
  checked,
  onChange,
  name,
  className = 'radio checked:bg-blue-500',
}: RadioOptionProps<T>) {
  return (
    <label className="label cursor-pointer">
      <span className="label-text text-base">{label}</span>
      <input
        onChange={() => onChange(value)}
        checked={checked}
        className={className}
        name={name}
        type="radio"
        value={value}
      />
    </label>
  );
}

export default RadioOption;
