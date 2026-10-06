import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export type SwitchProps = ComponentProps<typeof BaseSwitch.Root>;

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={mergeClassName(
        [
          'hx:glass-field hx:relative hx:inline-flex hx:h-5 hx:w-9 hx:shrink-0 hx:items-center hx:rounded-full hx:p-0.5 hx:cursor-pointer',
          'hx:transition-[background-color,border-color] hx:duration-200 hx:ease-out hx:focus-ring',
          'hx:data-checked:border-transparent hx:data-checked:bg-primary hx:data-checked:lit hx:[--hx-lit-glow:var(--hx-primary-glow)]',
          'hx:data-disabled:cursor-not-allowed hx:data-disabled:opacity-50',
        ].join(' '),
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={[
          'hx:block hx:size-3.5 hx:rounded-full hx:bg-white',
          'hx:shadow-[0_1px_2px_oklch(0_0_0/0.25),0_0_0_0.5px_oklch(0_0_0/0.08)]',
          'hx:transition-transform hx:duration-200 hx:ease-out hx:data-checked:translate-x-4',
        ].join(' ')}
      />
    </BaseSwitch.Root>
  );
}
