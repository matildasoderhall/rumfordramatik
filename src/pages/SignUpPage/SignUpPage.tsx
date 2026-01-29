import { NewsletterContainer } from '@/components/Forms/NewsletterForm';
import styles from './SignUpPage.module.scss';
import classNames from 'classnames';
import { SEO } from '@/components/SEO';

export const SignUpPage = () => {
  return (
    <div className={classNames(styles.signUpPage)}>
      <SEO
        title="Nyhetsbrev"
        description="Missa inte dramatiken! Prenumerera på Rum för dramatiks nyhetsbrev och få inbjudningar till releaser, samtal och uppdateringar före alla andra."
      />
      <h1>Nyhetsbrev</h1>
      <div className={styles.mainContentWrapper}>
        <div className={styles.infoTextWrapper}>
          <p className={styles.infoText}>
            Nedan kan du signa upp för att prenumerera på vårt nyhetsbrev.
          </p>
          <span className={styles.stickerText}>Missa inget!</span>
        </div>

        <NewsletterContainer />
      </div>
    </div>
  );
};
