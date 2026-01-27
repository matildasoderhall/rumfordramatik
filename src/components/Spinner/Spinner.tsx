import { SpinnerGapIcon } from '@phosphor-icons/react';
import styles from './Spinner.module.scss';
import classNames from 'classnames';

interface SpinnerProps {
  className?: string;
  size?: number;
  color?: string;
}

export const Spinner = ({ className, size = 32, color }: SpinnerProps) => {
  return (
    <SpinnerGapIcon
      size={size}
      color={color}
      className={classNames(styles.spinner, className)}
    />
  );
};

export const SectionLoader = ({
  className,
  size = 44,
  color,
}: SpinnerProps) => (
  <div className={styles.centerContainer}>
    <Spinner
      size={size}
      color={color}
      className={classNames(styles.spinner, className)}
    />
  </div>
);
