import type { WPEvent } from '@/models/wordpress';
import styles from './CommingEvents.module.scss';
import classNames from 'classnames';

interface CommingEventsProps {
  event: WPEvent | null;
  isLoading: boolean;
  isError: boolean;
  className?: string;
}

export const CommingEvents = ({ event, isLoading, isError, className }: CommingEventsProps) => {
  if (!isError) {
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

  if (isLoading || !event) {
    return null;
  }


  const acf = event?.acf || {};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString.replace(' ', 'T'));

    return date.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const displayDate = acf.date ? formatDate(acf.date) : '';

  return (
    <section className={classNames(styles.commingEvents, className)}>
      <h2 className={styles.sectionTitle}>Kommande event</h2>

      <article className={styles.eventWrapper}>
        <h3 className={styles.title}>{acf.title}</h3>

        <div className={styles.imgWrapper}>
          <img
            src="http://rumfordramatik.se/admin/wp-content/uploads/2026/01/test.jpeg"
            alt=""
            className={styles.img}
          />
        </div>
        <div className={styles.infoWrapper}>
          <p className={styles.eventDate}>
            <span className={styles.sticker}>{acf.sticker}</span>
            {displayDate}
          </p>
          <p className={styles.description}>
            {acf.description}{' '}
            <span className={styles.theme}>Tema: {acf.theme}</span>
          </p>
        </div>
      </article>
    </section>
  );
};
