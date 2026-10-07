import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export type SafeAreaProps = ComponentProps<'div'> & {
  /** Classes of the band under the status bar / notch (e.g. a background matching the header). */
  topClassName?: string;
  /** Classes of the band over the home indicator. */
  bottomClassName?: string;
};

/**
 * Keeps content clear of the notch, status bar and home indicator on mobile devices.
 * The top and bottom insets are separate bands so they can be styled; left and right are padding.
 * Insets are 0 unless the page sets `viewport-fit=cover` in its viewport meta tag.
 */
export function SafeArea({ className, topClassName, bottomClassName, children, ...props }: SafeAreaProps) {
  return (
    <div className={cn('hx:flex hx:flex-col', className)} {...props}>
      <div aria-hidden="true" className={cn('hx:h-[env(safe-area-inset-top)] hx:shrink-0', topClassName)} />
      <div className="hx:min-h-0 hx:flex-1 hx:pr-[env(safe-area-inset-right)] hx:pl-[env(safe-area-inset-left)]">
        {children}
      </div>
      <div aria-hidden="true" className={cn('hx:h-[env(safe-area-inset-bottom)] hx:shrink-0', bottomClassName)} />
    </div>
  );
}
