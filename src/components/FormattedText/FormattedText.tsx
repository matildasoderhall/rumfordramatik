import React from 'react';
import styles from './FormattedText.module.scss';
import classNames from 'classnames';

interface FormattedTextProps {
  text: string | undefined;
  className?: string;
}

export const FormattedText = ({ text, className }: FormattedTextProps) => {
  if (!text) return null;

  const paragraphs = text.split(/\r\n\r\n\r\n/);

  return (
    <div className={classNames(styles.formattedText, className)}>
      {paragraphs.map((paragraph, pIndex) => {
        if (!paragraph.trim()) return null;

        const lines = paragraph.split(/\r\n|\n/);

        return (
          <p key={pIndex} className={styles.paragraph}>
            {lines.map((line, lIndex) => (
              <React.Fragment key={lIndex}>
                {line}
                {lIndex < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};
