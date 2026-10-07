import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { inputGroupClassName } from '../combobox/comboboxStyles';

export type InputNumberProps = Omit<ComponentProps<typeof BaseNumberField.Root>, 'className'> & {
  /** Shows − and + buttons around the value. Defaults to `true`. */
  showSteppers?: boolean;
  /** Text alignment of the value. Defaults to `left`, `center` with steppers. */
  align?: 'left' | 'center' | 'right';
  placeholder?: string;
  /** Accessible labels of the buttons. */
  decrementLabel?: string;
  incrementLabel?: string;
  /** Applied to the field wrapper. */
  className?: string;
};

/**
 * Numeric field: typing is checked, arrow keys and the buttons step the value (Shift for `largeStep`),
 * and `format` + `locale` display it (CHF, %, units). Use it inside a Field like Input.
 */
export function InputNumber({
  showSteppers = true,
  align,
  placeholder,
  decrementLabel = 'Diminuer',
  incrementLabel = 'Augmenter',
  className,
  ...props
}: InputNumberProps) {
  const textAlign = align ?? (showSteppers ? 'center' : 'left');
  const stepperClassName = [
    'hx:flex hx:h-full hx:w-8 hx:shrink-0 hx:items-center hx:justify-center hx:text-fg-muted hx:cursor-pointer hx:outline-none',
    'hx:transition-colors hx:duration-150 hx:hover:bg-tint-hover hx:hover:text-fg hx:active:bg-tint-active',
    'hx:focus-visible:bg-tint-hover hx:data-disabled:pointer-events-none hx:data-disabled:opacity-40 hx:[&_svg]:size-4',
  ].join(' ');

  return (
    <BaseNumberField.Root className="hx:w-full" {...props}>
      <BaseNumberField.Group className={cn(inputGroupClassName, 'hx:h-9 hx:min-w-0 hx:overflow-hidden', className)}>
        {showSteppers && (
          <BaseNumberField.Decrement aria-label={decrementLabel} className={cn(stepperClassName, 'hx:border-r hx:border-field-border')}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M3.5 8h9" />
            </svg>
          </BaseNumberField.Decrement>
        )}
        <BaseNumberField.Input
          placeholder={placeholder}
          className={cn(
            // w-0 + flex-1: no intrinsic 20-character width, so the field fits narrow grid columns.
            'hx:h-full hx:w-0 hx:min-w-0 hx:flex-1 hx:bg-transparent hx:px-3 hx:tabular-nums hx:outline-none hx:placeholder:text-fg-subtle',
            { left: 'hx:text-left', center: 'hx:text-center', right: 'hx:text-right' }[textAlign],
          )}
        />
        {showSteppers && (
          <BaseNumberField.Increment aria-label={incrementLabel} className={cn(stepperClassName, 'hx:border-l hx:border-field-border')}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <path d="M3.5 8h9M8 3.5v9" />
            </svg>
          </BaseNumberField.Increment>
        )}
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
