import { Input as BaseInput } from '@base-ui/react/input';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { useRef, useState, type ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { formatShortDate, parseDate, type IsoDate } from '../../lib/date';
import { Calendar } from '../calendar/Calendar';
import {
  focusCalendarDay,
  PickerCalendarButton,
  PickerClearButton,
  pickerFrameClassName,
  pickerInputClassName,
  pickerPopupClassName,
} from './datePickerStyles';

export type DatePickerProps = Omit<
  ComponentProps<typeof BaseInput>,
  'value' | 'defaultValue' | 'onChange' | 'onValueChange' | 'min' | 'max' | 'type' | 'className'
> & {
  value?: IsoDate | null;
  defaultValue?: IsoDate | null;
  onValueChange?: (value: IsoDate | null) => void;
  locale?: string;
  weekStartsOn?: number;
  min?: IsoDate;
  max?: IsoDate;
  isDateDisabled?: (date: IsoDate) => boolean;
  clearable?: boolean;
  openLabel?: string;
  clearLabel?: string;
  className?: string;
};

export function DatePicker({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  locale,
  weekStartsOn,
  min,
  max,
  isDateDisabled,
  clearable = false,
  openLabel = 'Choose a date',
  clearLabel = 'Clear',
  name,
  disabled,
  readOnly,
  className,
  onBlur,
  onKeyDown,
  ...props
}: DatePickerProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = valueProp !== undefined ? valueProp : uncontrolled;
  const [draft, setDraft] = useState<string>();
  const [open, setOpen] = useState(false);
  const frameRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const isAllowed = (date: IsoDate) =>
    (min === undefined || date >= min) && (max === undefined || date <= max) && !isDateDisabled?.(date);

  function commit(next: IsoDate | null) {
    setDraft(undefined);
    if (next === value) return;
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
  }

  function commitDraft() {
    if (draft === undefined) return;
    if (!draft.trim()) return commit(null);
    const parsed = parseDate(draft, locale, value ?? undefined);
    if (parsed && isAllowed(parsed)) commit(parsed);
    else setDraft(undefined);
  }

  function handleKeyDown(event: Parameters<NonNullable<DatePickerProps['onKeyDown']>>[0]) {
    onKeyDown?.(event);
    if (event.key === 'Enter') commitDraft();
    if (event.key === 'ArrowDown' && event.altKey && !readOnly) {
      event.preventDefault();
      setOpen(true);
    }
  }

  const locked = disabled || readOnly;

  return (
    <span ref={frameRef} data-disabled={disabled || undefined} className={cn(pickerFrameClassName, className)}>
      <BaseInput
        {...props}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete="off"
        value={draft ?? (value ? formatShortDate(value, locale) : '')}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => {
          onBlur?.(event);
          commitDraft();
        }}
        onKeyDown={handleKeyDown}
        className={pickerInputClassName}
      />
      {clearable && value && !locked && <PickerClearButton aria-label={clearLabel} onClick={() => commit(null)} />}
      <BasePopover.Root open={open} onOpenChange={setOpen}>
        <BasePopover.Trigger disabled={locked} render={<PickerCalendarButton aria-label={openLabel} />} />
        <BasePopover.Portal>
          <BasePopover.Positioner className="hx:z-50" anchor={frameRef} align="start" sideOffset={4}>
            <BasePopover.Popup
              ref={popupRef}
              initialFocus={() => focusCalendarDay(popupRef.current)}
              className={pickerPopupClassName}
            >
              <Calendar
                value={value}
                onValueChange={(date) => {
                  commit(date);
                  setOpen(false);
                }}
                locale={locale}
                weekStartsOn={weekStartsOn}
                min={min}
                max={max}
                isDateDisabled={isDateDisabled}
              />
            </BasePopover.Popup>
          </BasePopover.Positioner>
        </BasePopover.Portal>
      </BasePopover.Root>
      {name && <input type="hidden" name={name} value={value ?? ''} disabled={disabled} />}
    </span>
  );
}
