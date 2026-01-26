import styles from './OpenCallPage.module.scss';
import classNames from 'classnames';
import { OpenCallForm } from '@/components/Forms/OpenCallForm';

export const OpenCallPage = () => {
  return (
    <div className={classNames(styles.openCallPage)}>
      <h1 className={styles.pageTitle}>Open Call</h1>
      <OpenCallForm />
    </div>
  );
};
