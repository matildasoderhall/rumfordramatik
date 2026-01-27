import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonType } from './Button.types';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  circled?: boolean;
  className?: string;
}

/**
 * A general-purpose button component supporting various types, states, and styles.
 *
 * Features:
 * - Supports standard HTML button types (submit, button, reset) via `ButtonType`.
 * - Automatically disables interactions when `loading` or `disabled` is true.
 * - `circled` prop allows for an alternative circled visual style (often used for specific calls to action).
 *
 * @component
 */
export const Button = ({
  children,
  type = ButtonType.Button,
  disabled,
  loading,
  onClick,
  circled = false,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classNames(
        styles.button,
        { [styles.circled]: circled },
        className
      )}
    >
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};
