import type React from 'react';

interface MainProps {
  children: React.ReactNode;
}

/**
 * Main content wrapper component
 *
 * Provides semantic <main> element for primary page content.
 * Used within MainLayout to wrap route content.
 */
export const Main = ({ children }: MainProps) => {
  return <main>{children}</main>;
};
