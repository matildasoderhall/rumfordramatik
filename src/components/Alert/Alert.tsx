import styles from './Alert.module.scss';
import classNames from 'classnames';
import { XIcon } from '@phosphor-icons/react';
import logo from '../../assets/logga-med-namn_vit.png';

interface AlertProps {
  /**
   * Controls the visibility of the alert.
   * If `false`, the component returns `null` and is not rendered in the DOM.
   */
  isOpen: boolean;
  /**
   * Callback fired when the user clicks the close (X) button.
   */
  onClose: () => void;
  /**
   * The main title text of the alert.
   */
  heading: string;
  /**
   * Optional detailed text body rendered below the heading.
   */
  description?: string;
}

/**
 * A modal alert component built using the native HTML5 `<dialog>` element.
 * * It renders a blocking overlay (backdrop) and centers the content.
 * The icon is automatically selected based on the `variant` prop.
 * @component
 *
 * * @example
 * ```tsx
 * <Alert
 * isOpen={showError}
 * onClose={() => setShowError(false)}
 * heading="Error Occurred"
 * description="We could not save your data."
 * variant={AlertVariant.Error}
 * />
 * ```
 */
export const Alert = ({
  isOpen,
  onClose,
  heading,
  description,
}: AlertProps) => {
  if (!isOpen) return null;

  return (
    <dialog
      className={classNames(styles.alert)}
      ref={(node) => {
        if (!node) return;
        if (!node.open) {
          node.showModal();
        }
      }}
    >
      <button
        className={styles.close}
        onClick={onClose}
        aria-label="Close alert"
      >
        <XIcon size={34} />
      </button>

      <div className={styles.content}>
        <div className={styles.imgWrapper}>
          <img
            src={logo}
            alt="rum för dramatik logga"
            width={464}
            height={576}
          />
        </div>

        <h2 className={styles.heading}>{heading}</h2>
        <p>{description}</p>
      </div>
    </dialog>
  );
};
