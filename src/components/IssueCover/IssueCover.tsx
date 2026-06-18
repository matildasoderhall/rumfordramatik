import styles from './IssueCover.module.scss';
import classNames from 'classnames';

interface IssueCoverProps {
  issueNumber: number;
  theme: string;
  className?: string;
  hoverEffect?: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

export const IssueCover = ({
  issueNumber,
  theme,
  className,
  hoverEffect,
  imageUrl,
  imageAlt,
}: IssueCoverProps) => {
  const getTitle = (num: number) => {
    if (!num) return '';

    return num.toString().padStart(2, '0');
  };

  return (
    <div className={classNames(styles.issueCover, className)}>
      {/* 1. NEW: The anchor for the text. No overflow: hidden here! */}
      <div className={styles.coverContainer}>
        {/* 2. The Clipping Mask: Keeps the scaling image neatly inside the box */}
        <div
          className={classNames(styles.clippingMask, {
            [styles.hoverEffect]: hoverEffect,
          })}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt || `Cover for issue ${getTitle(issueNumber)}`}
              className={styles.coverImage}
              loading="lazy"
            />
          ) : (
            <div className={styles.coverBg}></div>
          )}
        </div>

        {/* 3. The Text: Lives inside the anchor, but outside the clipping mask */}
        <span className={styles.issueNumber}>Nr. {getTitle(issueNumber)}</span>
      </div>

      <span className={styles.theme}>Tema: {theme}</span>
    </div>
  );
};
