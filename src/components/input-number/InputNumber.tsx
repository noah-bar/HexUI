import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { useState, type ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { inputGroupClassName } from '../combobox/comboboxStyles';

type BaseNumberFieldProps = ComponentProps<typeof BaseNumberField.Root>;
type ValueChangeDetails = Parameters<NonNullable<BaseNumberFieldProps['onValueChange']>>[1];
type ValueCommitDetails = Parameters<NonNullable<BaseNumberFieldProps['onValueCommitted']>>[1];

export type InputNumberProps = Omit<BaseNumberFieldProps, 'className' | 'required'> & {
  /** Number of digits after the decimal separator. Defaults to `0`. */
  decimalPlaces?: number;
  /** Makes the field required and restores an empty value to `0` on blur. */
  required?: boolean;
  /** Shows − and + buttons around the value. Defaults to `false`. */
  showSteppers?: boolean;
  /** Text alignment of the value. Defaults to `left`. */
  align?: 'left' | 'center' | 'right';
  placeholder?: string;
  /** Accessible labels of the buttons. */
  decrementLabel?: string;
  incrementLabel?: string;
  /** Applied to the field wrapper. */
  className?: string;
};

/**
 * Numeric field: typing is checked, arrow keys and the optional buttons step the value (Shift for `largeStep`),
 * and `format` + `locale` display it (CHF, %, units). Use it inside a Field like Input.
 */
export function InputNumber({
  decimalPlaces = 0,
  required = false,
  showSteppers = false,
  align = 'left',
  placeholder,
  decrementLabel = 'Decrease',
  incrementLabel = 'Increase',
  className,
  format,
  value: valueProp,
  defaultValue,
  onValueChange,
  onValueCommitted,
  ...props
}: InputNumberProps) {
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState<number | null>(
    () => defaultValue ?? (required ? 0 : null),
  );
  const value = isControlled ? valueProp : uncontrolledValue;
  const fractionDigits = Number.isFinite(decimalPlaces) ? Math.max(0, Math.trunc(decimalPlaces)) : 0;
  const stepperClassName = [
    'hx:flex hx:h-full hx:w-8 hx:shrink-0 hx:items-center hx:justify-center hx:text-fg-muted hx:cursor-pointer hx:outline-none',
    'hx:transition-colors hx:duration-150 hx:hover:bg-tint-hover hx:hover:text-fg hx:active:bg-tint-active',
    'hx:focus-visible:bg-tint-hover hx:data-disabled:pointer-events-none hx:data-disabled:opacity-40 hx:[&_svg]:size-4',
  ].join(' ');

  const handleValueChange = (nextValue: number | null, eventDetails: ValueChangeDetails) => {
    onValueChange?.(nextValue, eventDetails);
    if (!isControlled && !eventDetails.isCanceled) setUncontrolledValue(nextValue);
  };

  const handleValueCommitted = (nextValue: number | null, eventDetails: ValueCommitDetails) => {
    if (required && nextValue === null && eventDetails.reason === 'input-clear') {
      const changeDetails = createRequiredValueChangeDetails(eventDetails);
      onValueChange?.(0, changeDetails);
      if (!isControlled && !changeDetails.isCanceled) setUncontrolledValue(0);
      onValueCommitted?.(changeDetails.isCanceled ? null : 0, eventDetails);
      return;
    }
    onValueCommitted?.(nextValue, eventDetails);
  };

  return (
    <BaseNumberField.Root
      className="hx:w-full"
      format={{ ...format, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }}
      required={required}
      value={value}
      onValueChange={handleValueChange}
      onValueCommitted={handleValueCommitted}
      {...props}
    >
      <BaseNumberField.Group className={cn(inputGroupClassName, 'hx:h-9 hx:min-w-0 hx:overflow-hidden', className)}>
        {showSteppers && (
          <BaseNumberField.Decrement
            aria-label={decrementLabel}
            className={cn(stepperClassName, 'hx:border-r hx:border-field-border')}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3.5 8h9" />
            </svg>
          </BaseNumberField.Decrement>
        )}
        <BaseNumberField.Input
          placeholder={placeholder}
          className={cn(
            // w-0 + flex-1: no intrinsic 20-character width, so the field fits narrow grid columns.
            'hx:h-full hx:w-0 hx:min-w-0 hx:flex-1 hx:bg-transparent hx:px-3 hx:tabular-nums hx:outline-none hx:placeholder:text-fg-subtle',
            { left: 'hx:text-left', center: 'hx:text-center', right: 'hx:text-right' }[align],
          )}
        />
        {showSteppers && (
          <BaseNumberField.Increment
            aria-label={incrementLabel}
            className={cn(stepperClassName, 'hx:border-l hx:border-field-border')}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3.5 8h9M8 3.5v9" />
            </svg>
          </BaseNumberField.Increment>
        )}
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}

function createRequiredValueChangeDetails(eventDetails: ValueCommitDetails): ValueChangeDetails {
  let isCanceled = false;
  let isPropagationAllowed = false;
  const details: ValueChangeDetails = {
    reason: 'input-blur' as const,
    event: eventDetails.event as FocusEvent,
    trigger: undefined,
    get isCanceled() {
      return isCanceled;
    },
    get isPropagationAllowed() {
      return isPropagationAllowed;
    },
    cancel: () => {
      isCanceled = true;
    },
    allowPropagation: () => {
      isPropagationAllowed = true;
    },
  };

  return details;
}
