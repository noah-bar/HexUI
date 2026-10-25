import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export const buttonVariants = cva(
  [
    'hx:inline-flex hx:shrink-0 hx:items-center hx:justify-center hx:gap-1.5 hx:whitespace-nowrap hx:select-none',
    // Every variant has a 1px border (transparent when unseen), so all sizes line up and
    // filled buttons keep a visible frame in Windows high contrast mode.
    'hx:rounded-xs hx:border hx:border-transparent hx:font-semibold hx:cursor-pointer',
    'hx:transition-colors hx:duration-100 hx:focus-ring',
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
          'hx:border-border-strong hx:bg-surface hx:text-fg',
          'hx:hover:bg-surface-hover hx:active:bg-surface-pressed hx:data-popup-open:bg-surface-pressed',
          'hx:data-disabled:border-border hx:data-disabled:bg-surface-disabled',
        ],
        outline: [
          'hx:border-accent hx:text-accent',
          'hx:hover:bg-primary-subtle hx:active:bg-primary-subtle-pressed hx:data-popup-open:bg-primary-subtle-pressed',
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
      },
      size: {
        sm: 'hx:h-6 hx:min-w-16 hx:px-2 hx:text-xs',
        md: 'hx:h-8 hx:min-w-20 hx:px-3 hx:text-sm',
        lg: 'hx:h-10 hx:min-w-24 hx:px-4 hx:text-base',
        icon: 'hx:size-8 hx:text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonProps = ComponentProps<typeof BaseButton> & VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <BaseButton className={mergeClassName(buttonVariants({ variant, size }), className)} {...props} />;
}
