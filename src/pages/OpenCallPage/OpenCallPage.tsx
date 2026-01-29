import styles from './OpenCallPage.module.scss';
import classNames from 'classnames';
import { OpenCallForm } from '@/components/Forms/OpenCallForm';
import { useOpenCall } from '@/hooks/useOpenCall';
import { NewsletterContainer } from '@/components/Forms/NewsletterForm';
import { FormattedText } from '@/components/FormattedText';
import { SectionLoader } from '@/components/Spinner';
import { SEO } from '@/components/SEO';

export const OpenCallPage = () => {
  const { data, loading, isExpired, applicationDeadline } = useOpenCall();

  const formattedDate = applicationDeadline
    ? applicationDeadline.toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'long',
      })
    : '';

  if (loading)
    return (
      <div className={classNames(styles.openCallPage)}>
        <SectionLoader />
      </div>
    );

  return (
    <div className={classNames(styles.openCallPage)}>
      <SEO
        title="Open Call"
        description="Vill du bli publicerad? Skicka in din dramatik till oss. Här hittar du information om aktuella deadlines, teman och hur du ansöker till tidskriften."
      />
      <h1 className={styles.pageTitle}>Open Call</h1>

      {isExpired ? (
        <section className={styles.closedMessage}>
          <div className={styles.closedMessageInfo}>
            <h2>Just nu har vi inget öppet Open Call.</h2>
            <p>
              Men vi öppnar snart igen! Skriv upp dig på nyhetsbrevet så missar
              du inte nästa deadline.
            </p>
          </div>
          <div className={styles.newsletterEmbed}>
            <NewsletterContainer />
          </div>
        </section>
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
              <FormattedText text={data?.acf.description} />
            </div>
          </section>
          <section className={styles.applicationFormSection}>
            <OpenCallForm />
          </section>
        </div>
      )}
    </div>
  );
};
