import type { ChangeEvent } from 'react';
import { InputVariant } from '../TextInput' ; // Or wherever your InputVariant enum is defined
import styles from './SelectInput.module.scss';
import classNames from 'classnames';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  variant: InputVariant;
  value: string;
  options: Option[];
  autoComplete?: string;
  feedback?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const SelectInput = ({
  label,
  name,
  value,
  variant = InputVariant.Primary,
  options,
  autoComplete,
  feedback = '',
  required = false,
  disabled,
  onValueChange,
  className,
}: SelectInputProps) => {
  return (
    <div className={classNames(styles.selectInput, className)}>
      <label>
        <span className={styles.label}>{label}</span>
        <select
          name={name}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onValueChange}
          autoComplete={autoComplete}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <span
        className={classNames(styles.mandatory, {
          [styles.mandatoryVisible]: required,
        })}
      >
        *Obligatoriskt
      </span>

      {variant === InputVariant.Error && (
        <div className={styles.feedback}>
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
};