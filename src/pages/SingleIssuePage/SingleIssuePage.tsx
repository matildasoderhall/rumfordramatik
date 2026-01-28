import { IssueCover } from '@/components/IssueCover';
import styles from './SingleIssuePage.module.scss';
import classNames from 'classnames';
import { Button, ButtonType } from '@/components/Button';
import { useIssues } from '@/hooks/useIssues';
import { Link, useParams } from 'react-router';
import { DecorativeArrow, ArrowType } from '@/components/DecorativeArrow';
import { FormattedText } from '@/components/FormattedText';

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

  const scrollDown = () => {
    const nextSection = document.getElementById('preface');

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <div className={classNames(styles.singleIssuePage)}>
      <h1 className="visually-hidden">
        Rum för dramatik nummer {issue.acf.issue_number}: tema {issue.acf.theme}
      </h1>
      <div className={styles.coverWrapper}>
        <div className={styles.issueWrapper}>
          <IssueCover
            issueNumber={issue.acf.issue_number}
            theme={issue.acf.theme}
            className={styles.cover}
          />
          <DecorativeArrow
            type={ArrowType.singleCurved}
            className={styles.curvedArrow}
          />
        </div>
        <Link to="/beställ" className={styles.coverButtonWrapper}>
          <Button type={ButtonType.Button} className={styles.coverButton}>
            Beställ numret
          </Button>
        </Link>

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

        <button
          type="button"
          onClick={scrollDown}
          className={styles.scrollArrowBtn}
          aria-label="Scroll to next section"
        >
          <DecorativeArrow
            type={ArrowType.single}
            className={styles.singleArrow}
          />
        </button>
      </div>

      {issue.acf.preface && (
        <div className={styles.prefaceWrapper} id="preface">
          <h2 className={styles.title}>Förord</h2>
          <FormattedText
            text={issue.acf.preface}
            className={styles.prefaceBody}
          />
          <Link to="/beställ" className={styles.prefaceButton}>
            <Button type={ButtonType.Button}>
              Beställ numret
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
