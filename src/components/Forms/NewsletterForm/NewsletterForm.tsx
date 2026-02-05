import { InputVariant, TextInput } from '@/components/TextInput';
import styles from './NewsletterForm.module.scss';
import classNames from 'classnames';
import { Button, ButtonType } from '@/components/Button';
import { useState, type FormEvent, useEffect } from 'react';
import { Alert } from '@/components/Alert';
import { Spinner } from '@/components/Spinner';
import { Link } from 'react-router';

interface NewsletterFormProps {
  status: 'sending' | 'error' | 'success' | null;
  message: string | Error | null;
  onValidated: (formData: {
    FNAME: string;
    LNAME: string;
    EMAIL: string;
  }) => void;
}

/**
 * A newsletter subscription form designed to work with `react-mailchimp-subscribe`.
 *
 * Key behaviors:
 * - **Duplicate Handling:** Checks to detect "Already Subscribed" cases.
 * Mailchimp sometimes returns these as "success" (profile updated) and sometimes as "error".
 * This component unifies them into a single "Warning" popup state.
 * - **Success Handling:** Real new subscribers get a "Success" popup and the form is cleared.
 * - **Render Loop Prevention:** Uses `setTimeout(..., 0)` in `useEffect` to safely handle status updates
 * without triggering React synchronous state update warnings.
 *
 * @component
 * @example
 * <NewsletterForm
 * status={status}   // "sending" | "error" | "success"
 * message={message} // "Thank you for subscribing!" or "Already subscribed..."
 * onValidated={(formData) => submitToMailchimp(formData)}
 * />
 */
export const NewsletterForm = ({
  status,
  message,
  onValidated,
}: NewsletterFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);

  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const [alertOpen, setAlertOpen] = useState(false);

  const clearForm = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setGdprConsent(false);
    setLocalErrors({});
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const msg = String(message).toLowerCase();
      const isProfileUpdate =
        msg.includes('already subscribed') ||
        msg.includes('profile has been updated');

      if (status === 'success' && isProfileUpdate) {
        setAlertOpen(true);
      } else if (status === 'success') {
        setAlertOpen(true);
        clearForm();
      } else if (status === 'error') {
        if (
          msg.includes('already subscribed') ||
          msg.includes('redan prenumerant')
        ) {
          setAlertOpen(true);
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [status, message]);

  const msg = String(message).toLowerCase();

  const isDuplicate =
    (status === 'error' &&
      (msg.includes('already subscribed') ||
        msg.includes('redan prenumerant'))) ||
    (status === 'success' &&
      (msg.includes('already subscribed') ||
        msg.includes('profile has been updated')));

  const isRealSuccess = status === 'success' && !isDuplicate;

  const alertHeading = isRealSuccess ? 'Välkommen!' : 'Redan prenumerant';

  const alertDescription = isRealSuccess
    ? 'Tack för att du prenumererar på Rum för Dramatik.'
    : 'Den här e-postadressen finns redan i vårt register.';

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!firstName.trim()) {
      newErrors['firstName'] = 'Fyll i förnamn.';
      isValid = false;
    }
    if (!lastName.trim()) {
      newErrors['lastName'] = 'Fyll i efternamn.';
      isValid = false;
    }
    if (!email.trim()) {
      newErrors['email'] = 'Fyll i e-post.';
      isValid = false;
    } else if (!email.includes('@')) {
      newErrors['email'] = 'Ange en giltig e-post.';
      isValid = false;
    }
    if (!gdprConsent) {
      newErrors['gdpr'] = 'Du måste godkänna villkoren.';
      isValid = false;
    }

    setLocalErrors(newErrors);

    if (!isValid) return;

    onValidated({ FNAME: firstName, LNAME: lastName, EMAIL: email });
  };

  return (
    <>
      {/* THE ALERT POPUP */}
      <Alert
        isOpen={alertOpen}
        onClose={handleCloseAlert}
        heading={alertHeading}
        description={alertDescription}
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className={classNames(styles.newsletterForm)}
      >
        {/* Inline Error for Server Crashes (NOT duplicates) */}
        {status === 'error' && !isDuplicate && (
          <div
            className={styles.errorMessage}
            dangerouslySetInnerHTML={{ __html: String(message) }}
          />
        )}

        <TextInput
          label="Förnamn"
          name="firstName"
          value={firstName}
          onValueChange={(e) => {
            setFirstName(e.target.value);
            if (localErrors['firstName']) {
              setLocalErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors['firstName'];
                return newErrors;
              });
            }
          }}
          variant={
            localErrors['firstName'] ? InputVariant.Error : InputVariant.Primary
          }
          feedback={localErrors['firstName']}
          required
          disabled={status === 'sending'}
          autoComplete="given-name"
        />

        <TextInput
          label="Efternamn"
          name="lastName"
          value={lastName}
          onValueChange={(e) => {
            setLastName(e.target.value);
            if (localErrors['lastName']) {
              setLocalErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors['lastName'];
                return newErrors;
              });
            }
          }}
          variant={
            localErrors['lastName'] ? InputVariant.Error : InputVariant.Primary
          }
          feedback={localErrors['lastName']}
          required
          disabled={status === 'sending'}
          autoComplete="family-name"
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onValueChange={(e) => {
            setEmail(e.target.value);
            if (localErrors['email']) {
              setLocalErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors['email'];
                return newErrors;
              });
            }
          }}
          variant={
            localErrors['email'] ? InputVariant.Error : InputVariant.Primary
          }
          feedback={localErrors['email']}
          required
          disabled={status === 'sending'}
          autoComplete="email"
        />

        <div className={styles.checkboxWrapper}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              required
              name="gdpr_consent"
              className={styles.checkbox}
              checked={gdprConsent}
              onChange={(e) => {
                setGdprConsent(e.target.checked);
                if (e.target.checked && localErrors['gdpr']) {
                  setLocalErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors['gdpr'];
                    return newErrors;
                  });
                }
              }}
            />
            <span className={styles.labelText}>
              Jag godkänner att mina uppgifter behandlas enligt Rum för
              dramatiks{' '}
              <Link to="/integritetspolicy" target="_blank">
                integritetspolicy
              </Link>
              .
            </span>
          </label>

          {localErrors['gdpr'] && (
            <p className={styles.errorMessage}>{localErrors['gdpr']}</p>
          )}
        </div>

        <Button
          type={ButtonType.Submit}
          disabled={status === 'sending'}
          circled
        >
          {status === 'sending' ? <Spinner size={28} /> : 'Prenumerera'}
        </Button>
      </form>
    </>
  );
};
