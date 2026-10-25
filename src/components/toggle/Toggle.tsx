import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import { buttonGroupVariants } from '../button-group/ButtonGroup';

export const toggleVariants = cva(
  [
    'hx:inline-flex hx:shrink-0 hx:items-center hx:justify-center hx:gap-1.5 hx:rounded-xs hx:border hx:whitespace-nowrap',
    'hx:text-sm hx:text-fg hx:cursor-pointer hx:select-none hx:focus-ring',
    'hx:transition-colors hx:duration-100',
    // Pressed: the brand wash of a secondary button, with a blue edge.
    'hx:data-pressed:border-accent hx:data-pressed:bg-primary-subtle hx:data-pressed:text-primary-subtle-fg',
    'hx:data-pressed:hover:bg-primary-subtle-hover hx:data-pressed:active:bg-primary-subtle-pressed',
    'hx:data-disabled:pointer-events-none hx:data-disabled:text-fg-disabled',
    'hx:[&_svg]:size-4 hx:[&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        outline: 'hx:border-border-strong hx:bg-surface hx:hover:bg-surface-hover hx:active:bg-surface-pressed',
        subtle: 'hx:border-transparent hx:hover:bg-surface-hover hx:active:bg-surface-pressed',
      },
      size: {
        sm: 'hx:h-6 hx:min-w-6 hx:px-2 hx:text-xs',
        md: 'hx:h-8 hx:min-w-8 hx:px-2.5',
        lg: 'hx:h-10 hx:min-w-10 hx:px-3 hx:text-base',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  },
);

export type ToggleProps = ComponentProps<typeof BaseToggle> & VariantProps<typeof toggleVariants>;

/** A button that stays pressed: `pressed`, `defaultPressed`, `onPressedChange`. */
export function Toggle({ variant, size, className, ...props }: ToggleProps) {
  return <BaseToggle className={mergeClassName(toggleVariants({ variant, size }), className)} {...props} />;
}

export type ToggleGroupProps = ComponentProps<typeof BaseToggleGroup>;

/**
 * Toggles attached in a row, like a `ButtonGroup`: one choice among several (`value`, `onValueChange`), or several
 * with `multiple`. Arrow keys move between them.
 */
export function ToggleGroup({ orientation = 'horizontal', className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      orientation={orientation}
      className={mergeClassName(
        // The pressed toggle comes forward, so its blue edge shows on both sides.
        `${buttonGroupVariants({ orientation })} hx:[&>[data-pressed]]:z-1`,
        className,
      )}
      {...props}
    />
  );
}
