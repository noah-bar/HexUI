import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return (
    <label
      className={cn(
        'hx:inline-flex hx:items-center hx:gap-2 hx:text-sm hx:leading-none hx:font-medium hx:text-fg hx:select-none',
        'hx:has-disabled:cursor-not-allowed hx:has-disabled:opacity-50 hx:has-data-disabled:cursor-not-allowed hx:has-data-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}
