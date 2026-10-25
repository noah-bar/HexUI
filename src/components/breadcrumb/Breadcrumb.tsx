import { useRender } from '@base-ui/react/use-render';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { ChevronRightIcon } from '../../lib/icons';

export type BreadcrumbProps = ComponentProps<'nav'>;

export function Breadcrumb({ 'aria-label': ariaLabel = 'Breadcrumb', ...props }: BreadcrumbProps) {
  return <nav aria-label={ariaLabel} {...props} />;
}

export function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      className={cn('hx:flex hx:flex-wrap hx:items-center hx:gap-1 hx:text-sm hx:text-fg-muted', className)}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return <li className={cn('hx:inline-flex hx:min-w-0 hx:items-center', className)} {...props} />;
}

export type BreadcrumbLinkProps = useRender.ComponentProps<'a'>;

/** A previous level, as a blue link. `render` swaps the `<a>` for a router link, such as `<Link to="/clients" />`. */
export function BreadcrumbLink({ className, render, ...props }: BreadcrumbLinkProps) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: {
      ...props,
      className: mergeClassName(
        [
          'hx:inline-flex hx:items-center hx:gap-1 hx:truncate hx:rounded-xs hx:text-accent hx:no-underline',
          'hx:hover:underline hx:focus-ring hx:[&_svg]:size-4 hx:[&_svg]:shrink-0',
        ].join(' '),
        className,
      ),
    },
  });
}

/** The current level: plain gray text, not a link. */
export function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-current="page"
      className={cn(
        'hx:inline-flex hx:items-center hx:gap-1 hx:truncate hx:text-fg-muted hx:[&_svg]:size-4',
        className,
      )}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({ className, children, ...props }: ComponentProps<'li'>) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('hx:flex hx:text-fg-subtle hx:[&_svg]:size-3', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  );
}

/** Stands for collapsed levels; wrap it in a menu or popover trigger to reveal them. */
export function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span className={cn('hx:inline-flex hx:items-center', className)} {...props}>
      <span aria-hidden="true">…</span>
    </span>
  );
}
