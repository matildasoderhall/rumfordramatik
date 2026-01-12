import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  children: string;
  disabled?: boolean;
  className?: string;
}

export const Button = ({ children, disabled, className }: ButtonProps) => {
  return (
    <button className={classNames(
      styles.button, className
    )}>
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};