import styles from './Alert.module.scss';
import classNames from 'classnames';
import { AlertVariant } from './Alert.types';
import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XIcon,
} from '@phosphor-icons/react';

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
   * The style variant, which determines the color scheme and icon.
   * - `Success`: Green with CheckCircleIcon
   * - `Error` / `Warning`: Red/Orange with WarningCircleIcon
   * - `Info`: Blue with InfoIcon (Default)
   * @default AlertVariant.Info
   */
  variant?: AlertVariant;
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
  variant = AlertVariant.Info,
  heading,
  description,
}: AlertProps) => {
  if (!isOpen) return null;

  const renderIcon = () => {
    switch (variant) {
      case AlertVariant.Success:
        return (
          <div className={styles.successIcon}>
            <CheckCircleIcon size={80} />
          </div>
        );
      case AlertVariant.Error:
      case AlertVariant.Warning:
        return (
          <div className={styles.warningIcon}>
            <WarningCircleIcon size={80} />
          </div>
        );
      default:
        return (
          <div className={styles.infoIcon}>
            <InfoIcon size={80} />
          </div>
        );
    }
  };

  return (
    <dialog
      className={classNames(styles.alert, `alert-${variant}`)}
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
        {renderIcon()}
        <h2 className={styles.heading}>
          {heading}
        </h2>
        <p>{description}</p>
      </div>
    </dialog>
  );
};
