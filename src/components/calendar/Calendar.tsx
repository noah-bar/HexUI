import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import {
  addDays,
  addMonths,
  clampDate,
  dayOfWeek,
  formatDate,
  monthWeeks,
  startOfMonth,
  todayIso,
  type DateRange,
  type IsoDate,
} from '../../lib/date';
import { ChevronLeftIcon, ChevronRightIcon } from '../../lib/icons';
import { Button } from '../button/Button';

type CalendarBaseProps = {
  locale?: string;
  weekStartsOn?: number;
  min?: IsoDate;
  max?: IsoDate;
  isDateDisabled?: (date: IsoDate) => boolean;
  numberOfMonths?: 1 | 2;
  defaultMonth?: IsoDate;
  autoFocus?: boolean;
  previousMonthLabel?: string;
  nextMonthLabel?: string;
  className?: string;
};

export type CalendarSingleProps = CalendarBaseProps & {
  mode?: 'single';
  value?: IsoDate | null;
  defaultValue?: IsoDate | null;
  onValueChange?: (value: IsoDate) => void;
};

export type CalendarRangeProps = CalendarBaseProps & {
  mode: 'range';
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange) => void;
};

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

const emptyRange: DateRange = { start: null, end: null };

export function Calendar(props: CalendarProps) {
  const {
    locale,
    weekStartsOn = 1,
    min,
    max,
    isDateDisabled,
    numberOfMonths = 1,
    autoFocus = false,
    previousMonthLabel = 'Previous month',
    nextMonthLabel = 'Next month',
    className,
  } = props;
  const range = props.mode === 'range';

  const [uncontrolled, setUncontrolled] = useState<IsoDate | DateRange | null>(
    () => props.defaultValue ?? (range ? emptyRange : null),
  );
  const selected = props.value !== undefined ? props.value : uncontrolled;
  const selectedRange = range ? ((selected as DateRange | null) ?? emptyRange) : emptyRange;
  const selectedDay = range ? null : (selected as IsoDate | null);
  const anchor = (range ? selectedRange.start : selectedDay) ?? clampDate(todayIso(), min, max);

  const [month, setMonth] = useState(() => startOfMonth(props.defaultMonth ?? anchor));
  const [focused, setFocused] = useState(anchor);
  const [hovered, setHovered] = useState<IsoDate | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const id = useId();
  // Set when the keyboard moves the focused day, so the effect below moves the DOM focus too.
  const moveFocus = useRef(autoFocus);

  const today = todayIso();
  const months = Array.from({ length: numberOfMonths }, (_, index) => addMonths(month, index));
  const lastMonth = months[months.length - 1];
  const isVisible = (date: IsoDate) => date >= month && date < addMonths(lastMonth, 1);
  const isDisabled = (date: IsoDate) =>
    (min !== undefined && date < min) || (max !== undefined && date > max) || !!isDateDisabled?.(date);
  const tabbable = isVisible(focused) ? focused : month;

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    rootRef.current?.querySelector<HTMLButtonElement>(`[data-date="${tabbable}"]`)?.focus();
  }, [tabbable]);

  function focusDate(date: IsoDate) {
    const next = clampDate(date, min, max);
    moveFocus.current = true;
    setFocused(next);
    if (!isVisible(next))
      setMonth(next < month ? startOfMonth(next) : startOfMonth(addMonths(next, 1 - numberOfMonths)));
  }

  function select(date: IsoDate) {
    setFocused(date);
    if (props.mode === 'range') {
      const { start, end } = selectedRange;
      const next: DateRange =
        !start || end ? { start: date, end: null } : date < start ? { start: date, end: start } : { start, end: date };
      if (props.value === undefined) setUncontrolled(next);
      props.onValueChange?.(next);
    } else {
      if (props.value === undefined) setUncontrolled(date);
      props.onValueChange?.(date);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const date = (event.target as HTMLElement).dataset.date;
    if (!date) return;
    const weekStart = addDays(date, -((dayOfWeek(date) - weekStartsOn + 7) % 7));
    const moves: Record<string, () => IsoDate> = {
      ArrowLeft: () => addDays(date, -1),
      ArrowRight: () => addDays(date, 1),
      ArrowUp: () => addDays(date, -7),
      ArrowDown: () => addDays(date, 7),
      Home: () => weekStart,
      End: () => addDays(weekStart, 6),
      PageUp: () => addMonths(date, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(date, event.shiftKey ? 12 : 1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    focusDate(move());
  }

  const pendingEnd = range && selectedRange.start && !selectedRange.end ? (hovered ?? null) : null;
  const [rangeStart, rangeEnd] =
    pendingEnd && selectedRange.start
      ? [
          pendingEnd < selectedRange.start ? pendingEnd : selectedRange.start,
          pendingEnd < selectedRange.start ? selectedRange.start : pendingEnd,
        ]
      : [selectedRange.start, selectedRange.end ?? selectedRange.start];

  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const date = addDays('2026-10-25', (weekStartsOn + index) % 7);
    return {
      short: formatDate(date, locale, { weekday: 'short' }).replace('.', '').slice(0, 2),
      long: formatDate(date, locale, { weekday: 'long' }),
    };
  });

  const canGoBack = !min || startOfMonth(min) < month;
  const canGoForward = !max || startOfMonth(max) > lastMonth;

  return (
    <div
      ref={rootRef}
      onKeyDown={handleKeyDown}
      className={cn('hx:inline-flex hx:gap-6 hx:text-sm hx:text-fg', className)}
    >
      {months.map((monthStart, index) => {
        const titleId = `${id}-${monthStart}`;
        return (
          <div key={monthStart} role="group" aria-labelledby={titleId} className="hx:flex hx:flex-col hx:gap-2">
            <div className="hx:flex hx:h-8 hx:items-center hx:justify-between hx:gap-1">
              {index === 0 ? (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={previousMonthLabel}
                  disabled={!canGoBack}
                  onClick={() => setMonth(addMonths(month, -1))}
                >
                  <ChevronLeftIcon />
                </Button>
              ) : (
                <span className="hx:size-8" />
              )}
              <div
                id={titleId}
                aria-live="polite"
                className="hx:flex-1 hx:text-center hx:font-semibold hx:first-letter:uppercase"
              >
                {formatDate(monthStart, locale, { month: 'long', year: 'numeric' })}
              </div>
              {index === months.length - 1 ? (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={nextMonthLabel}
                  disabled={!canGoForward}
                  onClick={() => setMonth(addMonths(month, 1))}
                >
                  <ChevronRightIcon />
                </Button>
              ) : (
                <span className="hx:size-8" />
              )}
            </div>
            <table role="grid" aria-labelledby={titleId} className="hx:border-collapse">
              <thead>
                <tr>
                  {weekdays.map((weekday) => (
                    <th
                      key={weekday.long}
                      scope="col"
                      abbr={weekday.long}
                      className="hx:h-8 hx:w-8 hx:p-0 hx:text-xs hx:font-normal hx:text-fg-muted hx:first-letter:uppercase"
                    >
                      {weekday.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody onMouseLeave={() => setHovered(null)}>
                {monthWeeks(monthStart, weekStartsOn).map((week) => (
                  <tr key={week.find(Boolean)}>
                    {week.map((date, day) => {
                      if (!date) return <td key={day} className="hx:p-0" />;
                      const disabled = isDisabled(date);
                      const isSelected = range ? date === rangeStart || date === rangeEnd : date === selectedDay;
                      const inRange = !!rangeStart && !!rangeEnd && date > rangeStart && date < rangeEnd;
                      const isRange = range && !!rangeStart && !!rangeEnd && rangeStart !== rangeEnd;
                      return (
                        <td
                          key={date}
                          role="gridcell"
                          aria-selected={isSelected || inRange || undefined}
                          className={cn(
                            'hx:p-0',
                            inRange && 'hx:bg-primary-subtle',
                            isRange && date === rangeStart && 'hx:rounded-s-xs hx:bg-primary-subtle',
                            isRange && date === rangeEnd && 'hx:rounded-e-xs hx:bg-primary-subtle',
                          )}
                        >
                          <button
                            type="button"
                            data-date={date}
                            tabIndex={date === tabbable ? 0 : -1}
                            disabled={disabled}
                            aria-current={date === today ? 'date' : undefined}
                            aria-label={formatDate(date, locale, {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                            onClick={() => select(date)}
                            onMouseEnter={() => setHovered(date)}
                            onFocus={() => setFocused(date)}
                            className={cn(
                              'hx:relative hx:flex hx:size-8 hx:items-center hx:justify-center hx:rounded-xs hx:tabular-nums',
                              'hx:cursor-pointer hx:outline-none hx:transition-colors hx:duration-100',
                              'hx:focus-visible:outline-2 hx:focus-visible:-outline-offset-2 hx:focus-visible:outline-ring',
                              isSelected
                                ? 'hx:bg-primary hx:font-semibold hx:text-primary-fg hx:hover:bg-primary-hover'
                                : 'hx:hover:bg-surface-hover',
                              inRange && 'hx:hover:bg-primary-subtle-hover',
                              date === today &&
                                !isSelected &&
                                'hx:font-semibold hx:text-accent hx:after:absolute hx:after:bottom-1 hx:after:h-0.5 hx:after:w-3 hx:after:rounded-full hx:after:bg-current',
                              'hx:disabled:cursor-not-allowed hx:disabled:bg-transparent hx:disabled:text-fg-disabled',
                            )}
                          >
                            {Number(date.slice(8))}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
