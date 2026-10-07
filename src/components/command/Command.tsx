import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps, ReactNode } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { groupLabelClassName, itemClassName, messageClassName, separatorClassName } from '../combobox/comboboxStyles';

export const CommandGroup = BaseAutocomplete.Group;
export const CommandCollection = BaseAutocomplete.Collection;

export type CommandProps = ComponentProps<typeof BaseAutocomplete.Root> & {
  /** Applied to the wrapper. */
  className?: string;
};

/**
 * Searchable list of actions (command palette, quick switcher). Pass the entries to `items`
 * (flat, or groups `{ value, items }`); typing filters them, Enter runs the highlighted one.
 * Always open and inline: put it in a CommandDialog, a Popover or a panel.
 */
export function Command({ className, children, ...props }: CommandProps) {
  return (
    <div className={cn('hx:flex hx:min-h-0 hx:w-full hx:flex-col hx:text-sm hx:text-fg', className)}>
      <BaseAutocomplete.Root open inline autoHighlight="always" keepHighlight {...props}>
        {children}
      </BaseAutocomplete.Root>
    </div>
  );
}

/** Search field at the top of a Command. */
export function CommandInput({
  className,
  ...props
}: Omit<ComponentProps<typeof BaseAutocomplete.Input>, 'className'> & { className?: string }) {
  return (
    <BaseAutocomplete.InputGroup
      className={cn(
        'hx:flex hx:shrink-0 hx:items-center hx:gap-2 hx:border-b hx:border-glass-border hx:px-3',
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        className="hx:size-4 hx:shrink-0 hx:text-fg-muted"
      >
        <circle cx="7" cy="7" r="4.5" />
        <path d="m10.5 10.5 3 3" />
      </svg>
      <BaseAutocomplete.Input
        className="hx:h-11 hx:min-w-0 hx:flex-1 hx:bg-transparent hx:outline-none hx:placeholder:text-fg-subtle"
        {...props}
      />
    </BaseAutocomplete.InputGroup>
  );
}

/** Scrollable list of results. Pass a function child to render each entry (or group) of `items`. */
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

/** Shown when nothing matches. Stays mounted so screen readers announce it. */
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

/** An action. Run it with `onClick` (also fired by Enter on the highlighted item). */
export function CommandItem({ className, ...props }: ComponentProps<typeof BaseAutocomplete.Item>) {
  return (
    <BaseAutocomplete.Item
      className={mergeClassName(
        cn(itemClassName, 'hx:cursor-pointer hx:[&_svg]:text-fg-muted hx:data-highlighted:[&_svg]:text-accent'),
        className,
      )}
      {...props}
    />
  );
}

export function CommandSeparator({ className, ...props }: ComponentProps<typeof BaseAutocomplete.Separator>) {
  return <BaseAutocomplete.Separator className={mergeClassName(separatorClassName, className)} {...props} />;
}

/** Keyboard shortcut hint at the right of a CommandItem. */
export function CommandShortcut({ className, ...props }: ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn('hx:ml-auto hx:pl-4 hx:font-sans hx:text-xs hx:tracking-wide hx:text-fg-muted', className)}
      {...props}
    />
  );
}

export type CommandDialogProps = ComponentProps<typeof BaseDialog.Root> & {
  /** Accessible title of the dialog (visually hidden). */
  title?: string;
  className?: string;
  children?: ReactNode;
};

/** Command palette in a dialog near the top of the screen. Open it from a button or a shortcut (e.g. ⌘K). */
export function CommandDialog({ title = 'Command palette', className, children, ...props }: CommandDialogProps) {
  return (
    <BaseDialog.Root {...props}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={cn(
            'hx:fixed hx:inset-0 hx:z-50 hx:min-h-dvh hx:bg-glass-overlay hx:backdrop-blur-[4px]',
            'hx:transition-opacity hx:duration-200 hx:data-starting-style:opacity-0 hx:data-ending-style:opacity-0',
            'hx:supports-[-webkit-touch-callout:none]:absolute',
          )}
        />
        <BaseDialog.Popup
          aria-label={title}
          className={cn(
            'hx:glass-dialog hx:fixed hx:top-[12vh] hx:left-1/2 hx:z-50 hx:-translate-x-1/2',
            'hx:flex hx:max-h-[min(32rem,80vh)] hx:w-xl hx:max-w-[calc(100vw-2rem)] hx:flex-col hx:rounded-xl hx:text-fg hx:outline-none',
            'hx:transition-[scale,opacity] hx:duration-200 hx:ease-out',
            'hx:data-starting-style:scale-95 hx:data-starting-style:opacity-0 hx:data-ending-style:scale-95 hx:data-ending-style:opacity-0',
            className,
          )}
        >
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
