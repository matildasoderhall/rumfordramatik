import type { ChangeEvent } from 'react';
import { InputVariant } from './Input.types';
import styles from './TextInput.module.scss';
import classNames from 'classnames';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  variant: InputVariant;
  value: string;
  min?: number;
  autoComplete?: string;
  feedback?: string;
  required?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

/**
 * A reusable text input component that handles labels, validation states, and mandatory indicators.
 *
 * Features:
 * - Built-in `<label>` wrapping for accessibility.
 * - Displays a "*Obligatoriskt" helper text automatically if `required` is true.
 * - Conditionally renders an error message block when `variant` is set to `InputVariant.Error`.
 *
 * @component
 * @example
 * <TextInput
 * label="E-post"
 * name="email"
 * type="email"
 * value={email}
 * onValueChange={(e) => setEmail(e.target.value)}
 * required
 * variant={hasError ? InputVariant.Error : InputVariant.Primary}
 * feedback="Du måste ange en giltig e-postadress."
 * />
 */
export const TextInput = ({
  label,
  name,
  type = 'text',
  value,
  variant = InputVariant.Primary,
  autoComplete,
  min,
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
          min={min}
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
