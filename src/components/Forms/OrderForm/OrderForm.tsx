import { InputVariant, TextInput } from '@/components/TextInput';
import styles from './OrderForm.module.scss';
import classNames from 'classnames';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { useState, type FormEvent } from 'react';
import { Button, ButtonType } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { Link } from 'react-router';

export const OrderForm = () => {
  const { submit, status, message, invalidFields } = useSubmitForm();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [shipmentMethod, setShipmentMethod] = useState(
    'Skickat till mig (frakt tillkommer)'
  );
  const [newsletter, setNewsletter] = useState(false);

  const getFieldError = (fieldName: string): string | undefined => {
    return invalidFields?.find((err) => err.field === fieldName)?.message;
  };

  const requiresAddress =
    shipmentMethod === 'Skickat till mig (frakt tillkommer)';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('your-firstname', firstName);
    formData.append('your-lastname', lastName);
    formData.append('your-email', email);
    formData.append('quantity', quantity);
    formData.append('shipment', shipmentMethod);

    if (requiresAddress) {
      formData.append('your-address', address);
      formData.append('your-zip', zip);
      formData.append('your-city', city);
    }

    if (newsletter) {
      formData.append('mc4wp-subscribe', '1');
    }

    formData.append('_wpcf7_unit_tag', 'order-form');

    submit('55', formData);
  };

  if (status === 'success') {
    return (
      <section className={styles.successMessage}>
        <h2>Tack för din beställning!</h2>
        <p>
          Vi har mottagit din order. Betalningsinfo kommer via mejl inom kort.
        </p>
        <p className={styles.note}>{message}</p>
      </section>
    );
  }
  return (
    <div className={styles.orderFormWrapper}>
      <form className={classNames(styles.orderForm)} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <TextInput
            type="text"
            label="Förnamn"
            name="firstname"
            variant={
              getFieldError('applicant-firstname')
                ? InputVariant.Error
                : InputVariant.Primary
            }
            feedback={getFieldError('applicant-firstname')}
            value={firstName}
            required
            onValueChange={(e) => setFirstName(e.target.value)}
            disabled={status === 'sending'}
          />

          <TextInput
            type="text"
            label="Efternamn"
            name="lastname"
            variant={
              getFieldError('applicant-lastname')
                ? InputVariant.Error
                : InputVariant.Primary
            }
            feedback={getFieldError('applicant-lastname')}
            value={lastName}
            required
            onValueChange={(e) => setLastName(e.target.value)}
            disabled={status === 'sending'}
          />
        </div>

        <TextInput
          type="email"
          label="Email"
          name="email"
          variant={
            getFieldError('applicant-email')
              ? InputVariant.Error
              : InputVariant.Primary
          }
          feedback={getFieldError('applicant-email')}
          value={email}
          required
          onValueChange={(e) => setEmail(e.target.value)}
          disabled={status === 'sending'}
        />

        <div className={styles.narrowField}>
          <TextInput
            type="number"
            label="Antal exemplar"
            name="quantity"
            variant={
              getFieldError('quantity')
                ? InputVariant.Error
                : InputVariant.Primary
            }
            feedback={getFieldError('quantity')}
            value={quantity}
            required
            min={1}
            onValueChange={(e) => setQuantity(e.target.value)}
            disabled={status === 'sending'}
          />
        </div>

        <div className={styles.radioGroupWrapper}>
          <span className={styles.label}>Leveranssätt</span>
          <div className={styles.radioGroup}>
            {[
              'Skickat till mig (frakt tillkommer)',
              'Mötas upp i Göteborg',
              'Mötas upp i Stockholm',
            ].map((option) => (
              <label key={option} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="shipment"
                  value={option}
                  checked={shipmentMethod === option}
                  onChange={(e) => setShipmentMethod(e.target.value)}
                  disabled={status === 'sending'}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        {requiresAddress && (
          <div className={styles.addressSection}>
            <TextInput
              type="text"
              label="Gatuadress"
              name="your-address"
              variant={
                getFieldError('your-address')
                  ? InputVariant.Error
                  : InputVariant.Primary
              }
              feedback={getFieldError('your-address')}
              value={address}
              required={requiresAddress}
              onValueChange={(e) => setAddress(e.target.value)}
              disabled={status === 'sending'}
            />

            <div className={styles.zipCityRow}>
              <div className={styles.zipField}>
                <TextInput
                  type="text"
                  label="Postnummer"
                  name="your-zip"
                  variant={
                    getFieldError('your-zip')
                      ? InputVariant.Error
                      : InputVariant.Primary
                  }
                  feedback={getFieldError('your-zip')}
                  value={zip}
                  required={requiresAddress}
                  onValueChange={(e) => setZip(e.target.value)}
                  disabled={status === 'sending'}
                />
              </div>
              <TextInput
                type="text"
                label="Ort"
                name="your-city"
                variant={
                  getFieldError('your-city')
                    ? InputVariant.Error
                    : InputVariant.Primary
                }
                feedback={getFieldError('your-city')}
                value={city}
                required={requiresAddress}
                onValueChange={(e) => setCity(e.target.value)}
                disabled={status === 'sending'}
              />
            </div>
          </div>
        )}

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="mc4wp-subscribe"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              disabled={status === 'sending'}
            />
            <span className={styles.customCheckbox}></span>
            <span className={styles.labelText}>
              Ja, jag vill gärna ha nyhetsbrevet!
            </span>
          </label>
        </div>

        <p className={styles.legalText}>
          Genom att skicka beställningen godkänner du att vi sparar dina
          uppgifter för att kunna hantera din order. Läs mer i vår{' '}
          <Link to="/integritetspolicy" target="_blank">
            integritetspolicy
          </Link>
          .
        </p>

        {status === 'error' && (
          <div className={styles.errorMessage}>{message}</div>
        )}

        <Button
          type={ButtonType.Submit}
          disabled={status === 'sending'}
          className={styles.submitButton}
        >
          {status === 'sending' ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Skickar <Spinner size={20} />
            </span>
          ) : (
            'Skicka beställning'
          )}
        </Button>
      </form>
    </div>
  );
};
