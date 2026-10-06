import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export type SwitchProps = ComponentProps<typeof BaseSwitch.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={mergeClassName(
        [
          // 44×24 rail; the 1px border is always there so switching to glass-tint never shifts the thumb.
          'hx:group hx:relative hx:inline-flex hx:h-6 hx:w-11 hx:shrink-0 hx:items-center hx:rounded-full hx:p-px hx:cursor-pointer',
          'hx:border hx:border-glass-border hx:bg-switch-track hx:not-data-checked:hover:bg-switch-track-hover',
          'hx:transition-[background-color,border-color] hx:duration-200 hx:ease-out hx:focus-ring',
          'hx:data-checked:glass-tint',
          'hx:data-disabled:cursor-not-allowed hx:data-disabled:opacity-50',
        ].join(' '),
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={[
          'hx:glass-bead hx:block hx:h-5 hx:w-5 hx:rounded-full',
          'hx:transition-[translate,width] hx:duration-200 hx:ease-out hx:motion-reduce:transition-none',
          'hx:data-checked:translate-x-5',
          // Press feedback: the thumb stretches toward the center, keeping its outer edge in place.
          'hx:group-active:w-6 hx:data-checked:group-active:translate-x-4',
          'hx:group-data-disabled:w-5 hx:data-checked:group-data-disabled:translate-x-5',
        ].join(' ')}
      />
    </BaseSwitch.Root>
  );
}
