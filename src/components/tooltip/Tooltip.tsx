import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export const TooltipProvider = BaseTooltip.Provider;
export const Tooltip = BaseTooltip.Root;
export const TooltipTrigger = BaseTooltip.Trigger;

type PositionerProps = ComponentProps<typeof BaseTooltip.Positioner>;

export type TooltipContentProps = ComponentProps<typeof BaseTooltip.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

export function TooltipContent({ className, side = 'top', sideOffset = 6, align, alignOffset, ...props }: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner className="hx:z-50" side={side} sideOffset={sideOffset} align={align} alignOffset={alignOffset}>
        <BaseTooltip.Popup
          className={mergeClassName(
            [
              'hx:glass-strong hx:max-w-xs hx:rounded-sm hx:px-2.5 hx:py-1.5 hx:text-xs hx:font-medium hx:text-fg',
              'hx:origin-(--transform-origin) hx:transition-[scale,opacity] hx:duration-150 hx:ease-out',
              'hx:data-starting-style:scale-95 hx:data-starting-style:opacity-0',
              'hx:data-ending-style:scale-95 hx:data-ending-style:opacity-0 hx:data-instant:transition-none',
            ].join(' '),
            className,
          )}
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
