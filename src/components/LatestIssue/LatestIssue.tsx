import type { WPIssue } from '@/models/wordpress';
import styles from './LatestIssue.module.scss';
import classNames from 'classnames';
import { IssueCover } from '../IssueCover';
import { Button } from '../Button';

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
      <IssueCover
        className={styles.cover}
        issueNumber={acf.issue_number}
        theme={acf.theme}
      />
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Senaste numret</h2>
        <p className={styles.preface}>{acf.preface}</p>
        <Button className={styles.orderBtn}>Beställ numret</Button>
      </div>
    </section>
  );
};
