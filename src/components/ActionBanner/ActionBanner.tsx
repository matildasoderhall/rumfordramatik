import styles from './ActionBanner.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router';
import { ActionBannerAlign } from './ActionBanner.types';
import { ArrowLeft, ArrowRight } from '../CustomIcons';
import { Icon, IconFill, IconSize } from '../Icon';
import { ArrowDirection, ArrowType, DecorativeArrow } from '../DecorativeArrow';

interface ActionBannerProps {
  title: string;
  to: string;
  arrowDirection?: 'left' | 'right';
  align?: ActionBannerAlign;
  stickerText?: string;
  contentTitle: string;
  contentBody?: string;
  isOpenCall?: boolean;
  className?: string;
}

export const ActionBanner = ({
  title,
  to,
  arrowDirection,
  align = ActionBannerAlign.start,
  stickerText,
  contentTitle,
  contentBody,
  isOpenCall = false,
  className,
}: ActionBannerProps) => {
  return (
    <div className={classNames(styles.actionBanner, styles[align], className)}>
      <div className={styles.ctaWrapper}>
        <Link to={to} className={styles.link}>
          {arrowDirection === 'left' && (
            <Icon
              icon={ArrowLeft}
              fill={IconFill.OnDark}
              size={IconSize.TextMD}
              className={classNames(styles.icon, styles.slideLeft)}
            />
          )}
          <span>{title}</span>

          {arrowDirection === 'right' && (
            <Icon
              icon={ArrowRight}
              fill={IconFill.OnDark}
              size={IconSize.FsMD}
              className={classNames(styles.icon, styles.slideRight)}
            />
          )}
        </Link>

        {isOpenCall ? (
          <DecorativeArrow
            type={ArrowType.doubleCurved}
            direction={ArrowDirection.right}
            className={styles.openCallArrow}
          />
        ) : (
          <DecorativeArrow
            type={ArrowType.doubleCurved}
            className={styles.newsletterArrow}
          />
        )}
      </div>

      <span className={styles.stickerText}>{stickerText}</span>
      <div className={styles.content}>
        <p
          className={classNames(styles.contentTitle, {
            [styles.openCall]: isOpenCall,
          })}
        >
          {contentTitle}
        </p>
        {contentBody && <p className={styles.contentBody}>{contentBody}</p>}
      </div>
    </div>
  );
};
