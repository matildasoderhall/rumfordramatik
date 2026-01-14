import { XIcon, ListIcon } from '@phosphor-icons/react';
import styles from './MainNav.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { NavLink } from 'react-router';

const NAV_ITEMS = [
  { label: 'Hem', path: '/' },
  { label: 'Prenumerera', path: 'prenumerera' },
  { label: 'Om oss', path: 'om-oss' },
  { label: 'Open Call', path: 'open-call' },
  { label: 'Arkiv', path: 'arkiv' },
];

export const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className={classNames(styles.menuToggleBtn, {
          [styles.hidden]: isOpen,
        })}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <ListIcon size={32} aria-hidden={true} />
      </button>

      <nav
        className={classNames(styles.nav, { [styles.isOpen]: isOpen })}
        aria-label="Main"
      >
        <button
          className={styles.closeBtn}
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <XIcon size={32} aria-hidden={true} />
        </button>
        <ul className={classNames(styles.navList)}>
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(!isOpen)}
                className={({ isActive }) =>
                  classNames(styles.link, { [styles.active]: isActive })
                }
              >
                {({ isActive }) => (
                  <span aria-current={isActive ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={classNames(styles.backdrop, { [styles.isOpen]: isOpen })}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};
