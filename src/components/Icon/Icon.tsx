import styles from './icon.module.scss';
import classNames from 'classnames';
import type React from 'react';
import { IconFill, IconSize } from './Icon.types';

interface IconProps {
  /**
   * The SVG component to be rendered.
   * This should be a functional component that accepts standard SVG properties.
   */
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;

  /**
   * Sets the dimensions (width and height) of the icon.
   * Accepts a specific IconSize token.
   * @default IconSize.FsMD
   */
  size?: IconSize;

  /**
   * Determines the color variant applied to the icon's SVG path.
   * 'Inherit' allows the icon to take the color of its parent text/container.
   * @default IconFill.Inherit
   */
  fill?: IconFill;

  /**
   * Optional additional CSS class to apply to the icon for custom styling.
   */
  classname?: string;
}

/**
 * A standardized wrapper for rendering our custom SVG icons with consistent sizing and coloring.
 * * This component takes a raw SVG component and applies utility classes to control its dimensions (`size`)
 * and color (`fill`). It ensures icons adhere to the design system's spacing and color tokens.
 *
 * @component
 * @example
 * // Standard usage (inherits color from parent, default medium size)
 * <Icon icon={GmblInsightLogoWithText} />
 *
 * @example
 * // Customized usage with specific size and accent color
 * <Icon
 * icon={LighthouseIcon}
 * size={IconSize.FsSM}
 * fill={IconFill.Accent}
 * />
 *
 * @param {React.ComponentType<React.SVGProps<SVGSVGElement>>} props.icon - The SVG component to render. Must accept standard SVG props (like className).
 * @param {IconSize | Spacing} [props.size=IconSize.FsMD] - The size of the icon. Maps to `icon-size--*` classes in CSS.
 * @param {IconFill} [props.fill=IconFill.Inherit] - The fill color of the icon. Maps to `icon-fill--*` classes in CSS.
 * @param {string} [props.classname] - Optional additional CSS class to apply to the icon.
 *
 * @returns The styled SVG component.
 */
export const Icon = ({
  icon: IconComponent,
  size = IconSize.FsMD,
  fill = IconFill.Inherit,
}: IconProps) => {
  return (
    <IconComponent
      className={classNames(
        styles.icon,
        styles[`icon-fill--${fill}`],
        styles[`icon-size--${size}`]
      )}
    />
  );
};
