import { useState } from "react";
import axios from "axios";
import { submitContactForm } from "@/services/api"; 
import type { CF7Response } from "@/models/CF7Response";

/**
 * A custom hook that handles the submission logic for any Contact Form 7 (CF7) form.
 * * It manages the entire request lifecycle including loading states, success/error handling, 
 * and parsing validation errors returned by the WordPress REST API.
 *
 * @returns An object containing the submission handler and current state.
 * @property {(formId: string, formData: FormData) => Promise<void>} submit - Function to trigger the form submission.
 * @property {'idle' | 'sending' | 'success' | 'error'} status - The current status of the submission.
 * @property {string} message - Feedback message from the server (success message or error description).
 * @property {Array} invalidFields - Array of validation errors if the status is 'validation_failed'.
 * @property {() => void} reset - Function to reset the form state back to 'idle'.
 * * @example
 * ```tsx
 * const { submit, status, message, reset } = useSubmitForm();
 * const handleSubmit = (e) => {
 *      e.preventDefault();
 * 
 *      const formData = new FormData(e.currentTarget);
 *      submit('123', formData); // Form ID must be a string
 *   };
 * 
 * if (status === 'success') {
 *      return <div>{message} <button onClick={reset}>Ny beställning</button></div>;
 * }
 * ```
 */
export const useSubmitForm = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [invalidFields, setInvalidFields] = useState<CF7Response['invalid_fields']>([]);

    const submit = async (formId: string, formData: FormData) => {
        setStatus('sending');
        setMessage('');
        setInvalidFields([]);

        try {
            const data = await submitContactForm(formId, formData);

            if (data.status === 'mail_sent') {
                setStatus('success');
                setMessage(data.message);
            } else if (data.status === 'validation_failed') {
                setStatus('error');
                setInvalidFields(data.invalid_fields);
                setMessage(data.message); 
            } else {
                setStatus('error');
                setMessage(data.message);
            }
        } catch (error) {
            setStatus('error');

            if (axios.isAxiosError(error)) {
                console.error("Axios Error", error.response?.data || error.message);
                setMessage('Serverfel: Kunde inte skicka formuläret. Försök igen senare.');
            } else {
                console.error("Unknown Error:", error);
                setMessage('Nätverksfel: Kontrollera din anslutning.');
            }
        }
    };

    const reset = () => {
        setStatus('idle');
        setMessage('');
        setInvalidFields([]);
    };

    return { submit, status, message, invalidFields, reset };
};