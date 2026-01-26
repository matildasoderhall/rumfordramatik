import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonType } from './Button.types';

interface ButtonProps {
  children: string;
  type: ButtonType;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  circled?: boolean;
  className?: string;
}

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
