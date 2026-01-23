import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Button, ButtonType } from '@/components/Button';
import styles from './OpenCallForm.module.scss';
import { InputVariant, TextInput } from '@/components/TextInput';
import { useSubmitApplication } from '@/hooks/useSubmitApplication';

export const OpenCallForm = () => {
  const { submit, status, message, invalidFields } = useSubmitApplication();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const MAX_SIZE_MB = 10;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  const getFieldError = (fieldName: string): string | undefined => {
    return invalidFields?.find((err) => err.field === fieldName)?.message;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);

      if (newFiles.length > 3) {
        alert('Du kan max ladda upp 3 filer.');
        return;
      }

      if (totalSize > MAX_SIZE_BYTES) {
        alert(
          `Filerna är för stora! Total storlek får max vara ${MAX_SIZE_MB}MB.`
        );
        return;
      }

      setFiles(newFiles);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('applicant-firstname', firstName);
    formData.append('applicant-lastname', lastName);
    formData.append('applicant-email', email);
    formData.append('_wpcf7_unit_tag', 'headless-form');

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
    <section className={styles.formContainer}>
      <h2>Fyll i nedan uppgifter för att skicka in din ansökan.</h2>
      <p>Notera att filen måste vara PDF, DOC eller DOCX (Max 10MB).</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
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

        <div className={styles.inputGroup}>
          <label htmlFor="file">
            Ladda upp manus (Max 3 filer, totalt 10MB)
            <input
              type="file"
              id="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>
          {files.length > 0 && (
            <ul className={styles.fileList}>
              {files.map((f, i) => (
                <li key={i}>
                  {f.name} ({(f.size / 1024 / 1024).toFixed(1)} MB)
                </li>
              ))}
            </ul>
          )}
          {getFieldError('application-file') && (
            <span className="error-text">
              {getFieldError('application-file')}
            </span>
          )}
        </div>

        {status === 'error' && (
          <div className={styles.errorMessage}>{message}</div>
        )}

        <Button type={ButtonType.Submit} disabled={status === 'sending'}>
          {status === 'sending' ? 'Skickar...' : 'Skicka ansökan'}
        </Button>
      </form>
    </section>
  );
};
