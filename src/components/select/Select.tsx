import { Select as BaseSelect } from '@base-ui/react/select';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import { CheckIcon, ChevronDownIcon } from '../../lib/icons';
import {
  groupLabelClassName,
  itemClassName,
  popupSurfaceClassName,
  separatorClassName,
  triggerClassName,
} from '../combobox/comboboxStyles';

export const Select = BaseSelect.Root;
export const SelectGroup = BaseSelect.Group;

export function SelectTrigger({ className, children, ...props }: ComponentProps<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger className={mergeClassName(triggerClassName, className)} {...props}>
      {children}
      <BaseSelect.Icon className="hx:flex hx:text-fg-muted">
        <ChevronDownIcon />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  );
}

export function SelectValue({ className, ...props }: ComponentProps<typeof BaseSelect.Value>) {
  return (
    <BaseSelect.Value
      className={mergeClassName('hx:truncate hx:data-placeholder:text-fg-placeholder', className)}
      {...props}
    />
  );
}

type PositionerProps = ComponentProps<typeof BaseSelect.Positioner>;

export type SelectContentProps = ComponentProps<typeof BaseSelect.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset' | 'alignItemWithTrigger'>;

export function SelectContent({
  className,
  children,
  side,
  sideOffset = 4,
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
              popupSurfaceClassName,
              'hx:min-w-(--anchor-width) hx:p-1',
              'hx:data-[side=none]:data-starting-style:opacity-100 hx:data-[side=none]:data-starting-style:transition-none',
            ].join(' '),
            className,
          )}
          {...props}
        >
          <BaseSelect.List className="hx:max-h-(--available-height) hx:overflow-y-auto hx:scroll-py-1">
            {children}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export function SelectItem({ className, children, ...props }: ComponentProps<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item className={mergeClassName(itemClassName, className)} {...props}>
      <BaseSelect.ItemText className="hx:min-w-0 hx:flex-1 hx:truncate">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="hx:flex hx:text-accent">
        <CheckIcon />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}

export function SelectGroupLabel({ className, ...props }: ComponentProps<typeof BaseSelect.GroupLabel>) {
  return <BaseSelect.GroupLabel className={mergeClassName(groupLabelClassName, className)} {...props} />;
}

export function SelectSeparator({ className, ...props }: ComponentProps<typeof BaseSelect.Separator>) {
  return <BaseSelect.Separator className={mergeClassName(separatorClassName, className)} {...props} />;
}
