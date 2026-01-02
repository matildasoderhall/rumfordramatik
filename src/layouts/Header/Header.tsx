import { Icon } from '@/components/Icon';
import { NavLink } from 'react-router';
import { IconFill, IconSize } from '@components/Icon/Icon.types';
import { LogoWithText } from '@/components/CustomIcons';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { MainNav } from './Nav';

export const Header = () => {
  return (
    <header className={classNames(styles.header)}>
      <div className={styles.innerWrapper}>
        <NavLink to="/">
          <Icon
            icon={LogoWithText}
            fill={IconFill.OnDark}
            size={IconSize.Space2XL}
          ></Icon>
        </NavLink>
        <h2 className={styles.headerText}>Rum för dramatik</h2>
        <MainNav />
      </div>
    </header>
  );
};
