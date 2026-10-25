import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import { checkControlClassName } from '../field/fieldStyles';

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={mergeClassName(
        [
          checkControlClassName,
          'hx:rounded-xs hx:text-primary-fg',
          'hx:data-checked:border-primary hx:data-checked:bg-primary hx:data-checked:hover:border-primary-hover hx:data-checked:hover:bg-primary-hover',
          'hx:data-indeterminate:border-primary hx:data-indeterminate:bg-primary hx:data-indeterminate:hover:border-primary-hover hx:data-indeterminate:hover:bg-primary-hover',
          'hx:data-disabled:data-checked:border-fg-disabled hx:data-disabled:data-checked:bg-fg-disabled',
          'hx:data-disabled:data-indeterminate:border-fg-disabled hx:data-disabled:data-indeterminate:bg-fg-disabled',
        ].join(' '),
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="hx:flex hx:data-unchecked:hidden">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="hx:size-3"
        >
          <path className="hx:group-data-indeterminate:hidden" d="m3 8.5 3.25 3.25L13 4.75" />
          <path className="hx:hidden hx:group-data-indeterminate:block" d="M4 8h8" />
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
