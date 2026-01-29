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
  const [startTime] = useState(() => Date.now());
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

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
    return (
      localErrors[fieldName] ||
      invalidFields?.find((err) => err.field === fieldName)?.message
    );
  };

  const clearError = (field: string) => {
    if (localErrors[field]) {
      setLocalErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const requiresAddress =
    shipmentMethod === 'Skickat till mig (frakt tillkommer)';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const rawData = new FormData(e.currentTarget as HTMLFormElement);
    const honey = rawData.get('_honey');

    if (honey && honey !== '') {
      return;
    }

    const submitTime = Date.now();
    const timeTaken = submitTime - startTime;

    if (timeTaken < 2500) {
      return;
    }

    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!firstName.trim()) {
      newErrors['mc4wp-FNAME'] = 'Fyll i förnamn.';
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors['mc4wp-LNAME'] = 'Fyll i efternamn.';
      isValid = false;
    }
    if (!email.trim()) {
      newErrors['mc4wp-EMAIL'] = 'Fyll i e-post.';
      isValid = false;
    } else if (!email.includes('@')) {
      newErrors['mc4wp-EMAIL'] = 'Ogiltig e-postadress.';
      isValid = false;
    }

    if (!quantity || parseInt(quantity) < 1) {
      newErrors['quantity'] = 'Ange antal.';
      isValid = false;
    }

    if (requiresAddress) {
      if (!address.trim()) {
        newErrors['your-address'] = 'Fyll i gatuadress.';
        isValid = false;
      }
      if (!zip.trim()) {
        newErrors['your-zip'] = 'Fyll i postnummer.';
        isValid = false;
      }
      if (!city.trim()) {
        newErrors['your-city'] = 'Fyll i ort.';
        isValid = false;
      }
    }

    setLocalErrors(newErrors);
    if (!isValid) return;

    const formData = new FormData();

    formData.append('mc4wp-FNAME', firstName);
    formData.append('mc4wp-LNAME', lastName);
    formData.append('mc4wp-EMAIL', email);
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
      </section>
    );
  }
  return (
    <div className={styles.orderFormWrapper}>
      <form className={classNames(styles.orderForm)} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <TextInput
            type="text"
            label="Förnamn"
            name="mc4wp-FNAME"
            variant={
              getFieldError('mc4wp-FNAME')
                ? InputVariant.Error
                : InputVariant.Primary
            }
            feedback={getFieldError('mc4wp-FNAME')}
            value={firstName}
            required
            autoComplete="given-name"
            onValueChange={(e) => {
              setFirstName(e.target.value);
              clearError('mc4wp-FNAME');
            }}
            disabled={status === 'sending'}
          />

          <TextInput
            type="text"
            label="Efternamn"
            name="mc4wp-LNAME"
            variant={
              getFieldError('mc4wp-LNAME')
                ? InputVariant.Error
                : InputVariant.Primary
            }
            feedback={getFieldError('mc4wp-LNAME')}
            value={lastName}
            required
            autoComplete="family-name"
            onValueChange={(e) => {
              setLastName(e.target.value);
              clearError('mc4wp-LNAME');
            }}
            disabled={status === 'sending'}
          />
        </div>

        <TextInput
          type="email"
          label="Email"
          name="mc4wp-EMAIL"
          variant={
            getFieldError('mc4wp-EMAIL')
              ? InputVariant.Error
              : InputVariant.Primary
          }
          feedback={getFieldError('mc4wp-EMAIL')}
          value={email}
          required
          autoComplete="email"
          onValueChange={(e) => {
            setEmail(e.target.value);
            clearError('mc4wp-EMAIL');
          }}
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
            onValueChange={(e) => {
              setQuantity(e.target.value);
              clearError('quantity');
            }}
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
                  onChange={(e) => {
                    setShipmentMethod(e.target.value);
                    if (
                      e.target.value !== 'Skickat till mig (frakt tillkommer)'
                    ) {
                      setLocalErrors((prev) => {
                        const newErr = { ...prev };
                        delete newErr['your-address'];
                        delete newErr['your-zip'];
                        delete newErr['your-city'];
                        return newErr;
                      });
                    }
                  }}
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
              autoComplete="address-line1"
              onValueChange={(e) => {
                setAddress(e.target.value);
                clearError('your-address');
              }}
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
                  autoComplete="postal-code"
                  onValueChange={(e) => {
                    setZip(e.target.value);
                    clearError('your-zip');
                  }}
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
                onValueChange={(e) => {
                  setCity(e.target.value);
                  clearError('your-city');
                }}
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

        <input
          type="text"
          name="_honey"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

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
