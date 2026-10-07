import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuGroup = BaseMenu.Group;
export const MenuRadioGroup = BaseMenu.RadioGroup;
export const MenuSub = BaseMenu.SubmenuRoot;

type PositionerProps = ComponentProps<typeof BaseMenu.Positioner>;

export type MenuContentProps = ComponentProps<typeof BaseMenu.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

// The glass panel itself must not scroll: its lit edge overhangs the box by 1px and would
// add scrollable overflow. Scrolling happens in an inner wrapper instead (like SelectList).
const popupClassName = [
  'hx:glass-strong hx:flex hx:min-w-44 hx:max-h-(--available-height) hx:flex-col hx:rounded-lg',
  'hx:text-sm hx:text-fg hx:outline-none',
  'hx:origin-(--transform-origin) hx:transition-[scale,opacity] hx:duration-150 hx:ease-out',
  'hx:data-starting-style:scale-95 hx:data-starting-style:opacity-0',
  'hx:data-ending-style:scale-95 hx:data-ending-style:opacity-0',
].join(' ');

export function MenuContent({
  className,
  children,
  side,
  sideOffset = 6,
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

/** Submenu panel: opens beside its MenuSubTrigger. */
export function MenuSubContent({ side = 'inline-end', sideOffset = 2, alignOffset = -5, ...props }: MenuContentProps) {
  return <MenuContent side={side} sideOffset={sideOffset} alignOffset={alignOffset} {...props} />;
}

const itemClassName = [
  'hx:flex hx:w-full hx:items-center hx:gap-2 hx:rounded-md hx:py-1.5 hx:pr-2.5 hx:pl-2.5',
  'hx:cursor-default hx:outline-none hx:select-none',
  'hx:data-highlighted:bg-brand/12',
  'hx:data-disabled:pointer-events-none hx:data-disabled:opacity-50',
  'hx:[&_svg]:size-4 hx:[&_svg]:shrink-0 hx:[&_svg]:text-fg-muted',
].join(' ');

export type MenuItemProps = ComponentProps<typeof BaseMenu.Item> & {
  /** `danger` for destructive actions (delete, revoke…). */
  variant?: 'default' | 'danger';
};

export function MenuItem({ className, variant = 'default', ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={mergeClassName(
        cn(
          itemClassName,
          variant === 'danger' && 'hx:text-danger-text hx:[&_svg]:text-danger-text hx:data-highlighted:bg-danger/12',
        ),
        className,
      )}
      {...props}
    />
  );
}

export function MenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem className={mergeClassName(cn(itemClassName, 'hx:pl-8 hx:relative'), className)} {...props}>
      <BaseMenu.CheckboxItemIndicator className="hx:absolute hx:left-2.5 hx:flex hx:[&_svg]:text-accent">
        <CheckIcon />
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export function MenuRadioItem({ className, children, ...props }: ComponentProps<typeof BaseMenu.RadioItem>) {
  return (
    <BaseMenu.RadioItem className={mergeClassName(cn(itemClassName, 'hx:pl-8 hx:relative'), className)} {...props}>
      <BaseMenu.RadioItemIndicator className="hx:absolute hx:left-3.5 hx:size-1.5 hx:rounded-full hx:bg-accent" />
      {children}
    </BaseMenu.RadioItem>
  );
}

export function MenuSubTrigger({ className, children, ...props }: ComponentProps<typeof BaseMenu.SubmenuTrigger>) {
  return (
    <BaseMenu.SubmenuTrigger
      className={mergeClassName(cn(itemClassName, 'hx:data-popup-open:bg-brand/12'), className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="hx:ml-auto" />
    </BaseMenu.SubmenuTrigger>
  );
}

export function MenuGroupLabel({ className, ...props }: ComponentProps<typeof BaseMenu.GroupLabel>) {
  return (
    <BaseMenu.GroupLabel
      className={mergeClassName('hx:px-2.5 hx:pt-2 hx:pb-1 hx:text-xs hx:font-medium hx:text-fg-muted', className)}
      {...props}
    />
  );
}

export function MenuSeparator({ className, ...props }: ComponentProps<typeof BaseMenu.Separator>) {
  return (
    <BaseMenu.Separator
      className={mergeClassName('hx:mx-1 hx:my-1 hx:h-px hx:bg-glass-border', className)}
      {...props}
    />
  );
}

/** Keyboard shortcut hint, aligned to the right of a MenuItem. */
export function MenuShortcut({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span className={cn('hx:ml-auto hx:pl-4 hx:text-xs hx:tracking-wide hx:text-fg-muted', className)} {...props} />
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 4 4 4-4 4" />
    </svg>
  );
}
