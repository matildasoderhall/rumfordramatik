import { Link } from 'react-router';
import styles from './Footer.module.scss';
import { SocialsNav } from './SocialsNav';
import classNames from 'classnames';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.socialMediaLinks, styles.link)}>
        <a href="mailto:info@rumfordramatik.se" className={styles.link}>
          info@rumfordramatik.se
        </a>
        <SocialsNav />
      </div>
      <p>
        ©{currentYear} Rum för dramatik |{' '}
        <Link className={styles.link} to={'/integritetspolicy'}>
          Integritetspolicy
        </Link>
      </p>
    </footer>
  );
};
