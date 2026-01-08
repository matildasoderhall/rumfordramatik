import type { WPIssue } from '@/models/wordpress';
import styles from './LatestIssue.module.scss';
import classNames from 'classnames';
import { IssueCover } from '../IssueCover';
import { Button } from '../Button';

interface LatestIssueProps {
  issue: WPIssue | null;
  className?: string;
}

export const LatestIssue = ({ issue, className }: LatestIssueProps) => {
  const acf = issue?.acf || {};

  return (
    <section className={classNames(styles.latestIssue, className)}>
      <IssueCover
        className={styles.cover}
        issueNumber={acf.issue_number ?? 0}
        theme={acf.theme ?? 'TBA'}
      />
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>Senaste numret</h2>
        <p className={styles.preface}>{acf.preface}</p>
        <Button className={styles.orderBtn}>Beställ numret</Button>
      </div>
    </section>
  );
};
