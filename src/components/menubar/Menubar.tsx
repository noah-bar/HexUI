import { Menu as BaseMenu } from '@base-ui/react/menu';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import { cva, type VariantProps } from 'class-variance-authority';
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

export const menubarVariants = cva('hx:flex hx:w-fit hx:items-center hx:gap-0.5 hx:rounded-xs', {
  variants: {
    variant: {
      default: 'hx:h-10 hx:bg-surface hx:p-1 hx:shadow-card',
      ghost: 'hx:h-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type MenubarProps = ComponentProps<typeof BaseMenubar> & VariantProps<typeof menubarVariants>;

export function Menubar({ variant, className, ...props }: MenubarProps) {
  return <BaseMenubar className={mergeClassName(menubarVariants({ variant }), className)} {...props} />;
}

export function MenubarMenu(props: ComponentProps<typeof Menu>) {
  return <Menu {...props} />;
}

export function MenubarTrigger({ className, ...props }: ComponentProps<typeof BaseMenu.Trigger>) {
  return (
    <BaseMenu.Trigger
      className={mergeClassName(
        [
          'hx:flex hx:h-8 hx:items-center hx:rounded-xs hx:px-3 hx:cursor-pointer hx:select-none',
          'hx:text-sm hx:text-fg hx:outline-none',
          'hx:transition-colors hx:duration-100 hx:hover:bg-surface-hover hx:active:bg-surface-pressed hx:focus-ring',
          'hx:data-popup-open:bg-surface-pressed',
          'hx:data-disabled:pointer-events-none hx:data-disabled:text-fg-disabled',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

export function MenubarContent({ sideOffset = 4, align = 'start', alignOffset = 0, ...props }: MenuContentProps) {
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
