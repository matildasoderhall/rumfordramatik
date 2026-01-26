import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { NewsletterForm } from './NewsletterForm';

export const NewsletterContainer = () => {
  const MAILCHIMP_URL = import.meta.env.VITE_MAILCHIMP_URL;

  if (!MAILCHIMP_URL) {
    console.error('CRITICAL: VITE_MAILCHIMP_URL is missing in .env file!');
    return null;
  }

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={({ subscribe, status, message }) => (
        <NewsletterForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};
