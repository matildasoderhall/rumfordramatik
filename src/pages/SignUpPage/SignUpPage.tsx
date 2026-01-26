import { NewsletterContainer } from '@/components/Forms/NewsletterForm';
import styles from './SignUpPage.module.scss';
import classNames from 'classnames';

export const SignUpPage = () => {
  return (
    <div className={classNames(styles.signUpPage)}>
      <NewsletterContainer />
    </div>
  );
};
