import { IssueCover } from '@/components/IssueCover';
import styles from './SingleIssuePage.module.scss';
import classNames from 'classnames';
import { Button } from '@/components/Button';
import { useIssues } from '@/hooks/useIssues';
import { useParams } from 'react-router';

export const SingleIssuePage = () => {
  const { id } = useParams();
  const { issues } = useIssues();

  const issue = issues.find((i) => i.acf.issue_number.toString() === id);

  if (!issue) {
    return (
      <div className={classNames(styles.singleIssuePage, styles.notFound)}>
        <h2>Oh oh!</h2>
        <p>The issue you are looking for cannot be found.</p>
        <p>Please refresh the page or come back later.</p>
      </div>
    );
  }

  return (
    <div className={classNames(styles.singleIssuePage)}>
      <div className={styles.coverWrapper}>
      <IssueCover
        issueNumber={issue.acf.issue_number}
        theme={issue.acf.theme}
        className={styles.cover}
      />
      <Button className={styles.coverButton}>Beställ numret</Button>

      {issue.acf.content && (
        <div className={styles.contentsWrapper}>
          <h2 className={styles.title}>Innehåll</h2>
          <dl className={styles.playList}>
            {issue.acf.content.map((content) => (
              <div key={content.play} className={styles.playListRow}>
                <dt>{content.play}</dt>
                <dd>{content.playwright}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      </div>

      {issue.acf.preface && (
        <div className={styles.prefaceWrapper}>
          <h2 className={styles.title}>Förord</h2>
          <p className={styles.prefaceBody}>{issue.acf.preface}</p>
          <Button className={styles.prefaceButton}>Beställ numret</Button>
        </div>
      )}
    </div>
  );
};
