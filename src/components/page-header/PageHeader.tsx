import { useRender } from '@base-ui/react/use-render';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { Separator } from '../separator/Separator';

export type PageHeaderProps = ComponentProps<'div'> & {
  /**
   * Keep the whole header (breadcrumb, title, command bar) at the top of the window while the page scrolls, below the
   * `AppHeader` if any. To cover the page's padding as well, pull it out with negative margins and pad it back.
   */
  sticky?: boolean;
};

/** The top of a page: a `Breadcrumb`, then `PageHeaderHeading`, then `PageHeaderActions`. */
export function PageHeader({ sticky = false, className, ...props }: PageHeaderProps) {
  return (
    <div
      className={cn(
        'hx:flex hx:flex-col hx:gap-3',
        sticky && 'hx:sticky hx:top-(--hx-header-offset,0px) hx:z-10 hx:bg-[var(--hx-page-bg,var(--hx-bg))]',
        className,
      )}
      {...props}
    />
  );
}

/** Groups the title and the description. */
export function PageHeaderHeading({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:min-w-0 hx:flex-col hx:gap-1', className)} {...props} />;
}

export function PageHeaderTitle({ className, render, ...props }: useRender.ComponentProps<'h1'>) {
  return useRender({
    defaultTagName: 'h1',
    render,
    props: {
      ...props,
      className: cn('hx:m-0 hx:text-2xl hx:leading-tight hx:font-semibold hx:text-fg hx:break-words', className),
    },
  });
}

export function PageHeaderDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('hx:m-0 hx:text-sm hx:text-fg-muted', className)} {...props} />;
}

export type PageHeaderActionsProps = ComponentProps<'div'> & {
  /** Keep the bar at the top of the window while the page scrolls (below the `AppHeader` if any). */
  sticky?: boolean;
};

/**
 * The command bar of the page, as in the Azure portal: a row of `ghost` buttons above a light line.
 * It can also be used on its own, outside a `PageHeader`.
 */
export function PageHeaderActions({ sticky = false, className, ...props }: PageHeaderActionsProps) {
  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        'hx:flex hx:min-w-0 hx:flex-wrap hx:items-center hx:gap-1 hx:border-b hx:border-border hx:pb-1.5',
        // Buttons size to their content, so an icon-only button stays square on narrow screens.
        'hx:[&_button]:min-w-0',
        // Sticky: the background of the page it sits on (white in an `inset` SidebarInset, see --hx-page-bg).
        sticky && 'hx:sticky hx:top-(--hx-header-offset,0px) hx:z-10 hx:bg-[var(--hx-page-bg,var(--hx-bg))] hx:pt-1.5',
        className,
      )}
      {...props}
    />
  );
}

/** A vertical line between groups of commands in `PageHeaderActions`. */
export function PageHeaderActionSeparator({ className, ...props }: ComponentProps<typeof Separator>) {
  return (
    <Separator
      orientation="vertical"
      className={typeof className === 'function' ? className : cn('hx:mx-1 hx:my-1.5 hx:bg-border-medium', className)}
      {...props}
    />
  );
}

/** The text of a command bar button: hidden on narrow screens, where only the icon stays (still read aloud). */
export function PageHeaderActionLabel({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('hx:sr-only hx:sm:not-sr-only', className)} {...props} />;
}
