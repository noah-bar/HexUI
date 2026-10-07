import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export const toggleVariants = cva(
  [
    'hx:inline-flex hx:shrink-0 hx:items-center hx:justify-center hx:gap-2 hx:rounded-md hx:border hx:whitespace-nowrap',
    'hx:text-sm hx:font-medium hx:text-fg hx:cursor-pointer hx:select-none hx:focus-ring',
    'hx:transition-[background-color,border-color,color] hx:duration-150 hx:ease-out',
    'hx:hover:bg-tint-hover hx:active:bg-tint-active',
    'hx:data-pressed:border-(--hx-nav-active-border) hx:data-pressed:bg-(--hx-nav-active) hx:data-pressed:[&_svg]:text-accent',
    'hx:data-pressed:shadow-[inset_0_1px_0_0_var(--hx-glass-highlight),var(--hx-glass-shadow)]',
    'hx:data-disabled:pointer-events-none hx:data-disabled:opacity-50',
    'hx:[&_svg]:size-4 hx:[&_svg]:shrink-0 hx:[&_svg]:text-fg-muted',
  ],
  {
    variants: {
      variant: {
        default: 'hx:border-transparent',
        outline: 'hx:border-field-border hx:hover:border-field-border-hover',
      },
      size: {
        sm: 'hx:h-8 hx:min-w-8 hx:px-2',
        md: 'hx:h-9 hx:min-w-9 hx:px-2.5',
        lg: 'hx:h-10 hx:min-w-10 hx:px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export type ToggleProps = ComponentProps<typeof BaseToggle> & VariantProps<typeof toggleVariants>;

export function Toggle({ variant, size, className, ...props }: ToggleProps) {
  return <BaseToggle className={mergeClassName(toggleVariants({ variant, size }), className)} {...props} />;
}

export function ToggleGroup({ className, ...props }: ComponentProps<typeof BaseToggleGroup>) {
  return (
    <BaseToggleGroup
      className={mergeClassName(
        'hx:glass-thin hx:inline-flex hx:w-fit hx:items-center hx:gap-1 hx:rounded-lg hx:p-1 hx:data-[orientation=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  );
}
