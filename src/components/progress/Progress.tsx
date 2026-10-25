import { Progress as BaseProgress } from '@base-ui/react/progress';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

const trackVariants = cva('hx:col-span-2 hx:overflow-hidden hx:rounded-full hx:bg-surface-pressed', {
  variants: {
    // A 2px bar by default, 4px when it is the main content.
    size: {
      md: 'hx:h-0.5',
      lg: 'hx:h-1',
    },
  },
  defaultVariants: { size: 'md' },
});

const indicatorVariants = cva(
  [
    'hx:h-full hx:rounded-full',
    'hx:transition-[width,background-color] hx:duration-500 hx:ease-out hx:motion-reduce:transition-none',
    'hx:data-indeterminate:w-1/3 hx:data-indeterminate:animate-[hx-progress-sweep_1.4s_ease-in-out_infinite]',
    'hx:motion-reduce:data-indeterminate:animate-[hx-progress-sweep_3s_ease-in-out_infinite]',
  ],
  {
    variants: {
      intent: {
        brand: 'hx:bg-accent',
        success: 'hx:bg-success-text',
        warning: 'hx:bg-warning-text',
        danger: 'hx:bg-danger-text',
      },
    },
    defaultVariants: { intent: 'brand' },
  },
);

export type ProgressProps = ComponentProps<typeof BaseProgress.Root> &
  VariantProps<typeof trackVariants> &
  VariantProps<typeof indicatorVariants> & {
    label?: ReactNode;
    /** Shows the percentage on the right of the label. */
    showValue?: boolean;
  };

/** `value` from 0 to 100 (`max` to change it); `null` for an unknown duration, with a sweeping bar. */
export function Progress({ className, label, showValue = false, size, intent, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root
      className={mergeClassName('hx:grid hx:w-full hx:grid-cols-[1fr_auto] hx:gap-x-3 hx:gap-y-1.5', className)}
      {...props}
    >
      {label != null && (
        <BaseProgress.Label className="hx:min-w-0 hx:truncate hx:text-sm hx:font-semibold hx:text-fg">
          {label}
        </BaseProgress.Label>
      )}
      {showValue && (
        <BaseProgress.Value
          className={cn(
            'hx:col-start-2 hx:text-sm hx:tabular-nums hx:text-fg-muted',
            label == null && 'hx:row-start-1',
          )}
        />
      )}
      <BaseProgress.Track className={trackVariants({ size })}>
        <BaseProgress.Indicator className={indicatorVariants({ intent })} />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
