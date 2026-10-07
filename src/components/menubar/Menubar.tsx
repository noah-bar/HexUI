import { Menu as BaseMenu } from '@base-ui/react/menu';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
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
  type MenuContentProps,
  type MenuItemProps,
} from '../menu/Menu';

export function Menubar({ className, ...props }: ComponentProps<typeof BaseMenubar>) {
  return (
    <BaseMenubar
      className={mergeClassName(
        'hx:glass-thin hx:flex hx:h-10 hx:w-fit hx:items-center hx:gap-1 hx:rounded-lg hx:p-1',
        className,
      )}
      {...props}
    />
  );
}

export function MenubarMenu(props: ComponentProps<typeof Menu>) {
  return <Menu {...props} />;
}

export function MenubarTrigger({ className, ...props }: ComponentProps<typeof BaseMenu.Trigger>) {
  return (
    <BaseMenu.Trigger
      className={mergeClassName(
        [
          'hx:flex hx:h-8 hx:items-center hx:rounded-md hx:border hx:border-transparent hx:px-3 hx:cursor-pointer hx:select-none',
          'hx:text-sm hx:font-medium hx:text-fg hx:outline-none',
          'hx:transition-colors hx:duration-150 hx:hover:bg-tint-hover hx:focus-visible:ring-2 hx:focus-visible:ring-ring',
          'hx:data-popup-open:border-(--hx-nav-active-border) hx:data-popup-open:bg-(--hx-nav-active)',
          'hx:data-disabled:pointer-events-none hx:data-disabled:opacity-50',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

export function MenubarContent({ sideOffset = 8, align = 'start', alignOffset = -4, ...props }: MenuContentProps) {
  return <MenuContent sideOffset={sideOffset} align={align} alignOffset={alignOffset} {...props} />;
}

export function MenubarItem(props: MenuItemProps) {
  return <MenuItem {...props} />;
}

export function MenubarCheckboxItem(props: ComponentProps<typeof MenuCheckboxItem>) {
  return <MenuCheckboxItem {...props} />;
}

export function MenubarRadioGroup(props: ComponentProps<typeof MenuRadioGroup>) {
  return <MenuRadioGroup {...props} />;
}

export function MenubarRadioItem(props: ComponentProps<typeof MenuRadioItem>) {
  return <MenuRadioItem {...props} />;
}

export function MenubarGroup(props: ComponentProps<typeof MenuGroup>) {
  return <MenuGroup {...props} />;
}

export function MenubarLabel(props: ComponentProps<typeof MenuGroupLabel>) {
  return <MenuGroupLabel {...props} />;
}

export function MenubarSeparator(props: ComponentProps<typeof MenuSeparator>) {
  return <MenuSeparator {...props} />;
}

export function MenubarShortcut(props: ComponentProps<typeof MenuShortcut>) {
  return <MenuShortcut {...props} />;
}

export function MenubarSub(props: ComponentProps<typeof MenuSub>) {
  return <MenuSub {...props} />;
}

export function MenubarSubTrigger(props: ComponentProps<typeof MenuSubTrigger>) {
  return <MenuSubTrigger {...props} />;
}

export function MenubarSubContent(props: MenuContentProps) {
  return <MenuSubContent {...props} />;
}
