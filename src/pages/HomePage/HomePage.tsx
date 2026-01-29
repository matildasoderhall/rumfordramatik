import { ActionBanner, ActionBannerAlign } from '@/components/ActionBanner';
import styles from './HomePage.module.scss';
import classNames from 'classnames';
import { LatestIssue } from '@/components/LatestIssue';
import { useIssues } from '@/hooks/useIssues';
import { CommingEvents } from '@/components/CommingEvents';
import { useEvents } from '@/hooks/useEvents';
import { useOpenCall } from '@/hooks/useOpenCall';
import { SectionLoader } from '@/components/Spinner';
import { SEO } from '@/components/SEO';


export const HomePage = () => {
  const { issues, loading: issuesLoading, error: issuesError } = useIssues();
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const {
    isExpired,
    applicationDeadline,
    loading: openCallLoading,
  } = useOpenCall();

  const formattedDate = applicationDeadline
    ? applicationDeadline.toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'long',
      })
    : '';

  const contentTitle = `Sista ansökningsdag är ${formattedDate}`;

  return (
    <div className={classNames(styles.homePage)}>
      <SEO 
        title="Hem" 
        description="En fysisk tidskrift och mötesplats för nyskriven dramatik. Beställ nummer, sök till Open Call eller prenumerera på vårt nyhetsbrev."
      />
      <h1 className="visually-hidden">Rum för Dramatik - Tidskrift för nyskriven dramatik</h1>
      <div className={styles.banner}>
        <ActionBanner
          title="Nyhetsbrev"
          to="/nyhetsbrev"
          arrowDirection="left"
          contentTitle="Missa inte dramatiken!"
          contentBody="Prenumerera på vårt nyhetsbrev och få det senaste från Rum för dramatik före alla andra."
          stickerText="Signa upp!"
          align={ActionBannerAlign.end}
          className={styles.newsletterBtn}
        />

        {!openCallLoading && !isExpired && (
          <ActionBanner
            title="Open call"
            to="/open-call"
            arrowDirection="right"
            contentTitle={contentTitle}
            stickerText="Sök nu!"
            align={ActionBannerAlign.end}
            isOpenCall={true}
            className={styles.openCallBtn}
          />
        )}
      </div>

      {issuesLoading ? (
        <SectionLoader />
      ) : (
        <LatestIssue
          issue={issues[0]}
          isLoading={issuesLoading}
          isError={!!issuesError}
          nextSectionId="upcoming-events"
          className={styles.latestNumberSection}
        />
      )}

      <CommingEvents
        events={events}
        isLoading={eventsLoading}
        isError={!!eventsError}
        className={styles.commingEventsSection}
      />
    </div>
  );
};
