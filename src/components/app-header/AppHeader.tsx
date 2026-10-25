import { useRender } from '@base-ui/react/use-render';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

/**
 * The dark bar across the top of an application. With a sidebar, make it the first
 * child of `SidebarProvider` (so a `SidebarTrigger` can go in it): the sidebar and page headers then stick
 * below it. Use `Button variant="header"` for its buttons.
 */
export function AppHeader({ className, ...props }: ComponentProps<'header'>) {
  return (
    <header
      data-hx-app-header=""
      className={cn(
        'hx:sticky hx:top-0 hx:z-20 hx:flex hx:h-(--hx-header-height) hx:w-full hx:shrink-0 hx:items-stretch',
        'hx:bg-header hx:text-sm hx:text-header-fg',
        // Buttons fill the bar's height with square corners, like the bar itself.
        'hx:[&_button]:h-auto hx:[&_button]:rounded-none hx:[&_button]:min-w-12',
        className,
      )}
      {...props}
    />
  );
}

/** The product name and logo, usually a link to the home page: pass `href`, or `render` for a router Link. */
export function AppHeaderBrand({ className, render, ...props }: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: {
      ...props,
      className: cn(
        'hx:flex hx:items-center hx:gap-2 hx:px-3 hx:font-semibold hx:whitespace-nowrap hx:text-header-fg hx:no-underline',
        'hx:outline-hidden hx:transition-colors hx:duration-100 hx:hover:bg-header-hover hx:active:bg-header-pressed',
        'hx:focus-visible:outline-2 hx:focus-visible:outline-solid hx:focus-visible:-outline-offset-2 hx:focus-visible:outline-header-fg',
        'hx:[&_svg]:size-5 hx:[&_svg]:shrink-0',
        className,
      ),
    },
  });
}

/** Groups the buttons on the right of the bar: search, settings, account. */
export function AppHeaderActions({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:ms-auto hx:flex hx:items-stretch', className)} {...props} />;
}
