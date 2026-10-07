import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { Spinner } from '../spinner/Spinner';
import {
  groupLabelClassName,
  inputGroupButtonClassName,
  inputGroupClassName,
  inputGroupInputClassName,
  itemClassName,
  listClassName,
  messageClassName,
  popupClassName,
  separatorClassName,
} from '../combobox/comboboxStyles';

export const Autocomplete = BaseAutocomplete.Root;
export const AutocompleteGroup = BaseAutocomplete.Group;
export const AutocompleteCollection = BaseAutocomplete.Collection;
export const useAutocompleteFilter = BaseAutocomplete.useFilter;

export type AutocompleteInputProps = Omit<ComponentProps<typeof BaseAutocomplete.Input>, 'className'> & {
  /** Shows a button that empties the field once it has text. Defaults to `true`. */
  clearable?: boolean;
  /** Accessible label of the clear button. */
  clearLabel?: string;
  /** Applied to the field wrapper. */
  className?: string;
};

/** Free text field that suggests completions as the user types. */
export function AutocompleteInput({
  className,
  clearable = true,
  clearLabel = 'Clear',
  ...props
}: AutocompleteInputProps) {
  return (
    <BaseAutocomplete.InputGroup className={cn(inputGroupClassName, 'hx:h-9 hx:pr-1', className)}>
      <BaseAutocomplete.Input className={cn(inputGroupInputClassName, 'hx:pl-3')} {...props} />
      {clearable && (
        <BaseAutocomplete.Clear aria-label={clearLabel} className={inputGroupButtonClassName}>
          <XIcon />
        </BaseAutocomplete.Clear>
      )}
    </BaseAutocomplete.InputGroup>
  );
}

type PositionerProps = ComponentProps<typeof BaseAutocomplete.Positioner>;

export type AutocompleteContentProps = ComponentProps<typeof BaseAutocomplete.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

/** Glass popup holding the suggestions. As wide as its field. */
export function AutocompleteContent({
  className,
  side,
  sideOffset = 6,
  align = 'start',
  alignOffset,
  ...props
}: AutocompleteContentProps) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className="hx:z-50 hx:outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <BaseAutocomplete.Popup className={mergeClassName(popupClassName, className)} {...props} />
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

/** Scrollable list of suggestions. Pass a function child to render each entry of the root's `items`. */
export function AutocompleteList({ className, ...props }: ComponentProps<typeof BaseAutocomplete.List>) {
  return <BaseAutocomplete.List className={mergeClassName(listClassName, className)} {...props} />;
}

export function AutocompleteItem({ className, ...props }: ComponentProps<typeof BaseAutocomplete.Item>) {
  return <BaseAutocomplete.Item className={mergeClassName(itemClassName, className)} {...props} />;
}

/** Message shown when no suggestion matches. Stays mounted so screen readers announce it. */
export function AutocompleteEmpty({ className, ...props }: ComponentProps<typeof BaseAutocomplete.Empty>) {
  return <BaseAutocomplete.Empty className={mergeClassName(messageClassName, className)} {...props} />;
}

export type AutocompleteStatusProps = ComponentProps<typeof BaseAutocomplete.Status> & {
  /** Shows a spinner before the message while suggestions load. */
  loading?: boolean;
};

/**
 * Loading or error message for suggestions fetched from an API. It stays mounted so screen
 * readers announce changes: pass `children` conditionally rather than rendering it conditionally.
 */
export function AutocompleteStatus({ className, loading = false, children, ...props }: AutocompleteStatusProps) {
  return (
    <BaseAutocomplete.Status className={mergeClassName(messageClassName, className)} {...props}>
      {children != null && children !== false && (
        <>
          {loading && <Spinner />}
          {children}
        </>
      )}
    </BaseAutocomplete.Status>
  );
}

export function AutocompleteGroupLabel({ className, ...props }: ComponentProps<typeof BaseAutocomplete.GroupLabel>) {
  return <BaseAutocomplete.GroupLabel className={mergeClassName(groupLabelClassName, className)} {...props} />;
}

export function AutocompleteSeparator({ className, ...props }: ComponentProps<typeof BaseAutocomplete.Separator>) {
  return <BaseAutocomplete.Separator className={mergeClassName(separatorClassName, className)} {...props} />;
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}
