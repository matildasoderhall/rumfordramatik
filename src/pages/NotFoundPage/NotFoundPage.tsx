import { Link } from 'react-router';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.content}>
        <span className={styles.errorCode}>404</span>
        <h1>Sidan saknas i manus</h1>
        <p>
          Du har letat dig fram till en scen som inte existerar, eller så har
          sidan rivits ut.
        </p>

        <Link to={'/'} className={styles.homeButton}>
          Tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
};
