import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { CheckIcon, ChevronRightIcon } from '../../lib/icons';
import {
  groupLabelClassName,
  itemClassName as listItemClassName,
  popupSurfaceClassName,
  separatorClassName,
} from '../combobox/comboboxStyles';

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuGroup = BaseMenu.Group;
export const MenuRadioGroup = BaseMenu.RadioGroup;
export const MenuSub = BaseMenu.SubmenuRoot;

type PositionerProps = ComponentProps<typeof BaseMenu.Positioner>;

export type MenuContentProps = ComponentProps<typeof BaseMenu.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

// The popup does not scroll; an inner wrapper does, so the rounded edge and border stay put.
const popupClassName = `${popupSurfaceClassName} hx:flex hx:min-w-44 hx:max-h-(--available-height) hx:flex-col`;

export function MenuContent({
  className,
  children,
  side,
  sideOffset = 4,
  align = 'start',
  alignOffset,
  ...props
}: MenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        className="hx:z-50 hx:outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <BaseMenu.Popup className={mergeClassName(popupClassName, className)} {...props}>
          <div className="hx:min-h-0 hx:overflow-y-auto hx:overscroll-contain hx:p-1">{children}</div>
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function MenuSubContent({ side = 'inline-end', sideOffset = 2, alignOffset = -5, ...props }: MenuContentProps) {
  return <MenuContent side={side} sideOffset={sideOffset} alignOffset={alignOffset} {...props} />;
}

const itemClassName = `${listItemClassName} hx:w-full hx:[&_svg]:text-fg-muted`;

export type MenuItemProps = ComponentProps<typeof BaseMenu.Item> & {
  variant?: 'default' | 'danger';
};

export function MenuItem({ className, variant = 'default', ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={mergeClassName(
        cn(
          itemClassName,
          variant === 'danger' &&
            'hx:text-danger-text hx:[&_svg]:text-danger-text hx:data-highlighted:bg-danger-subtle',
        ),
        className,
      )}
      {...props}
    />
  );
}

export function MenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem className={mergeClassName(cn(itemClassName, 'hx:relative hx:pl-8'), className)} {...props}>
      <BaseMenu.CheckboxItemIndicator className="hx:absolute hx:left-2.5 hx:flex hx:[&_svg]:text-accent">
        <CheckIcon />
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export function MenuRadioItem({ className, children, ...props }: ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem className={mergeClassName(cn(itemClassName, 'hx:relative hx:pl-8'), className)} {...props}>
      <BaseMenu.RadioItemIndicator className="hx:absolute hx:left-3.5 hx:size-1.5 hx:rounded-full hx:bg-accent" />
      {children}
    </BaseMenu.RadioItem>
  );
}

export function MenuSubTrigger({ className, children, ...props }: ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      className={mergeClassName(cn(itemClassName, 'hx:data-popup-open:bg-surface-hover'), className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="hx:ml-auto" />
    </BaseMenu.SubmenuTrigger>
  );
}

export function MenuGroupLabel({ className, ...props }: ComponentProps<typeof BaseMenu.GroupLabel>) {
  return <BaseMenu.GroupLabel className={mergeClassName(groupLabelClassName, className)} {...props} />;
}

export function MenuSeparator({ className, ...props }: ComponentProps<typeof BaseMenu.Separator>) {
  return <BaseMenu.Separator className={mergeClassName(separatorClassName, className)} {...props} />;
}

export function MenuShortcut({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('hx:ml-auto hx:pl-4 hx:text-xs hx:text-fg-muted', className)} {...props} />;
}
