import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import {
  MenuCheckboxItem,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  menuPopupClassName,
} from '../menu/Menu';

/** The menu of a right click (or a long press on touch screens) on the `ContextMenuTrigger` area. */
export const ContextMenu = BaseContextMenu.Root;

export function ContextMenuTrigger({ className, ...props }: ComponentProps<typeof BaseContextMenu.Trigger>) {
  return <BaseContextMenu.Trigger className={mergeClassName('hx:select-none', className)} {...props} />;
}

export function ContextMenuContent({ className, children, ...props }: ComponentProps<typeof BaseContextMenu.Popup>) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className="hx:z-50 hx:outline-none">
        <BaseContextMenu.Popup className={mergeClassName(menuPopupClassName, className)} {...props}>
          <div className="hx:min-h-0 hx:overflow-y-auto hx:overscroll-contain hx:p-1">{children}</div>
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

// Same items as Menu, under ContextMenu names.
export const ContextMenuItem = MenuItem;
export const ContextMenuCheckboxItem = MenuCheckboxItem;
export const ContextMenuRadioGroup = MenuRadioGroup;
export const ContextMenuRadioItem = MenuRadioItem;
export const ContextMenuGroup = MenuGroup;
export const ContextMenuLabel = MenuGroupLabel;
export const ContextMenuSeparator = MenuSeparator;
export const ContextMenuShortcut = MenuShortcut;
export const ContextMenuSub = MenuSub;
export const ContextMenuSubTrigger = MenuSubTrigger;
export const ContextMenuSubContent = MenuSubContent;
