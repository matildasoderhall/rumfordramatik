import { OrderForm } from '@/components/Forms/OrderForm';
import styles from './OrderPage.module.scss';
import classNames from 'classnames';
import { SEO } from '@/components/SEO';

export const OrderPage = () => {
  return (
    <div className={classNames(styles.orderPage)}>
      <SEO
        title="Beställ"
        description="Köp lösnummer av Rum för dramatik. Stötta utgivningen av nyskriven dramatik och få tidskriften direkt hem i brevlådan eller hämta ut den i Stockholm eller Göteborg."
      />
      <h1>Beställ</h1>
      <div className={styles.formWrapper}>
        <section className={styles.orderInfo}>
          <h2>Köp första numret</h2>
          <p>
            Tidskriften kostar 120 kr. Du kan välja mellan att få den skickad
            till din hemadress eller mötas upp i Göteborg eller Stockholm.
          </p>
          <p>
            Betalning sker då du fått boken i din hand eller levererad till dig.
            Mottagare bekostar frakt. Du får en faktura med angivet Swish- och
            kontonummer.
          </p>
          <p>
            OBS! <br /> Antalet är begränsat. Det är tyvärr inte säkert att du
            får ett exemplar bara för att du skickat in formuläret. <br /> Vi
            kommer höra av oss till dig på mail angående leverans.
          </p>
        </section>
        <OrderForm />
      </div>
    </div>
  );
};
