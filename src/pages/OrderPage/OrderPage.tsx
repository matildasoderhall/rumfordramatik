import { OrderForm } from '@/components/Forms/OrderForm';
import styles from './OrderPage.module.scss';
import classNames from 'classnames';

export const OrderPage = () => {
  return (
    <div className={classNames(styles.orderPage)}>
      <h1>Beställ</h1>
      <div className={styles.formWrapper}>
        <section className={styles.orderInfo}>
          <h2>Köp första numret</h2>
          <p>
            Detta formulär riktar sig till dig som inte kunde komma på vår
            releasefest men vill köpa Rum för dramatiks första nummer, 2025:1
            tema Rum.{' '}
          </p>
          <p>
            Boken kostar 120 kr. Du kan välja mellan att få den skickad till din
            hemadress (skriv då din adress i fältet nedan), eller mötas upp med
            någon av oss, antingen i Göteborg eller Stockholm. <br />
            Betalning sker då du fått boken i din hand, eller levererad till dig
            (du står själv för frakten). Det kommer finnas ett swishnummer.{' '}
          </p>
          <p>
            OBS! <br /> Antalet är begränsat och det är först till kvarn som
            gäller så det är tyvärr inte säkert att du får ett ex bara för att
            du skickat in det här formuläret. <br />
            Vi kommer höra av oss till dig på mail kring leverans.{' '}
          </p>
        </section>
        <OrderForm />
      </div>
    </div>
  );
};
