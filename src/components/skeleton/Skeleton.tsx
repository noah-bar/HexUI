import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

/** Placeholder shape shown while content loads. Size it with `className` or `style`. */
export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      className={cn('hx:h-4 hx:rounded-sm hx:bg-tint-active hx:animate-pulse hx:motion-reduce:animate-none', className)}
      {...props}
    />
  );
}
