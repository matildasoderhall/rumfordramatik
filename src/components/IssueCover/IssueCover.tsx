import styles from './IssueCover.module.scss';
import classNames from 'classnames';

interface IssueCoverProps {
  issueNumber: number;
  theme: string;
  className: string;
}

export const IssueCover = ({ issueNumber, theme, className }: IssueCoverProps) => {
  const getTitle = (num: number) => {
    if (!num) return '';

    return num.toString().padStart(2, '0');
  };

  return (
    <div className={classNames(styles.issueCover, className)}>
      <div className={styles.coverBg}>
        <span className={styles.issueNumber}>Nr. {getTitle(issueNumber)}</span>
      </div>
      <span className={styles.theme}>Tema: {theme}</span>
    </div>
  );
};
