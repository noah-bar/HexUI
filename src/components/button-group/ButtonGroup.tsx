import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export const buttonGroupVariants = cva(
  [
    'hx:inline-flex hx:w-fit hx:items-stretch',
    // A focused or hovered button comes forward, so its whole outline and border show over its neighbors.
    'hx:[&>*]:relative hx:[&>*:hover]:z-1 hx:[&>*:focus-visible]:z-2',
    // Filled buttons side by side: a thin line keeps them apart.
    'hx:[&>[data-variant=primary]+[data-variant=primary]]:border-s-primary-fg/30',
    'hx:[&>[data-variant=danger]+[data-variant=danger]]:border-s-danger-fg/30',
    'hx:[&>[data-variant=secondary]+[data-variant=secondary]]:border-s-primary-subtle-pressed',
  ],
  {
    variants: {
      orientation: {
        // Only the outer corners stay rounded; bordered buttons overlap by 1px so two borders read as one.
        horizontal: [
          'hx:flex-row',
          'hx:[&>*:not(:first-child)]:rounded-s-none hx:[&>*:not(:last-child)]:rounded-e-none',
          'hx:[&>*:not(:first-child)]:-ms-px',
        ],
        vertical: [
          'hx:flex-col',
          'hx:[&>*:not(:first-child)]:rounded-t-none hx:[&>*:not(:last-child)]:rounded-b-none',
          'hx:[&>*:not(:first-child)]:-mt-px',
        ],
      },
    },
    defaultVariants: { orientation: 'horizontal' },
  },
);

export type ButtonGroupProps = ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>;

/**
 * Buttons attached in a row (or a column): a split button, a set of related actions, a segmented choice.
 * Give it an `aria-label` that names the set.
 */
export function ButtonGroup({ orientation, className, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-orientation={orientation ?? 'horizontal'}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}
