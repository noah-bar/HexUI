import type { ComponentProps } from 'react';
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
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
  MenuTrigger,
  type MenuContentProps,
  type MenuItemProps,
} from '../menu/Menu';

// shadcn/ui names for Menu: same parts, same look.

export function DropdownMenu(props: ComponentProps<typeof Menu>) {
  return <Menu {...props} />;
}

export function DropdownMenuTrigger(props: ComponentProps<typeof MenuTrigger>) {
  return <MenuTrigger {...props} />;
}

export function DropdownMenuContent(props: MenuContentProps) {
  return <MenuContent {...props} />;
}

export function DropdownMenuItem(props: MenuItemProps) {
  return <MenuItem {...props} />;
}

export function DropdownMenuCheckboxItem(props: ComponentProps<typeof MenuCheckboxItem>) {
  return <MenuCheckboxItem {...props} />;
}

export function DropdownMenuRadioGroup(props: ComponentProps<typeof MenuRadioGroup>) {
  return <MenuRadioGroup {...props} />;
}

export function DropdownMenuRadioItem(props: ComponentProps<typeof MenuRadioItem>) {
  return <MenuRadioItem {...props} />;
}

export function DropdownMenuGroup(props: ComponentProps<typeof MenuGroup>) {
  return <MenuGroup {...props} />;
}

export function DropdownMenuLabel(props: ComponentProps<typeof MenuGroupLabel>) {
  return <MenuGroupLabel {...props} />;
}

export function DropdownMenuSeparator(props: ComponentProps<typeof MenuSeparator>) {
  return <MenuSeparator {...props} />;
}

export function DropdownMenuShortcut(props: ComponentProps<typeof MenuShortcut>) {
  return <MenuShortcut {...props} />;
}

export function DropdownMenuSub(props: ComponentProps<typeof MenuSub>) {
  return <MenuSub {...props} />;
}

export function DropdownMenuSubTrigger(props: ComponentProps<typeof MenuSubTrigger>) {
  return <MenuSubTrigger {...props} />;
}

export function DropdownMenuSubContent(props: MenuContentProps) {
  return <MenuSubContent {...props} />;
}
