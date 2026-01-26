import { NewsletterContainer } from '@/components/Forms/NewsletterForm';
import styles from './SignUpPage.module.scss';
import classNames from 'classnames';

export const SignUpPage = () => {
  return (
    <div className={classNames(styles.signUpPage)}>
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
