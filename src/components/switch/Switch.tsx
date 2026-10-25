import { Switch as BaseSwitch } from '@base-ui/react/switch';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export type SwitchProps = ComponentProps<typeof BaseSwitch.Root>;

/** Fluent: an outlined track with a gray thumb when off, a blue track with a white thumb when on. */
export function Switch({ className, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={mergeClassName(
        [
          // The 1px border is always there, so turning it blue never shifts the thumb.
          'hx:group hx:relative hx:inline-flex hx:h-5 hx:w-10 hx:shrink-0 hx:items-center hx:rounded-full hx:p-0.5 hx:cursor-pointer',
          'hx:border hx:border-fg-muted hx:bg-surface hx:hover:border-fg',
          'hx:transition-[background-color,border-color] hx:duration-100 hx:focus-ring',
          'hx:data-checked:border-primary hx:data-checked:bg-primary',
          'hx:data-checked:hover:border-primary-hover hx:data-checked:hover:bg-primary-hover',
          'hx:error:border-danger-text',
          'hx:data-disabled:cursor-not-allowed hx:data-disabled:border-fg-disabled hx:data-disabled:bg-surface-disabled',
        ].join(' '),
        className,
      )}
      {...props}
    >
      <BaseSwitch.Thumb
        className={[
          'hx:block hx:size-3.5 hx:rounded-full hx:bg-fg-muted hx:group-hover:bg-fg',
          'hx:transition-[translate,background-color] hx:duration-200 hx:ease-[cubic-bezier(0.1,0.9,0.2,1)] hx:motion-reduce:transition-none',
          'hx:data-checked:translate-x-5 hx:data-checked:bg-primary-fg hx:data-checked:group-hover:bg-primary-fg',
          'hx:group-data-disabled:bg-fg-disabled',
        ].join(' ')}
      />
    </BaseSwitch.Root>
  );
}
