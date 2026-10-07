import { Popover as BasePopover } from '@base-ui/react/popover';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;

type PositionerProps = ComponentProps<typeof BasePopover.Positioner>;

export type PopoverContentProps = ComponentProps<typeof BasePopover.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

/** Floating glass panel anchored to its trigger. Free layout: filters, details, quick forms. */
export function PopoverContent({
  className,
  side,
  sideOffset = 8,
  align = 'center',
  alignOffset,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        className="hx:z-50"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <BasePopover.Popup
          className={mergeClassName(
            [
              'hx:glass-strong hx:flex hx:w-72 hx:max-w-[calc(100vw-2rem)] hx:flex-col hx:gap-3 hx:rounded-lg hx:p-4',
              'hx:text-sm hx:text-fg hx:outline-none',
              'hx:origin-(--transform-origin) hx:transition-[scale,opacity] hx:duration-150 hx:ease-out',
              'hx:data-starting-style:scale-95 hx:data-starting-style:opacity-0',
              'hx:data-ending-style:scale-95 hx:data-ending-style:opacity-0',
            ].join(' '),
            className,
          )}
          {...props}
        />
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

export function PopoverTitle({ className, ...props }: ComponentProps<typeof BasePopover.Title>) {
  return <BasePopover.Title className={mergeClassName('hx:text-sm hx:font-semibold', className)} {...props} />;
}

export function PopoverDescription({ className, ...props }: ComponentProps<typeof BasePopover.Description>) {
  return <BasePopover.Description className={mergeClassName('hx:text-sm hx:text-fg-muted', className)} {...props} />;
}
