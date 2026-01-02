import { FacebookLogoIcon, InstagramLogoIcon } from '@phosphor-icons/react';
import styles from './SocialsNav.module.scss';
import classNames from 'classnames';

const SOCIAL_LINKS = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/rumfordramatik/',
    label: 'Instagram',
    Icon: InstagramLogoIcon,
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/people/Rum-f%C3%B6r-dramatik/61582464204202/',
    label: 'Facebook',
    Icon: FacebookLogoIcon,
  },
];

/**
 * Renders a navigation list of social media links based on the `SOCIAL_LINKS` constant.
 *
 * **Accessibility Features:**
 * - Visual icons are hidden from screen readers (`aria-hidden="true"`) to prevent redundancy.
 * - Each link includes visually hidden text (e.g., "Instagram (opens in new tab)") to provide context for screen reader users.
 * - Explicitly warns users that the link opens in a new window/tab.
 *
 * **Security:**
 * - Uses `target="_blank"` combined with `rel="noopener noreferrer"` to prevent security vulnerabilities.
 *
 * @component
 * @returns The rendered unordered list of social links.
 *
 * @example
 * // Usage inside a Footer
 * <footer>
 * <SocialsNav />
 * </footer>
 */
export const SocialsNav = () => {
  return (
    <nav>
      <ul className={classNames(styles.socialsNav)}>
        {SOCIAL_LINKS.map(({ id, href, label, Icon }) => (
          <li key={id}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.links}
            >
              <Icon size={36} aria-hidden="true" focusable="false" />

              <span className="visually-hidden">
                {label} (opens in new tab)
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
