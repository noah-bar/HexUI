import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps, ReactNode } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { SearchIcon } from '../../lib/icons';
import { groupLabelClassName, itemClassName, messageClassName, separatorClassName } from '../combobox/comboboxStyles';
import { dialogBackdropClassName, dialogSurfaceClassName } from '../dialog/Dialog';

export const CommandGroup = BaseAutocomplete.Group;
export const CommandCollection = BaseAutocomplete.Collection;

export type CommandProps = ComponentProps<typeof BaseAutocomplete.Root> & {
  className?: string;
};

/** Always open and inline: put it in a CommandDialog, a Popover or a panel. */
export function Command({ className, children, ...props }: CommandProps) {
  return (
    <div className={cn('hx:flex hx:min-h-0 hx:w-full hx:flex-col hx:text-sm hx:text-fg', className)}>
      <BaseAutocomplete.Root open inline autoHighlight="always" keepHighlight {...props}>
        {children}
      </BaseAutocomplete.Root>
    </div>
  );
}

export function CommandInput({
  className,
  ...props
}: Omit<ComponentProps<typeof BaseAutocomplete.Input>, 'className'> & { className?: string }) {
  return (
    <BaseAutocomplete.InputGroup
      className={cn('hx:flex hx:shrink-0 hx:items-center hx:gap-2 hx:border-b hx:border-border hx:px-3', className)}
    >
      <SearchIcon className="hx:text-fg-muted" />
      <BaseAutocomplete.Input
        className="hx:h-11 hx:min-w-0 hx:flex-1 hx:bg-transparent hx:text-fg hx:outline-none hx:placeholder:text-fg-placeholder"
        {...props}
      />
    </BaseAutocomplete.InputGroup>
  );
}

export function CommandList({ className, ...props }: ComponentProps<typeof BaseAutocomplete.List>) {
  return (
    <BaseAutocomplete.List
      className={mergeClassName(
        'hx:max-h-80 hx:min-h-0 hx:overflow-y-auto hx:overscroll-contain hx:p-1 hx:scroll-py-1 hx:outline-none hx:data-empty:p-0',
        className,
      )}
      {...props}
    />
  );
}

export function CommandEmpty({ className, ...props }: ComponentProps<typeof BaseAutocomplete.Empty>) {
  return (
    <BaseAutocomplete.Empty
      className={mergeClassName(cn(messageClassName, 'hx:not-empty:py-8'), className)}
      {...props}
    />
  );
}

export function CommandGroupLabel({ className, ...props }: ComponentProps<typeof BaseAutocomplete.GroupLabel>) {
  return <BaseAutocomplete.GroupLabel className={mergeClassName(groupLabelClassName, className)} {...props} />;
}

/** Run it with `onClick`, also fired by Enter. */
export function CommandItem({ className, ...props }: ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item
      className={mergeClassName(cn(itemClassName, 'hx:cursor-pointer hx:[&_svg]:text-fg-muted'), className)}
      {...props}
    />
  );
}

export function CommandSeparator({ className, ...props }: ComponentProps<typeof BaseAutocomplete.Separator>) {
  return <BaseAutocomplete.Separator className={mergeClassName(separatorClassName, className)} {...props} />;
}

export function CommandShortcut({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn('hx:ml-auto hx:pl-4 hx:font-sans hx:text-xs hx:tracking-wide hx:text-fg-muted', className)}
      {...props}
    />
  );
}

export type CommandDialogProps = ComponentProps<typeof BaseDialog.Root> & {
  title?: string;
  className?: string;
  children?: ReactNode;
};

export function CommandDialog({ title = 'Command palette', className, children, ...props }: CommandDialogProps) {
  return (
    <BaseDialog.Root {...props}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={dialogBackdropClassName} />
        <BaseDialog.Popup
          aria-label={title}
          className={cn(
            // Near the top rather than centered, so the list grows downwards without moving the search field.
            'hx:fixed hx:top-[12vh] hx:left-1/2 hx:z-50 hx:-translate-x-1/2',
            'hx:flex hx:max-h-[min(32rem,80vh)] hx:w-xl hx:max-w-[calc(100vw-2rem)] hx:flex-col',
            dialogSurfaceClassName,
            className,
          )}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
