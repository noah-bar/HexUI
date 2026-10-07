import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export const spinnerVariants = cva(
  // Keeps turning (slower) with reduced motion: a frozen spinner would read as a stuck page.
  'hx:inline-block hx:shrink-0 hx:animate-spin hx:motion-reduce:animate-[spin_1.5s_linear_infinite]',
  {
    variants: {
      size: {
        xs: 'hx:size-3',
        sm: 'hx:size-4',
        md: 'hx:size-5',
        lg: 'hx:size-8',
      },
      /** `current` follows the surrounding text color (inside a button, a badge…). */
      tone: {
        current: '',
        muted: 'hx:text-fg-muted',
        accent: 'hx:text-accent',
      },
    },
    defaultVariants: {
      size: 'sm',
      tone: 'current',
    },
  },
);

export type SpinnerProps = Omit<ComponentProps<'svg'>, 'children'> &
  VariantProps<typeof spinnerVariants> & {
    /**
     * Text announced to screen readers. Set it when the spinner is the only sign of loading;
     * leave it empty when a visible label says it already (e.g. "Enregistrement…").
     */
    label?: string;
  };

/** Loading indicator: a ring with a turning arc, in the current text color. */
export function Spinner({ size, tone, label, className, ...props }: SpinnerProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      role={label ? 'status' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn(spinnerVariants({ size, tone }), className)}
      {...props}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.75" />
      <path d="M8 1.75A6.25 6.25 0 0 1 14.25 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
