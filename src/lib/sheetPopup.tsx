import type { ReactNode } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/** Below 768px: phones. Shared with the Sidebar, which turns into a drawer there. */
export const MOBILE_QUERY = '(max-width: 767px)';

/**
 * How a select, combobox or menu popup opens on mobile: `popup` (default) floats next to its trigger, as on larger
 * screens; `sheet` slides up from the bottom of the screen, full width, over a veil.
 */
export type PopupMobile = 'popup' | 'sheet';

export type SheetPopupProps = {
  mobile?: PopupMobile;
  /** Heading at the top of the sheet on mobile, such as the field's label. */
  sheetTitle?: ReactNode;
};

/** Whether the popup shows as a bottom sheet now. */
export function useSheetPopup(mobile: PopupMobile = 'popup') {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  return mobile === 'sheet' && isMobile;
}

export const sheetBackdropClassName = [
  'hx:fixed hx:inset-0 hx:z-50 hx:bg-overlay',
  'hx:transition-opacity hx:duration-300 hx:data-starting-style:opacity-0 hx:data-ending-style:opacity-0',
  'hx:motion-reduce:transition-none',
].join(' ');

// Floating UI writes the position inline (top, left, transform): !important pins it to the bottom of the screen.
export const sheetPositionerClassName =
  'hx:z-50 hx:outline-none hx:fixed! hx:inset-x-0! hx:top-auto! hx:bottom-0! hx:w-full! hx:transform-none!';

export const sheetPopupClassName = [
  // A white panel with the deepest shadow; a border draws the edge in dark.
  'hx:flex hx:max-h-[85dvh] hx:w-full hx:flex-col hx:overflow-hidden hx:rounded-t-xs hx:bg-surface hx:text-sm hx:text-fg',
  'hx:shadow-panel hx:outline-none hx:dark:border-t hx:dark:border-border hx:pb-[env(safe-area-inset-bottom)]',
  'hx:transition-transform hx:duration-300 hx:ease-[cubic-bezier(0.1,0.9,0.2,1)] hx:motion-reduce:transition-none',
  'hx:data-starting-style:translate-y-full hx:data-ending-style:translate-y-full',
  'hx:data-ending-style:duration-200 hx:data-ending-style:ease-[cubic-bezier(0.9,0.1,1,0.2)]',
  // Rows tall enough for a finger; 16px text in a search field, so iOS does not zoom on focus.
  'hx:[&_[role=option]]:min-h-11 hx:[&_[role^=menuitem]]:min-h-11 hx:[&_input]:text-base',
].join(' ');

export function SheetPopupTitle({ children }: { children: ReactNode }) {
  return (
    <div className="hx:shrink-0 hx:border-b hx:border-border hx:px-4 hx:py-3 hx:text-base hx:font-semibold">
      {children}
    </div>
  );
}
