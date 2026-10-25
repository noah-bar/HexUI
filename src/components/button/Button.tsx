import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { mergeClassName } from '../../lib/cn';
import { Spinner } from '../spinner/Spinner';

export const buttonVariants = cva(
  [
    'hx:inline-flex hx:shrink-0 hx:items-center hx:justify-center hx:gap-1.5 hx:whitespace-nowrap hx:select-none',
    // Every variant has a 1px border (transparent when unseen), so all sizes line up and
    // filled buttons keep a visible frame in Windows high contrast mode.
    'hx:rounded-xs hx:border hx:border-transparent hx:font-semibold hx:cursor-pointer',
    // The outline is either the ring (see `ring`) or invisible; on keyboard focus it becomes the 2px focus ring.
    'hx:outline-1 hx:outline-offset-2 hx:outline-transparent hx:focus-visible:outline-2 hx:focus-visible:outline-ring',
    'hx:transition-colors hx:duration-100',
    'hx:data-disabled:pointer-events-none hx:data-disabled:text-fg-disabled',
    'hx:[&_svg]:size-4 hx:[&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: [
          'hx:bg-primary hx:text-primary-fg hx:hover:bg-primary-hover hx:active:bg-primary-pressed',
          'hx:data-disabled:bg-surface-disabled',
        ],
        secondary: [
          'hx:bg-primary-subtle hx:text-primary-subtle-fg',
          'hx:hover:bg-primary-subtle-hover hx:active:bg-primary-subtle-pressed hx:data-popup-open:bg-primary-subtle-pressed',
          'hx:data-disabled:bg-surface-disabled',
        ],
        outline: [
          'hx:border-accent hx:text-accent',
          'hx:hover:bg-primary-subtle hx:active:bg-primary-subtle-hover hx:data-popup-open:bg-primary-subtle-hover',
          'hx:data-disabled:border-border',
        ],
        ghost: [
          'hx:font-normal hx:text-fg',
          'hx:hover:bg-surface-hover hx:active:bg-surface-pressed hx:data-popup-open:bg-surface-pressed',
        ],
        danger: [
          'hx:bg-danger hx:text-danger-fg hx:hover:bg-danger-hover hx:active:bg-danger-pressed',
          'hx:data-disabled:bg-surface-disabled',
        ],
        // For the dark AppHeader: white text, a light wash on hover and a white focus ring drawn inside.
        header: [
          'hx:font-normal hx:text-header-fg',
          'hx:hover:bg-header-hover hx:active:bg-header-pressed hx:data-popup-open:bg-header-pressed',
          'hx:focus-visible:outline-header-fg hx:focus-visible:-outline-offset-2',
          'hx:data-disabled:text-header-fg/50',
        ],
        'outline-danger': [
          'hx:border-danger-text hx:text-danger-text',
          'hx:hover:bg-danger-subtle hx:active:bg-danger-subtle-pressed hx:data-popup-open:bg-danger-subtle-pressed',
          'hx:data-disabled:border-border',
        ],
      },
      size: {
        sm: 'hx:h-6 hx:min-w-16 hx:px-2 hx:text-xs',
        md: 'hx:h-8 hx:min-w-20 hx:px-3 hx:text-sm',
        lg: 'hx:h-10 hx:min-w-24 hx:px-4 hx:text-base',
        icon: 'hx:size-8 hx:text-sm',
      },
      /**
       * A 1px ring 2px outside the button, in the color of the variant; the button itself turns square.
       * The ring is a ::before layer rather than the outline, so it keeps its rounded corners; on keyboard
       * focus it becomes the 2px focus ring.
       */
      ring: {
        true: [
          'hx:relative hx:rounded-none hx:focus-visible:outline-transparent',
          'hx:before:pointer-events-none hx:before:absolute hx:before:-inset-1 hx:before:rounded-xs hx:before:border',
          'hx:focus-visible:before:border-2 hx:focus-visible:before:border-ring hx:data-disabled:before:border-border',
        ],
        false: '',
      },
    },
    compoundVariants: [
      { ring: true, variant: ['primary', 'secondary', 'outline'], className: 'hx:before:border-accent' },
      // The pale fill of a secondary button blends with the page: an edge keeps the gap to the ring visible.
      { ring: true, variant: 'secondary', className: 'hx:border-primary-subtle-pressed' },
      { ring: true, variant: 'ghost', className: 'hx:before:border-border' },
      { ring: true, variant: 'danger', className: 'hx:before:border-danger' },
      { ring: true, variant: 'outline-danger', className: 'hx:before:border-danger-text' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      ring: false,
    },
  },
);

export type ButtonProps = ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants> & {
    /** Icon before the label (on the left in left-to-right languages). */
    startIcon?: ReactNode;
    /** Icon after the label, such as the chevron of a menu button. */
    endIcon?: ReactNode;
    /** A spinner in place of the start icon; the button is disabled until it is done (e.g. while saving). */
    loading?: boolean;
  };

export function Button({
  variant,
  size,
  ring,
  startIcon,
  endIcon,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={mergeClassName(buttonVariants({ variant, size, ring }), className)}
      disabled={disabled || loading}
      // Keeps focus on the button while it is busy, so keyboard users don't lose their place.
      focusableWhenDisabled={loading || undefined}
      aria-busy={loading || undefined}
      // Lets a ButtonGroup draw a divider between two filled buttons.
      data-variant={variant ?? 'primary'}
      {...props}
    >
      {loading ? <Spinner size="sm" tone="current" /> : startIcon}
      {children}
      {endIcon}
    </BaseButton>
  );
}
