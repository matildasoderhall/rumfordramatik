import type { WPIssue } from '@/models/wordpress';
import styles from './LatestIssue.module.scss';
import classNames from 'classnames';
import { IssueCover } from '../IssueCover';
import { Button, ButtonType } from '../Button';
import { ArrowType, DecorativeArrow } from '../DecorativeArrow';

interface LatestIssueProps {
  issue: WPIssue | null;
  isLoading: boolean;
  isError: boolean;
  className?: string;
}

export const LatestIssue = ({
  issue,
  isError,
  isLoading,
  className,
}: LatestIssueProps) => {
  if (isError) {
    return (
      <section className={classNames(styles.latestIssue, className)}>
        <p className={styles.errorText}>
          Hoppsan, det verkar vara något fel på servern. Prova att ladda om
          sidan för att se det senaste numret.
        </p>
      </section>
    );
  }

  if (isLoading || !issue) {
    return null;
  }

  const acf = issue.acf;

  return (
    <section className={classNames(styles.latestIssue, className)}>
      <div className={styles.issueWrapper}>
        <IssueCover
          className={styles.cover}
          issueNumber={acf.issue_number}
          theme={acf.theme}
        />
        <DecorativeArrow type={ArrowType.singleCurved} className={styles.arrow}/>
      </div>

      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Senaste numret</h2>
        <p className={styles.preface}>{acf.preface}</p>
        <span className={styles.readMoreScribble}>Läs mer</span>
        <Button type={ButtonType.Button} className={styles.orderBtn}>
          Beställ numret
        </Button>
      </div>
    </section>
  );
};
