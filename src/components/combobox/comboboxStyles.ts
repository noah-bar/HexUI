import { fieldControlClassName } from '../field/fieldStyles';

/** Frame around an input and its buttons; the `field` utility follows the input inside. */
export const inputGroupClassName = `${fieldControlClassName} hx:flex hx:w-full hx:min-w-40 hx:items-center`;

export const inputGroupInputClassName =
  'hx:h-full hx:min-w-0 hx:flex-1 hx:bg-transparent hx:text-inherit hx:outline-none hx:placeholder:text-fg-placeholder hx:disabled:cursor-not-allowed hx:disabled:placeholder:text-fg-disabled';

export const inputGroupButtonClassName = [
  'hx:flex hx:size-6 hx:shrink-0 hx:items-center hx:justify-center hx:rounded-xs hx:cursor-pointer hx:text-fg-muted',
  'hx:transition-colors hx:duration-100 hx:hover:bg-fg/10 hx:hover:text-fg hx:active:bg-fg/20',
  'hx:outline-none hx:focus-visible:outline-2 hx:focus-visible:outline-ring',
  'hx:data-disabled:pointer-events-none hx:data-disabled:text-fg-disabled',
].join(' ');

/** Trigger button of a select, or of a combobox that searches inside its popup. */
export const triggerClassName = [
  fieldControlClassName,
  'hx:flex hx:h-8 hx:w-full hx:min-w-40 hx:items-center hx:justify-between hx:gap-2 hx:pr-2 hx:pl-2.5',
  'hx:cursor-pointer hx:select-none hx:text-left',
].join(' ');

// Light: the shadow is the edge. Dark: shadows barely show, so a border draws it.
export const popupSurfaceClassName = [
  'hx:rounded-xs hx:border hx:border-transparent hx:bg-surface hx:text-sm hx:text-fg hx:shadow-popup hx:outline-none',
  'hx:dark:border-border',
  'hx:transition-opacity hx:duration-100 hx:data-starting-style:opacity-0 hx:data-ending-style:opacity-0',
].join(' ');

// The popup does not scroll; the list inside does (listClassName), so a search field stays in place.
export const popupClassName = [
  popupSurfaceClassName,
  'hx:flex hx:w-(--anchor-width) hx:min-w-56 hx:max-w-(--available-width) hx:flex-col',
  'hx:max-h-[min(var(--available-height),24rem)]',
].join(' ');

export const listClassName =
  'hx:min-h-0 hx:overflow-y-auto hx:overscroll-contain hx:p-1 hx:scroll-py-1 hx:outline-none hx:data-empty:p-0';

export const itemClassName = [
  'hx:flex hx:min-h-8 hx:items-center hx:gap-2 hx:rounded-xs hx:py-1.5 hx:pr-2 hx:pl-2.5',
  'hx:cursor-default hx:outline-none hx:select-none',
  'hx:data-highlighted:bg-surface-hover',
  'hx:data-disabled:pointer-events-none hx:data-disabled:text-fg-disabled',
  'hx:[&_svg]:size-4 hx:[&_svg]:shrink-0',
].join(' ');

export const groupLabelClassName = 'hx:px-2.5 hx:pt-2 hx:pb-1 hx:text-xs hx:font-semibold hx:text-fg-muted';

export const separatorClassName = 'hx:-mx-1 hx:my-1 hx:h-px hx:bg-border';

// Empty and Status stay mounted (live regions): they only take room once they have content.
export const messageClassName =
  'hx:flex hx:items-center hx:justify-center hx:gap-2 hx:text-center hx:text-sm hx:text-fg-muted hx:not-empty:px-3 hx:not-empty:py-5';
