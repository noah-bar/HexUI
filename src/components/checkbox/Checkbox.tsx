import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import { checkControlClassName } from '../field/fieldStyles';

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>;

/** Supports `indeterminate` for "select all" style checkboxes. */
export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={mergeClassName(
        [checkControlClassName, 'hx:rounded-sm hx:data-checked:glass-tint hx:data-indeterminate:glass-tint'].join(' '),
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="hx:flex hx:data-unchecked:hidden">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="hx:size-3.5"
        >
          <path className="hx:group-data-indeterminate:hidden" d="m3.5 8.5 3 3 6-7" />
          <path className="hx:hidden hx:group-data-indeterminate:block" d="M4 8h8" />
        </svg>
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
