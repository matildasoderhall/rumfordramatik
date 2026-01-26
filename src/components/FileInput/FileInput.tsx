import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import styles from './FileInput.module.scss';
import classNames from 'classnames';

interface FileInputProps {
  label: string;
  subLabel?: string;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  error?: string;
  onFilesSelected: (files: File[]) => void;
}

/**
 * A wrapper component for file uploads that supports both Drag-and-Drop and Click-to-Browse.
 *
 * It hides the native HTML file input and presents a styled "drop zone" instead.
 * When files are selected (via drop or dialog), it passes the raw `File[]` array to the parent.
 *
 * @component
 * @example
 * const handleFiles = (files: File[]) => {
 * console.log("User picked:", files);
 * };
 *
 * return (
 * <FileInput
 * label="Ladda upp CV"
 * subLabel="Endast PDF, max 5MB"
 * accept=".pdf"
 * multiple={false}
 * onFilesSelected={handleFiles}
 * error={errorMessage}
 * />
 * );
 */
export const FileInput = ({
  label,
  subLabel,
  accept,
  multiple = false,
  error,
  onFilesSelected,
}: FileInputProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = `file-input-${label.replace(/\s/g, '')}`;

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <div
        className={classNames(styles.dropZone, {
          [styles.dragActive]: isDragActive,
          [styles.error]: !!error,
        })}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <span className={styles.dropText}>Välj fil eller droppa här</span>

        {/* Hidden Input */}
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          className={styles.hiddenInput}
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
        />
      </div>

      {/* Helper Text or Error Message */}
      {error ? (
        <span className={styles.feedback}>{error}</span>
      ) : (
        <span className={styles.mandatory}>{subLabel}</span>
      )}
    </div>
  );
};
