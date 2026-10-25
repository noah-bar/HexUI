import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import { popupSurfaceClassName } from '../combobox/comboboxStyles';

export const TooltipProvider = BaseTooltip.Provider;
export const Tooltip = BaseTooltip.Root;
export const TooltipTrigger = BaseTooltip.Trigger;

type PositionerProps = ComponentProps<typeof BaseTooltip.Positioner>;

export type TooltipContentProps = ComponentProps<typeof BaseTooltip.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

export function TooltipContent({
  className,
  side = 'top',
  sideOffset = 4,
  align,
  alignOffset,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner
        className="hx:z-50"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <BaseTooltip.Popup
          className={mergeClassName(
            `${popupSurfaceClassName} hx:max-w-60 hx:px-2 hx:py-1 hx:text-xs hx:data-instant:transition-none`,
            className,
          )}
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
