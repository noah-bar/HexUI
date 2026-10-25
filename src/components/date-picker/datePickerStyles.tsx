import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { CalendarIcon, XIcon } from '../../lib/icons';
import { popupSurfaceClassName } from '../combobox/comboboxStyles';
import { fieldControlClassName } from '../field/fieldStyles';

export const pickerFrameClassName = cn(
  fieldControlClassName,
  'hx:inline-flex hx:h-8 hx:w-full hx:min-w-0 hx:items-center hx:gap-0.5 hx:ps-2.5 hx:pe-0.5',
  'hx:has-data-popup-open:[--hx-field-line-size:100%]',
);

export const pickerInputClassName =
  'hx:h-full hx:min-w-0 hx:flex-1 hx:border-0 hx:bg-transparent hx:p-0 hx:text-inherit hx:tabular-nums hx:outline-none hx:placeholder:text-fg-placeholder hx:disabled:cursor-not-allowed hx:disabled:placeholder:text-fg-disabled';

export const pickerPopupClassName = cn(popupSurfaceClassName, 'hx:max-w-[calc(100vw-1rem)] hx:p-3');

const iconButtonClassName = cn(
  'hx:inline-flex hx:size-7 hx:shrink-0 hx:items-center hx:justify-center hx:rounded-xs hx:text-fg-muted hx:cursor-pointer',
  'hx:hover:bg-surface-pressed hx:hover:text-fg hx:data-popup-open:text-fg hx:focus-ring hx:focus-visible:-outline-offset-2',
  'hx:disabled:pointer-events-none hx:disabled:text-fg-disabled',
);

export function PickerClearButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button type="button" className={cn(iconButtonClassName, className)} {...props}>
      <XIcon className="hx:size-3.5" />
    </button>
  );
}

export function PickerCalendarButton({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button type="button" className={cn(iconButtonClassName, className)} {...props}>
      <CalendarIcon />
    </button>
  );
}

export function focusCalendarDay(popup: HTMLElement | null) {
  return popup?.querySelector<HTMLElement>('[data-date][tabindex="0"]') ?? true;
}
