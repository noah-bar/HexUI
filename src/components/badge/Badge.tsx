import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClassName } from '../../lib/cn';

export const badgeVariants = cva(
  [
    'hx:inline-flex hx:w-fit hx:shrink-0 hx:items-center hx:gap-1.5 hx:whitespace-nowrap hx:rounded-md hx:border',
    'hx:px-2 hx:py-0.5 hx:text-xs hx:font-medium hx:leading-4',
    'hx:[&_svg]:size-3.5 hx:[&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        neutral: 'hx:border-neutral/25 hx:bg-neutral/12 hx:text-neutral-text',
        info: 'hx:border-info/25 hx:bg-info/12 hx:text-info-text',
        success: 'hx:border-success/25 hx:bg-success/12 hx:text-success-text',
        warning: 'hx:border-warning/25 hx:bg-warning/12 hx:text-warning-text',
        danger: 'hx:border-danger/25 hx:bg-danger/12 hx:text-danger-text',
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
