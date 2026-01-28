import type { WPEvent } from '@/models/wordpress';
import styles from './CommingEvents.module.scss';
import classNames from 'classnames';

interface CommingEventsProps {
  events: WPEvent[] | null;
  isLoading: boolean;
  isError: boolean;
  className?: string;
}

export const CommingEvents = ({
  events,
  isLoading,
  isError,
  className,
}: CommingEventsProps) => {
  if (isError) {
    return (
      <section className={classNames(styles.latestIssue, className)}>
        <h2 className={styles.sectionTitle}>Kommande event</h2>
        <p className={styles.errorText}>
          Hoppsan, det verkar vara något fel på servern. Prova att ladda om
          sidan för att se kommande event.
        </p>
      </section>
    );
  }

  if (isLoading || !events) {
    return null;
  }

  const parseEventDate = (dateString?: string) => {
    if (!dateString) return new Date(0);
    return new Date(dateString.replace(' ', 'T'));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureEvents: WPEvent[] = [];
  const pastEvents: WPEvent[] = [];

  events.forEach((event) => {
    const eventDate = parseEventDate(event.acf.date);
    if (eventDate >= today) {
      futureEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  futureEvents.sort((a, b) => {
    return (
      parseEventDate(a.acf.date).getTime() -
      parseEventDate(b.acf.date).getTime()
    );
  });

  pastEvents.sort((a, b) => {
    return (
      parseEventDate(b.acf.date).getTime() -
      parseEventDate(a.acf.date).getTime()
    );
  });

  const sortedEvents = [...futureEvents, ...pastEvents];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString.replace(' ', 'T'));

    return date.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section
      className={classNames(styles.commingEvents, className)}
      id="upcoming-events"
    >
      <h2 className={styles.sectionTitle}>Kommande event</h2>
      <div className={styles.eventsList}>
        {sortedEvents.map((event) => {
          const acf = event.acf || {};
          const image =
            event.yoast_head_json?.schema?.['@graph']?.find(
              (node) => node.caption
            ) || event.yoast_head_json?.schema?.['@graph']?.[1];
          const displayDate = acf.date ? formatDate(acf.date) : '';

          return (
            <article key={event.id} className={styles.eventWrapper}>
              <h3 className={styles.title}>{acf.title}</h3>

              <div className={styles.imgWrapper}>
                {image && (
                  <img
                    src={image.url}
                    alt={image.caption || acf.title}
                    height={image.height}
                    width={image.width}
                    className={styles.img}
                    loading='lazy'
                  />
                )}
              </div>

              <div className={styles.infoWrapper}>
                <p className={styles.eventDate}>
                  <span className={styles.sticker}>{acf.sticker}</span>
                  {displayDate}
                </p>
                <p className={styles.description}>
                  {acf.description}{' '}
                  {acf.theme && (
                    <span className={styles.theme}>Tema: {acf.theme}</span>
                  )}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
