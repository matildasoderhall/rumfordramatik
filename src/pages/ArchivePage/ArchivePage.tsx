import { useIssues } from '@/hooks/useIssues';
import styles from './ArchivePage.module.scss';
import classNames from 'classnames';
import { IssueCover } from '@/components/IssueCover';
import { Link } from 'react-router';

export const ArchivePage = () => {
  const { issues } = useIssues();
  return (
    <div className={classNames(styles.archivePage)}>
      <h1 className={styles.title}>Arkiv</h1>
      <section className={styles.archiveWrapper}>
        {issues.map((issue) => (
          <Link key={issue.id} to={`/arkiv/${issue.acf.issue_number}`}>
            <IssueCover
              issueNumber={issue.acf.issue_number}
              theme={issue.acf.theme}
              className={styles.cover}
              hoverEffect={true}
            />
          </Link>
        ))}
      </section>
    </div>
  );
};
