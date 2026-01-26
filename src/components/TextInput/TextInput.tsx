import type { ChangeEvent } from 'react';
import { InputVariant } from './Input.types';
import styles from './TextInput.module.scss';
import classNames from 'classnames';

interface TextInputProps {
  label: string;
  name: string;
  type: string;
  variant: InputVariant;
  value: string;
  autoComplete?: string;
  feedback?: string;
  required?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const TextInput = ({
  label,
  name,
  type,
  value,
  variant = InputVariant.Primary,
  autoComplete,
  feedback = '',
  required = false,
  loading,
  disabled,
  onValueChange,
  className,
}: TextInputProps) => {
  return (
    <div className={classNames(styles.textInput, className)}>
      <label>
        <span className={styles.lable}>{label}</span>
        <input
          type={type}
          name={name}
          required={required}
          disabled={disabled || loading}
          value={value}
          onChange={onValueChange}
          autoComplete={autoComplete}
        />
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
