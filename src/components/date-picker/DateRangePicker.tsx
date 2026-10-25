import { Input as BaseInput } from '@base-ui/react/input';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cn } from '../../lib/cn';
import { formatShortDate, parseDate, type DateRange, type IsoDate } from '../../lib/date';
import { MOBILE_QUERY } from '../../lib/sheetPopup';
import { Calendar } from '../calendar/Calendar';
import {
  focusCalendarDay,
  PickerCalendarButton,
  PickerClearButton,
  pickerFrameClassName,
  pickerInputClassName,
  pickerPopupClassName,
} from './datePickerStyles';

export type DateRangePreset = { label: ReactNode; value: DateRange };

export type DateRangePickerProps = Omit<
  ComponentProps<typeof BaseInput>,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'onValueChange'
  | 'min'
  | 'max'
  | 'type'
  | 'className'
  | 'name'
  | 'placeholder'
> & {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange) => void;
  locale?: string;
  weekStartsOn?: number;
  min?: IsoDate;
  max?: IsoDate;
  isDateDisabled?: (date: IsoDate) => boolean;
  presets?: DateRangePreset[];
  clearable?: boolean;
  startName?: string;
  endName?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  startLabel?: string;
  endLabel?: string;
  openLabel?: string;
  clearLabel?: string;
  className?: string;
};

const emptyRange: DateRange = { start: null, end: null };

export function DateRangePicker({
  value: valueProp,
  defaultValue = emptyRange,
  onValueChange,
  locale,
  weekStartsOn,
  min,
  max,
  isDateDisabled,
  presets,
  clearable = false,
  startName,
  endName,
  startPlaceholder,
  endPlaceholder,
  startLabel = 'Start date',
  endLabel = 'End date',
  openLabel = 'Choose dates',
  clearLabel = 'Clear',
  disabled,
  readOnly,
  className,
  ...props
}: DateRangePickerProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = valueProp ?? uncontrolled;
  const [drafts, setDrafts] = useState<{ start?: string; end?: string }>({});
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<DateRange>(value);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const frameRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const isAllowed = (date: IsoDate) =>
    (min === undefined || date >= min) && (max === undefined || date <= max) && !isDateDisabled?.(date);

  function commit(next: DateRange) {
    const range = next.start && next.end && next.start > next.end ? { start: next.end, end: next.start } : next;
    setDrafts({});
    if (range.start === value.start && range.end === value.end) return;
    if (valueProp === undefined) setUncontrolled(range);
    onValueChange?.(range);
  }

  function commitDraft(end: 'start' | 'end') {
    const draft = drafts[end];
    if (draft === undefined) return;
    if (!draft.trim()) return commit({ ...value, [end]: null });
    const parsed = parseDate(draft, locale, value[end] ?? value.start ?? undefined);
    if (parsed && isAllowed(parsed)) commit({ ...value, [end]: parsed });
    else setDrafts((current) => ({ ...current, [end]: undefined }));
  }

  function openChange(next: boolean) {
    if (next) setPending(value);
    setOpen(next);
  }

  const locked = disabled || readOnly;
  const inputProps = (end: 'start' | 'end') => ({
    disabled,
    readOnly,
    autoComplete: 'off',
    value: drafts[end] ?? (value[end] ? formatShortDate(value[end], locale) : ''),
    onChange: (event: { target: { value: string } }) =>
      setDrafts((current) => ({ ...current, [end]: event.target.value })),
    onBlur: () => commitDraft(end),
    onKeyDown: (event: { key: string; altKey: boolean; preventDefault: () => void }) => {
      if (event.key === 'Enter') commitDraft(end);
      if (event.key === 'ArrowDown' && event.altKey && !readOnly) {
        event.preventDefault();
        openChange(true);
      }
    },
    className: pickerInputClassName,
  });

  return (
    <span ref={frameRef} data-disabled={disabled || undefined} className={cn(pickerFrameClassName, className)}>
      <BaseInput
        {...props}
        {...inputProps('start')}
        aria-label={props['aria-label'] ?? startLabel}
        placeholder={startPlaceholder}
      />
      <span aria-hidden="true" className="hx:shrink-0 hx:px-1 hx:text-fg-muted">
        –
      </span>
      <input {...inputProps('end')} aria-label={endLabel} placeholder={endPlaceholder} />
      {clearable && (value.start || value.end) && !locked && (
        <PickerClearButton aria-label={clearLabel} onClick={() => commit(emptyRange)} />
      )}
      <BasePopover.Root open={open} onOpenChange={openChange}>
        <BasePopover.Trigger disabled={locked} render={<PickerCalendarButton aria-label={openLabel} />} />
        <BasePopover.Portal>
          <BasePopover.Positioner className="hx:z-50" anchor={frameRef} align="start" sideOffset={4}>
            <BasePopover.Popup
              ref={popupRef}
              initialFocus={() => focusCalendarDay(popupRef.current)}
              className={cn(pickerPopupClassName, 'hx:flex hx:flex-col hx:gap-3 hx:md:flex-row')}
            >
              {presets && presets.length > 0 && (
                <ul
                  className={cn(
                    'hx:m-0 hx:flex hx:list-none hx:gap-1 hx:p-0',
                    'hx:max-md:flex-wrap hx:md:min-w-36 hx:md:flex-col hx:md:border-e hx:md:border-border hx:md:pe-3',
                  )}
                >
                  {presets.map((preset, index) => {
                    const active = preset.value.start === value.start && preset.value.end === value.end;
                    return (
                      <li key={index}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            commit(preset.value);
                            setOpen(false);
                          }}
                          className={cn(
                            'hx:flex hx:h-8 hx:w-full hx:items-center hx:rounded-xs hx:px-2.5 hx:text-left hx:whitespace-nowrap hx:cursor-pointer',
                            'hx:hover:bg-surface-hover hx:focus-ring hx:focus-visible:-outline-offset-2',
                            'hx:max-md:border hx:max-md:border-border',
                            active &&
                              'hx:bg-primary-subtle hx:font-semibold hx:text-primary-subtle-fg hx:hover:bg-primary-subtle-hover',
                          )}
                        >
                          {preset.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              <Calendar
                mode="range"
                value={pending}
                onValueChange={(range) => {
                  setPending(range);
                  if (range.start && range.end) {
                    commit(range);
                    setOpen(false);
                  }
                }}
                numberOfMonths={isMobile ? 1 : 2}
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
      {startName && <input type="hidden" name={startName} value={value.start ?? ''} disabled={disabled} />}
      {endName && <input type="hidden" name={endName} value={value.end ?? ''} disabled={disabled} />}
    </span>
  );
}
