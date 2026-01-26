import styles from './OpenCallPage.module.scss';
import classNames from 'classnames';
import { OpenCallForm } from '@/components/Forms/OpenCallForm';
import { useOpenCall } from '@/hooks/useOpenCall';

export const OpenCallPage = () => {
  const { data, loading, isExpired, applicationDeadline } = useOpenCall();

  const formattedDate = applicationDeadline
    ? applicationDeadline.toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'long',
      })
    : '';

  const descriptionParagraphs = data?.acf.description.split(/\r\n\r\n|\n\n/);

  if (loading)
    return <div className={classNames(styles.openCallPage)}>Laddar...</div>;

  return (
    <div className={classNames(styles.openCallPage)}>
      <h1 className={styles.pageTitle}>Open Call</h1>

      {!isExpired ? (
        <>
          <section className={styles.closedMessage}>
            <h2>Just nu har vi inget öppet call.</h2>
            <p>
              Men vi öppnar snart igen! Skriv upp dig på nyhetsbrevet så missar
              du inte nästa deadline.
            </p>
          </section>

          <div className={styles.newsletterEmbed}>
            {/* <NewsletterSubscribe /> */}
          </div>
        </>
      ) : (
        <div className={styles.mainContentWrapper}>
          <span className={styles.scribbleApply}>Sök nu!</span>
          <section className={styles.applicationDescriptionSection}>
            <p className={styles.lastApplicationDate}>
              Sista ansökningsdag är{' '}
              <span className={styles.date}>{formattedDate}</span>
            </p>

            <div className={styles.applicationDescription}>
              <h2 className={styles.nextTheme}>
                Nästa nummers tema är:{' '}
                <span className={styles.theme}>{data?.acf.theme}</span>
              </h2>
              {descriptionParagraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
          <section className={styles.applicationFormSection}>
            <div className={styles.applicationFormInfo}>
              <h2>Fyll i nedan uppgifter för att skicka in din ansökan.</h2>
              <p>Notera att du kan lägga in flera filer i samma ansökan.</p>
            </div>

            <OpenCallForm />
          </section>
        </div>
      )}
    </div>
  );
};
