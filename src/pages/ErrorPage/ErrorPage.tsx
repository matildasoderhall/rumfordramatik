import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import styles from './ErrorPage.module.scss';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';

export const ErrorPage = () => {
  const error = useRouteError();
  const errorMessage = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return (
    <div className={styles.errorPageWrapper}>
      <Header />
      <div className={styles.content}>
        <h1>Vi verkar ha tappat manus!</h1>
        <p>
          En oförutsedd vändning har skett och systemet vet inte vad nästa
          replik är. Prova att ladda om sidan.
        </p>
        <p className={styles.techDetails}>Felkod: {errorMessage}</p>
        <Link to={'/'} className={styles.homeButton}>
          Tillbaka till startsidan
        </Link>
      </div>
      <Footer />
    </div>
  );
};
