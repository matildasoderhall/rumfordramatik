import styles from './DecorativeArrow.module.scss';
import classNames from 'classnames';
import { ArrowDirection, type ArrowType } from './DecorativeArrow.types';

interface DecorativeArrowProps {
  type: ArrowType;
  direction?: ArrowDirection;
  className?: string;
}

export const DecorativeArrow = ({
  type,
  direction = ArrowDirection.right,
  className,
}: DecorativeArrowProps) => {
  return (
    <div
      className={classNames(
        styles.decorativeArrow,
        styles[type],
        styles[direction],
        className
      )}
      aria-hidden="true"
    />
  );
};
