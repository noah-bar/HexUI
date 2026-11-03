import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClassName } from '../../lib/cn';

export const badgeVariants = cva(
  [
    'hx:inline-flex hx:w-fit hx:shrink-0 hx:items-center hx:gap-1 hx:whitespace-nowrap hx:rounded-sm hx:border hx:border-transparent',
    'hx:px-1.5 hx:py-0.5 hx:text-xs hx:font-medium hx:leading-4',
    'hx:[&_svg]:size-3 hx:[&_svg]:shrink-0',
  ],
  {
    variants: {
      // Tinted badges: a pale fill and strong text, from the --hx-badge-* tokens. The transparent border shows in forced colors.
      variant: {
        neutral: 'hx:bg-(--hx-badge-neutral-bg) hx:text-(--hx-badge-neutral-fg)',
        brand: 'hx:bg-(--hx-badge-brand-bg) hx:text-(--hx-badge-brand-fg)',
        info: 'hx:bg-(--hx-badge-info-bg) hx:text-(--hx-badge-info-fg)',
        success: 'hx:bg-(--hx-badge-success-bg) hx:text-(--hx-badge-success-fg)',
        warning: 'hx:bg-(--hx-badge-warning-bg) hx:text-(--hx-badge-warning-fg)',
        danger: 'hx:bg-(--hx-badge-danger-bg) hx:text-(--hx-badge-danger-fg)',
        // A sixth color, for a state that is none of the above (such as a stage of a workflow).
        purple: 'hx:bg-(--hx-badge-purple-bg) hx:text-(--hx-badge-purple-fg)',
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
