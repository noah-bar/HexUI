import { Select as BaseSelect } from '@base-ui/react/select';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

export const Select = BaseSelect.Root;
export const SelectGroup = BaseSelect.Group;

export function SelectTrigger({ className, children, ...props }: ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger
      className={mergeClassName(
        [
          'hx:glass-field hx:flex hx:h-9 hx:w-full hx:min-w-40 hx:items-center hx:justify-between hx:gap-2',
          'hx:rounded-md hx:pr-2 hx:pl-3 hx:text-sm hx:text-fg hx:cursor-pointer hx:select-none',
          'hx:transition-[border-color,box-shadow] hx:duration-150 hx:hover:border-fg-subtle/40',
          'hx:outline-none hx:focus-visible:border-accent hx:focus-visible:ring-3 hx:focus-visible:ring-ring',
          'hx:data-popup-open:border-accent',
          'hx:error:border-danger hx:error:ring-3 hx:error:ring-danger/15',
          'hx:error:focus-visible:border-danger hx:error:focus-visible:ring-danger/30',
          'hx:data-disabled:cursor-not-allowed hx:data-disabled:opacity-50',
        ].join(' '),
        className,
      )}
      {...props}
    >
      {children}
      <BaseSelect.Icon className="hx:flex hx:text-fg-muted">
        <ChevronUpDownIcon />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export function SelectValue({ className, ...props }: ComponentProps<typeof BaseSelect.Value>) {
  return <BaseSelect.Value className={mergeClassName('hx:truncate hx:data-placeholder:text-fg-subtle', className)} {...props} />;
}

type PositionerProps = ComponentProps<typeof BaseSelect.Positioner>;

export type SelectContentProps = ComponentProps<typeof BaseSelect.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset' | 'alignItemWithTrigger'>;

export function SelectContent({
  className,
  children,
  side,
  sideOffset = 6,
  align,
  alignOffset,
  alignItemWithTrigger = false,
  ...props
}: SelectContentProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        className="hx:z-50 hx:outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <BaseSelect.Popup
          className={mergeClassName(
            [
              'hx:glass-strong hx:min-w-(--anchor-width) hx:rounded-lg hx:p-1 hx:text-sm hx:text-fg hx:outline-none',
              'hx:origin-(--transform-origin) hx:transition-[scale,opacity] hx:duration-150 hx:ease-out',
              'hx:data-starting-style:scale-95 hx:data-starting-style:opacity-0',
              'hx:data-ending-style:scale-95 hx:data-ending-style:opacity-0',
              'hx:data-[side=none]:data-starting-style:scale-100 hx:data-[side=none]:data-starting-style:opacity-100',
              'hx:data-[side=none]:data-starting-style:transition-none',
            ].join(' '),
            className,
          )}
          {...props}
        >
          <BaseSelect.List className="hx:max-h-(--available-height) hx:overflow-y-auto hx:scroll-py-1">{children}</BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export function SelectItem({ className, children, ...props }: ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item
      className={mergeClassName(
        [
          'hx:grid hx:grid-cols-[1fr_1rem] hx:items-center hx:gap-2 hx:rounded-md hx:py-1.5 hx:pr-2 hx:pl-2.5',
          'hx:cursor-default hx:outline-none hx:select-none',
          'hx:data-highlighted:bg-brand/12 hx:data-highlighted:text-fg',
          'hx:data-disabled:pointer-events-none hx:data-disabled:opacity-50',
        ].join(' '),
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemText className="hx:truncate">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="hx:flex hx:text-accent">
        <CheckIcon />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

export function SelectGroupLabel({ className, ...props }: ComponentProps<typeof BaseSelect.GroupLabel>) {
  return (
    <BaseSelect.GroupLabel
      className={mergeClassName('hx:px-2.5 hx:pt-2 hx:pb-1 hx:text-xs hx:font-medium hx:text-fg-muted', className)}
      {...props}
    />
  );
}

export function SelectSeparator({ className, ...props }: ComponentProps<typeof BaseSelect.Separator>) {
  return <BaseSelect.Separator className={mergeClassName('hx:mx-1 hx:my-1 hx:h-px hx:bg-glass-border', className)} {...props} />;
}

function ChevronUpDownIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('hx:size-4', className)}
      {...props}
    >
      <path d="m5 6 3-3 3 3M5 10l3 3 3-3" />
    </svg>
  );
}

function CheckIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('hx:size-4', className)}
      {...props}
    >
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}
