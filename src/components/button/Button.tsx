import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export const buttonVariants = cva(
  [
    'hx:inline-flex hx:shrink-0 hx:items-center hx:justify-center hx:gap-2 hx:whitespace-nowrap hx:select-none',
    'hx:rounded-lg hx:font-medium hx:cursor-pointer',
    'hx:transition-[background-color,box-shadow,color,scale] hx:duration-150 hx:ease-out',
    'hx:active:scale-[0.98] hx:focus-ring',
    'hx:data-disabled:pointer-events-none hx:data-disabled:opacity-50',
    'hx:[&_svg]:size-4 hx:[&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        primary: [
          'hx:bg-primary hx:text-primary-fg hx:hover:bg-primary-hover',
          'hx:shadow-[inset_0_1px_0_0_oklch(1_0_0/0.2),0_1px_2px_0_oklch(0_0_0/0.12)]',
        ],
        secondary: 'hx:glass hx:text-fg hx:hover:bg-glass-hover hx:active:bg-glass-active',
        ghost: 'hx:text-fg hx:hover:bg-glass-hover hx:active:bg-glass-active',
        danger: [
          'hx:bg-danger hx:text-danger-fg hx:hover:bg-danger-hover',
          'hx:shadow-[inset_0_1px_0_0_oklch(1_0_0/0.2),0_1px_2px_0_oklch(0_0_0/0.12)]',
        ],
      },
      size: {
        sm: 'hx:h-8 hx:px-3 hx:text-sm',
        md: 'hx:h-9 hx:px-4 hx:text-sm',
        lg: 'hx:h-11 hx:px-5 hx:text-base',
        icon: 'hx:size-9',
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
