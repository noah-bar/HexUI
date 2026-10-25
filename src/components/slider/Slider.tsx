import { Slider as BaseSlider } from '@base-ui/react/slider';
import type { ComponentProps, ReactNode } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

export type SliderProps = ComponentProps<typeof BaseSlider.Root> & {
  label?: ReactNode;
  /** Shows the value (or the range) on the right of the label. */
  showValue?: boolean;
  /** Names of the thumbs for screen readers, for a range: `['Minimum', 'Maximum']`. */
  thumbLabels?: string[];
};

/** One value, or a range with an array (`defaultValue={[20, 80]}`). */
export function Slider({
  className,
  value,
  defaultValue,
  label,
  showValue = false,
  thumbLabels,
  orientation = 'horizontal',
  ...props
}: SliderProps) {
  const current = value ?? defaultValue;
  const count = Array.isArray(current) ? current.length : 1;
  const vertical = orientation === 'vertical';

  return (
    <BaseSlider.Root
      value={value}
      defaultValue={defaultValue}
      orientation={orientation}
      className={mergeClassName(
        cn(
          'hx:group hx:flex hx:flex-col hx:gap-2 hx:data-disabled:cursor-not-allowed',
          vertical ? 'hx:h-40 hx:w-fit hx:items-center' : 'hx:w-full',
        ),
        className,
      )}
      {...props}
    >
      {(label != null || showValue) && (
        <div className="hx:flex hx:items-baseline hx:justify-between hx:gap-3">
          {label != null && (
            <BaseSlider.Label className="hx:text-sm hx:font-semibold hx:text-fg hx:group-data-disabled:text-fg-disabled">
              {label}
            </BaseSlider.Label>
          )}
          {showValue && (
            <BaseSlider.Value className="hx:ml-auto hx:text-sm hx:tabular-nums hx:text-fg-muted">
              {(formatted) => formatted.join(' – ')}
            </BaseSlider.Value>
          )}
        </div>
      )}
      <BaseSlider.Control
        className={cn(
          'hx:flex hx:touch-none hx:items-center hx:select-none hx:cursor-pointer hx:data-disabled:cursor-not-allowed',
          vertical ? 'hx:min-h-0 hx:w-5 hx:flex-1 hx:flex-col hx:justify-center' : 'hx:h-5 hx:w-full',
        )}
      >
        {/* A gray rail, the filled part in blue. */}
        <BaseSlider.Track
          className={cn(
            'hx:relative hx:rounded-full hx:bg-fg-subtle hx:group-data-disabled:bg-surface-pressed',
            vertical ? 'hx:h-full hx:w-1' : 'hx:h-1 hx:w-full',
          )}
        >
          <BaseSlider.Indicator className="hx:rounded-full hx:bg-accent hx:group-data-disabled:bg-fg-disabled" />
          {Array.from({ length: count }, (_, index) => (
            <BaseSlider.Thumb
              key={index}
              index={count > 1 ? index : undefined}
              aria-label={thumbLabels?.[index]}
              className={[
                // Thumb: a blue dot in a white ring, outlined in gray.
                'hx:size-5 hx:rounded-full hx:bg-accent hx:outline-hidden',
                'hx:shadow-[inset_0_0_0_4px_var(--hx-surface),0_0_0_1px_var(--hx-border-strong)]',
                'hx:transition-[box-shadow] hx:duration-100 hx:motion-reduce:transition-none',
                // The blue dot grows on hover and while dragging.
                'hx:hover:shadow-[inset_0_0_0_3px_var(--hx-surface),0_0_0_1px_var(--hx-border-strong)]',
                'hx:data-dragging:shadow-[inset_0_0_0_3px_var(--hx-surface),0_0_0_1px_var(--hx-border-strong)]',
                'hx:has-[:focus-visible]:outline-2 hx:has-[:focus-visible]:outline-solid hx:has-[:focus-visible]:outline-offset-2 hx:has-[:focus-visible]:outline-ring',
                'hx:data-disabled:bg-fg-disabled',
              ].join(' ')}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
