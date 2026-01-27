import { ActionBanner, ActionBannerAlign } from '@/components/ActionBanner';
import styles from './HomePage.module.scss';
import classNames from 'classnames';
import { LatestIssue } from '@/components/LatestIssue';
import { useIssues } from '@/hooks/useIssues';
import { CommingEvents } from '@/components/CommingEvents';
import { useEvents } from '@/hooks/useEvents';

export const HomePage = () => {
  const { issues, loading: issuesLoading, error: issuesError } = useIssues();
  const { events, loading: eventsLoading, error: eventsError } = useEvents();

  return (
    <div className={classNames(styles.homePage)}>
      <h1 className="visually-hidden">Hem</h1>
      <div className={styles.banner}>
        <ActionBanner
          title="Nyhetsbrev"
          to="/nyhetsbrev"
          arrowDirection="left"
          contentTitle="Missa inte dramatiken!"
          contentBody="Prenumerera på vårt nyhetsbrev och få det senaste från Rum för Dramatik före alla andra."
          stickerText="Signa upp!"
          align={ActionBannerAlign.end}
          className={styles.newsletterBtn}
        />

        <ActionBanner
          title="Open call"
          to="/open-call"
          arrowDirection="right"
          contentTitle="Sista ansökningsdag är 25 april"
          stickerText="Sök nu!"
          align={ActionBannerAlign.end}
          isOpenCall={true}
          className={styles.openCallBtn}
        />
      </div>

      <LatestIssue
        issue={issues[0]}
        isLoading={issuesLoading}
        isError={!!issuesError}
        nextSectionId='upcoming-events'
        className={styles.latestNumberSection}
      />

      <CommingEvents
        event={events[0]}
        isLoading={eventsLoading}
        isError={!!eventsError}
        className={styles.commingEventsSection}
      />
    </div>
  );
};
