import { useState, type FormEvent } from 'react';
import { Button, ButtonType } from '@/components/Button';
import styles from './OpenCallForm.module.scss';
import { InputVariant, TextInput } from '@/components/TextInput';
import { useSubmitForm } from '@/hooks/useSubmitForm';
import { FileInput } from '@/components/FileInput';
import { XIcon } from '@phosphor-icons/react';
import { Spinner } from '@/components/Spinner';
import { Link } from 'react-router';

/**
 * A form component allowing users to submit an "Open Call" application.
 *
 * This component handles:
 * - Collecting applicant details (First Name, Last Name, Email).
 * - Managing file uploads with client-side validation for size (Max 10MB) and count (Max 3 files).
 * - Submitting data to WordPress via Contact Form 7 (using the `useSubmitApplication` hook).
 * - Displaying validation errors returned from the server.
 * - Rendering a success state upon successful submission.
 *
 * @component
 * @example
 * return (
 * <main>
 * <h1>Apply Now</h1>
 * <OpenCallForm />
 * </main>
 * )
 */
export const OpenCallForm = () => {
  const { submit, status, message, invalidFields } = useSubmitForm();

  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [gdprConsent, setGdprConsent] = useState(false);

  const getFieldError = (fieldName: string): string | undefined => {
    return (
      localErrors[fieldName] ||
      invalidFields?.find((err) => err.field === fieldName)?.message
    );
  };

  const handleFilesSelected = (incomingFiles: File[]) => {
    const updatedFiles = [...files, ...incomingFiles];

    const MAX_FILES = 3;
    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (localErrors['files']) {
      setLocalErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors['files'];
        return newErrors;
      });
    }

    if (updatedFiles.length > MAX_FILES) {
      setLocalErrors((prev) => ({
        ...prev,
        files: `Du kan max ladda upp ${MAX_FILES} filer totalt.`,
      }));
      return;
    }

    const totalSize = updatedFiles.reduce((acc, file) => acc + file.size, 0);
    if (totalSize > MAX_SIZE_BYTES) {
      setLocalErrors((prev) => ({
        ...prev,
        files: `Total filstorlek är för stor! (Max ${MAX_SIZE_MB}MB)`,
      }));
      return;
    }

    const uniqueFiles = updatedFiles.filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    setFiles(uniqueFiles);
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!firstName.trim()) {
      newErrors['applicant-firstname'] = 'Detta fält är obligatoriskt.';
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors['applicant-lastname'] = 'Detta fält är obligatoriskt.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors['applicant-email'] = 'Detta fält är obligatoriskt.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors['applicant-email'] = 'Ange en giltig e-postadress.';
      isValid = false;
    }

    if (files.length === 0) {
      newErrors['files'] = `Du måste ladda upp minst 1 fil.`;
      isValid = false;
    }

    if (!gdprConsent) {
      newErrors['gdpr'] = 'Du måste godkänna villkoren';
      isValid = false;
    }

    setLocalErrors(newErrors);
    if (!isValid) return;

    const formData = new FormData();
    formData.append('applicant-firstname', firstName);
    formData.append('applicant-lastname', lastName);
    formData.append('applicant-email', email);
    formData.append('_wpcf7_unit_tag', 'headless-form');
    formData.append('gdpr-consent', '1');

    files.forEach((file, index) => {
      formData.append(`file-${index + 1}`, file);
    });

    submit('56', formData);
  };

  if (status === 'success') {
    return (
      <section className={styles.successMessage}>
        <h2>Tack för din ansökan!</h2>
        <p>{message}</p>
      </section>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.infoText}>
        <h2>Fyll i nedan uppgifter för att skicka in din ansökan.</h2>
        <p>Notera att filen måste vara PDF, DOC eller DOCX (Max 10MB).</p>
      </div>
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
        autoComplete="given-name"
        onValueChange={(e) => {
          setFirstName(e.target.value);
          if (localErrors['applicant-firstname']) {
            setLocalErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors['applicant-firstname'];
              return newErrors;
            });
          }
        }}
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
        autoComplete="family-name"
        onValueChange={(e) => {
          setLastName(e.target.value);
          if (localErrors['applicant-lastname']) {
            setLocalErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors['applicant-lastname'];
              return newErrors;
            });
          }
        }}
        disabled={status === 'sending'}
      />

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
        autoComplete="email"
        onValueChange={(e) => {
          setEmail(e.target.value);
          if (localErrors['applicant-email']) {
            setLocalErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors['applicant-email'];
              return newErrors;
            });
          }
        }}
        disabled={status === 'sending'}
      />
      <div>
        <FileInput
          label="Ladda upp fil/filer"
          subLabel="*Obligatoriskt. max 3 filer total storlek 10MB"
          accept=".pdf,.doc,.docx"
          multiple={true}
          onFilesSelected={handleFilesSelected}
          error={localErrors['files'] || getFieldError('file-1')}
        />

        {files.length > 0 && (
          <ul className={styles.fileList}>
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className={styles.fileItem}>
                <span className={styles.fileName}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </span>

                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className={styles.removeBtn}
                  aria-label="Ta bort fil"
                >
                  <XIcon size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.submitButtonWrapper}>
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
            Jag godkänner att mina uppgifter behandlas enligt Rum för Dramatiks{' '}
            <Link to="/integritetspolicy" target="_blank">
              integritetspolicy
            </Link>
            .
          </span>
        </label>

        {localErrors['gdpr'] && (
          <p className={styles.errorMessage}>{localErrors['gdpr']}</p>
        )}

        {status === 'error' && (
          <div className={styles.errorMessage}>{message}</div>
        )}

        <Button
          type={ButtonType.Submit}
          disabled={status === 'sending'}
          className={styles.submitButton}
        >
          {status === 'sending' ? (
            <>
              Skickar <Spinner size={28} />{' '}
            </>
          ) : (
            'Skicka ansökan'
          )}
        </Button>
      </div>
    </form>
  );
};
