import styles from './IssueCover.module.scss';
import classNames from 'classnames';

interface IssueCoverProps {
  issueNumber: number;
  theme: string;
}

export const IssueCover = ({ issueNumber, theme }: IssueCoverProps) => {
  const getTitle = (num: number) => {
    if (!num) return '';

    return num.toString().padStart(2, '0');
  };

  return (
    <div className={classNames(styles.issueCover)}>
      <div className={styles.coverBg}>
        <span className={styles.issueNumber}>Nr. {getTitle(issueNumber)}</span>
      </div>
      <span className={styles.theme}>Tema: {theme}</span>
    </div>
  );
};
