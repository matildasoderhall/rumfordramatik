import styles from './AboutPage.module.scss';
import classNames from 'classnames';

export const AboutPage = () => {
  return (
    <div className={classNames(styles.aboutPage)}>
      <h1 className={styles.title}>Om oss</h1>

      <div className={styles.imgWrapperTop}>
        <img
          src="http://rumfordramatik.se/admin/wp-content/uploads/2026/01/test.jpeg"
          alt=""
        />
      </div>
      <span className={styles.longSticker}>
        Sveriges enda tidskrift för dramatik
      </span>
      <div className={styles.imgWrapperBottom}>
        <img
          src="http://rumfordramatik.se/admin/wp-content/uploads/2026/01/test.jpeg"
          alt=""
        />
      </div>

      <div className={styles.aboutTextWrapper}>
        <p>
          Vi är en <span className={styles.circled}>fysisk tidskrift</span> som
          publicerar nyskriven dramatik på svenska, men även på norska och
          danska tillsammans med svensk översättning. Tidskriften vänder sig
          till dem som har ett intresse för{' '}
          <span className={styles.underlined}> dramatik</span>, text och
          scenkonst.
        </p>
        <p>
          Med tidskriften vill vi skapa en{' '}
          <span className={styles.underlined}>mötesplats</span> för den samtida
          dramatiken, utforska vad dramatisk text kan vara idag och ge en
          alternativ möjlighet för dramatiker att bli{' '}
          <span className={styles.circled}>publicerade</span>.
        </p>
      </div>
      <span className={styles.shortSticker}>mötesplats</span>
      <p className={styles.contactText}>
        Har du några funderingar eller vill komma i kontakt med oss kan du
        skriva till oss på sociala medier eller mejla till {' '}
        <a href="mailto:info@rumfordramatik.se">
          info@rumfordramatik.se
        </a>
        .
      </p>
    </div>
  );
};
