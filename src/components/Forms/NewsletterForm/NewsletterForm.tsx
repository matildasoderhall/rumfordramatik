import { InputVariant, TextInput } from '@/components/TextInput';
import styles from './NewsletterForm.module.scss';
import classNames from 'classnames';
import { Button, ButtonType } from '@/components/Button';
import { useState, type FormEvent, useEffect } from 'react';
import { Alert } from '@/components/Alert';
import { AlertVariant } from '@/components/Alert/Alert.types';

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

  const [localError, setLocalError] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);

  const clearForm = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setLocalError(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check the message content even if status is success
      const msg = String(message).toLowerCase();
      const isProfileUpdate = msg.includes('already subscribed') || msg.includes('profile has been updated');

      if (status === 'success' && isProfileUpdate) {
        // ⚠️ It is technically a success (profile updated), but for the user -> "Already Subscribed"
        setAlertOpen(true); 
        // Do NOT clear form so they can see what they typed
      } 
      else if (status === 'success') {
        // ✅ Real Success (New Subscriber)
        setAlertOpen(true);
        clearForm();
      } 
      else if (status === 'error') {
        // ❌ Error (Duplicate or other)
        if (msg.includes('already subscribed') || msg.includes('redan prenumerant')) {
          setAlertOpen(true);
        }
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, [status, message]);

  const msg = String(message).toLowerCase();
  
  const isDuplicate = 
    (status === 'error' && (msg.includes('already subscribed') || msg.includes('redan prenumerant'))) ||
    (status === 'success' && (msg.includes('already subscribed') || msg.includes('profile has been updated')));

  const isRealSuccess = status === 'success' && !isDuplicate;

  const alertVariant = isRealSuccess ? AlertVariant.Success : AlertVariant.Warning;
  
  const alertHeading = isRealSuccess ? 'Välkommen!' : 'Redan prenumerant';

  const alertDescription = isRealSuccess
    ? 'Tack för att du prenumererar på Rum för Dramatik.'
    : 'Den här e-postadressen finns redan i vårt register.';

  
  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email.includes('@')) {
      setLocalError(true);
      return;
    }
    onValidated({ FNAME: firstName, LNAME: lastName, EMAIL: email });
  };

  return (
    <>
      {/* THE ALERT POPUP */}
      <Alert
        isOpen={alertOpen}
        onClose={handleCloseAlert}
        variant={alertVariant}
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
          onValueChange={(e) => setFirstName(e.target.value)}
          variant={
            localError && !firstName ? InputVariant.Error : InputVariant.Primary
          }
          required
          disabled={status === 'sending'}
        />

        <TextInput
          label="Efternamn"
          name="lastName"
          value={lastName}
          onValueChange={(e) => setLastName(e.target.value)}
          variant={
            localError && !lastName ? InputVariant.Error : InputVariant.Primary
          }
          required
          disabled={status === 'sending'}
        />

        <TextInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onValueChange={(e) => setEmail(e.target.value)}
          variant={
            localError && !email ? InputVariant.Error : InputVariant.Primary
          }
          required
          disabled={status === 'sending'}
        />

        <Button type={ButtonType.Submit} disabled={status === 'sending'} circled>
          {status === 'sending' ? 'Skickar...' : 'Prenumerera'}
        </Button>
      </form>
    </>
  );
};
