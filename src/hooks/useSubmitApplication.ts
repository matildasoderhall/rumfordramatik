import type { CF7Response } from "@/models/CF7Response";
import { submitApplication } from "@/services/api";
import axios from "axios";
import { useState } from "react"


/**
 * A custom hook that handles the submission logic for Contact Form 7 (CF7) forms.
 * * It manages the entire request lifecycle including loading state, success/error handling, 
 * and parsing validation errors returned by the WordPress REST API.
 *
 * @returns An object containing the submission handler, current status, server messages, validation errors, and a reset function.
 * * @example
 * ```tsx
 * const { submit, status, message, invalidFields } = useSubmitApplication();
 * * const handleSubmit = (formData) => {
 * submit('1337', formData); // Form ID and Data
 * };
 * * if (status === 'success') return <SuccessMessage msg={message} />;
 * ```
 */
export const useSubmitApplication = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [invalidFields, setInvalidFields] = useState<CF7Response['invalid_fields']>([]);

    const submit = async (formId: string, formData: FormData) => {
        setStatus('sending');
        setMessage('');
        setInvalidFields([]);

        try {
            const data = await submitApplication(formId, formData);

            if (data.status === 'mail_sent') {
                setStatus('success');
                setMessage(data.message);
            } else if (data.status === 'validation_failed') {
                setStatus('error');
                setInvalidFields(data.invalid_fields);
                setMessage(data.message);
            } else {
                setStatus('error');
                setMessage(data.message)
            }
        } catch (error) {
            setStatus('error');

            if (axios.isAxiosError(error)) {
                console.log("Axios Error", error.response?.data || error.message);
                setMessage('Serverfel: Kunde inte skicka ansökan. Försök igen senare.')
            } else {
                console.log("Unkown Error:", error);
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