import styles from './Footer.module.scss';
import { SocialsNav } from './SocialsNav';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="mailto:info@rumfordramatik.se" className={styles.link}>
          info@rumfordramatik.se
        </a>
        <SocialsNav />
      </div>
      <p>©{currentYear} Rum för dramatik.</p>
    </footer>
  );
};
