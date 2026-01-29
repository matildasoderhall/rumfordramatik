import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { NewsletterForm } from './NewsletterForm';

/**
 * The logic container for the Newsletter subscription feature.
 * * Responsibilities:
 * - Retrieves the Mailchimp Action URL from environment variables (`VITE_MAILCHIMP_URL`).
 * - Safeguards against missing configuration by logging a critical error and returning null instead of crashing.
 * - Wraps the presentation component (`NewsletterForm`) with the `MailchimpSubscribe` logic provider.
 * * @component
 * @requires VITE_MAILCHIMP_URL - Must be defined in .env file (Mailchimp Embedded Form Action URL).
 * * @example
 * // Usage in a page or layout
 * <section id="newsletter">
 * <NewsletterContainer />
 * </section>
 */
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
