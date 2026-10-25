import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClassName } from '../../lib/cn';

export const badgeVariants = cva(
  [
    'hx:inline-flex hx:w-fit hx:shrink-0 hx:items-center hx:gap-1 hx:whitespace-nowrap hx:rounded-xs hx:border',
    'hx:px-1.5 hx:py-0.5 hx:text-xs hx:font-semibold hx:leading-4',
    'hx:[&_svg]:size-3 hx:[&_svg]:shrink-0',
  ],
  {
    variants: {
      // Fluent "tint" badges: a pale fill and a soft edge in the status color, the text in the strong one.
      variant: {
        neutral: 'hx:border-border hx:bg-surface-hover hx:text-fg-muted',
        info: 'hx:border-info-text/30 hx:bg-info-text/10 hx:text-info-text',
        success: 'hx:border-success-text/30 hx:bg-success-text/10 hx:text-success-text',
        warning: 'hx:border-warning-text/30 hx:bg-warning-text/10 hx:text-warning-text',
        danger: 'hx:border-danger-text/30 hx:bg-danger-text/10 hx:text-danger-text',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
);

export type BadgeProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    dot?: boolean;
  };

export function Badge({ variant, dot, className, render, children, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: 'span',
    render,
    props: {
      ...props,
      className: mergeClassName(badgeVariants({ variant }), className),
      children: (
        <>
          {dot && <span aria-hidden="true" className="hx:size-1.5 hx:rounded-full hx:bg-current" />}
          {children}
        </>
      ),
    },
  });
}
