import styles from './Footer.module.scss';
import { SocialsNav } from './SocialsNav';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a
          href="mailto:info@rumfordramatik.se"
          className={styles.link}
        >
          info@rumfordramatik.se
        </a>
        <SocialsNav />
      </div>
      <p>©2025 | Rum för dramatik. All rights reserved.</p>
    </footer>
  );
};
