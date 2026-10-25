import { Popover as BasePopover } from '@base-ui/react/popover';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import { popupSurfaceClassName } from '../combobox/comboboxStyles';

export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;

type PositionerProps = ComponentProps<typeof BasePopover.Positioner>;

export type PopoverContentProps = ComponentProps<typeof BasePopover.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

export function PopoverContent({
  className,
  side,
  sideOffset = 4,
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
            `${popupSurfaceClassName} hx:flex hx:w-72 hx:max-w-[calc(100vw-2rem)] hx:flex-col hx:gap-3 hx:p-4`,
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
