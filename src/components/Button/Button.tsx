import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  children: string;
  disabled?: boolean;
}

export const Button = ({ children, disabled }: ButtonProps) => {
  return (
    <button className={classNames(
      styles.button,
    )}>
      <span className={styles.buttonText}>{children}</span>
    </button>
  );
};