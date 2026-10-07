import { Progress as BaseProgress } from '@base-ui/react/progress';
import type { ComponentProps, ReactNode } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

export type ProgressProps = ComponentProps<typeof BaseProgress.Root> & {
  /** Text above the bar (e.g. "Export des factures"). Without it, give the bar an `aria-label`. */
  label?: ReactNode;
  /** Shows the formatted value (e.g. "45 %") at the right of the label. */
  showValue?: boolean;
};

/**
 * Progress of a task. `value={null}` for an unknown duration (animated bar).
 * The bar turns green once complete.
 */
export function Progress({ className, label, showValue = false, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root
      className={mergeClassName('hx:grid hx:w-full hx:grid-cols-[1fr_auto] hx:gap-x-3 hx:gap-y-1.5', className)}
      {...props}
    >
      {label != null && (
        <BaseProgress.Label className="hx:min-w-0 hx:truncate hx:text-sm hx:font-medium hx:text-fg">
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
      {/* Inset ring rather than a border: Base UI sizes the indicator with `height: inherit`, which would overflow a border. */}
      <BaseProgress.Track className="hx:col-span-2 hx:h-2 hx:overflow-hidden hx:rounded-full hx:bg-switch-track hx:shadow-[inset_0_0_0_1px_var(--hx-glass-border)]">
        <BaseProgress.Indicator
          className={[
            'hx:h-full hx:rounded-full hx:bg-accent',
            'hx:transition-[width,background-color] hx:duration-500 hx:ease-out hx:motion-reduce:transition-none',
            'hx:data-complete:bg-success',
            // Unknown duration: a third of the bar sweeps across the track.
            'hx:data-indeterminate:w-1/3 hx:data-indeterminate:animate-[hx-progress-sweep_1.4s_ease-in-out_infinite]',
            'hx:motion-reduce:data-indeterminate:animate-[hx-progress-sweep_3s_ease-in-out_infinite]',
          ].join(' ')}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
