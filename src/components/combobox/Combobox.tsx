import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { CheckIcon, ChevronDownIcon, SearchIcon, SpinnerIcon, XIcon } from '../../lib/icons';
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
  triggerClassName,
} from './comboboxStyles';

export const Combobox = BaseCombobox.Root;
export const ComboboxValue = BaseCombobox.Value;
export const ComboboxGroup = BaseCombobox.Group;
export const ComboboxCollection = BaseCombobox.Collection;
export const useComboboxFilter = BaseCombobox.useFilter;
export const createComboboxItems = BaseCombobox.createItems;

type InputGroupButtonsProps = {
  clearable?: boolean;
  clearLabel?: string;
  triggerLabel?: string;
};

export type ComboboxInputProps = Omit<ComponentProps<typeof BaseCombobox.Input>, 'className'> &
  InputGroupButtonsProps & {
    className?: string;
  };

export function ComboboxInput({
  className,
  clearable = true,
  clearLabel = 'Clear',
  triggerLabel = 'Show options',
  ...props
}: ComboboxInputProps) {
  return (
    <BaseCombobox.InputGroup className={cn(inputGroupClassName, 'hx:h-8 hx:pr-1', className)}>
      <BaseCombobox.Input className={cn(inputGroupInputClassName, 'hx:pl-2.5')} {...props} />
      <InputGroupButtons clearable={clearable} clearLabel={clearLabel} triggerLabel={triggerLabel} />
    </BaseCombobox.InputGroup>
  );
}

export type ComboboxChipsProps<Item> = ComboboxInputProps & {
  /** Defaults to the item's `label` (or `value`) property. */
  chipLabel?: (item: Item) => string;
  removeLabel?: (label: string) => string;
};

export function ComboboxChips<Item>({
  className,
  placeholder,
  clearable = true,
  clearLabel = 'Clear all',
  triggerLabel = 'Show options',
  chipLabel = defaultLabel,
  removeLabel = (label) => `Remove ${label}`,
  ...props
}: ComboboxChipsProps<Item>) {
  return (
    <BaseCombobox.InputGroup className={cn(inputGroupClassName, 'hx:min-h-8 hx:py-0.5 hx:pr-1 hx:pl-0.5', className)}>
      <BaseCombobox.Value>
        {(value: Item[]) => (
          <BaseCombobox.Chips className="hx:flex hx:min-w-0 hx:flex-1 hx:flex-wrap hx:items-center hx:gap-1">
            {value.map((item, index) => {
              const label = chipLabel(item);
              return (
                <BaseCombobox.Chip
                  key={`${index}-${label}`}
                  className={[
                    'hx:inline-flex hx:h-6 hx:max-w-full hx:items-center hx:gap-0.5 hx:rounded-xs hx:pr-0.5 hx:pl-2',
                    'hx:border hx:border-border hx:bg-surface hx:text-xs hx:text-fg',
                    'hx:outline-none hx:cursor-default hx:focus-within:border-accent hx:data-highlighted:border-accent',
                  ].join(' ')}
                >
                  <span className="hx:truncate">{label}</span>
                  <BaseCombobox.ChipRemove
                    aria-label={removeLabel(label)}
                    className={[
                      'hx:flex hx:size-5 hx:shrink-0 hx:items-center hx:justify-center hx:rounded-xs hx:cursor-pointer',
                      'hx:text-fg-muted hx:hover:bg-fg/10 hx:hover:text-fg hx:[&_svg]:size-3',
                    ].join(' ')}
                  >
                    <XIcon />
                  </BaseCombobox.ChipRemove>
                </BaseCombobox.Chip>
              );
            })}
            <BaseCombobox.Input
              placeholder={value.length > 0 ? undefined : placeholder}
              className={cn(inputGroupInputClassName, 'hx:h-6 hx:min-w-16 hx:px-1.5')}
              {...props}
            />
          </BaseCombobox.Chips>
        )}
      </BaseCombobox.Value>
      <InputGroupButtons clearable={clearable} clearLabel={clearLabel} triggerLabel={triggerLabel} />
    </BaseCombobox.InputGroup>
  );
}

function InputGroupButtons({ clearable, clearLabel, triggerLabel }: InputGroupButtonsProps) {
  return (
    <div className="hx:flex hx:shrink-0 hx:items-center hx:self-center">
      {clearable && (
        <BaseCombobox.Clear aria-label={clearLabel} className={inputGroupButtonClassName}>
          <XIcon />
        </BaseCombobox.Clear>
      )}
      <BaseCombobox.Trigger aria-label={triggerLabel} className={inputGroupButtonClassName}>
        <ChevronDownIcon />
      </BaseCombobox.Trigger>
    </div>
  );
}

export function ComboboxTrigger({ className, children, ...props }: ComponentProps<typeof BaseCombobox.Trigger>) {
  return (
    <BaseCombobox.Trigger
      className={mergeClassName(`${triggerClassName} hx:data-placeholder:text-fg-placeholder`, className)}
      {...props}
    >
      <span className="hx:truncate">{children}</span>
      <BaseCombobox.Icon className="hx:flex hx:text-fg-muted">
        <ChevronDownIcon />
      </BaseCombobox.Icon>
    </BaseCombobox.Trigger>
  );
}

export function ComboboxSearch({
  className,
  ...props
}: Omit<ComponentProps<typeof BaseCombobox.Input>, 'className'> & { className?: string }) {
  return (
    <div
      className={cn('hx:flex hx:shrink-0 hx:items-center hx:gap-2 hx:border-b hx:border-border hx:px-2.5', className)}
    >
      <SearchIcon className="hx:text-fg-muted" />
      <BaseCombobox.Input className={cn(inputGroupInputClassName, 'hx:h-9')} {...props} />
    </div>
  );
}

type PositionerProps = ComponentProps<typeof BaseCombobox.Positioner>;

export type ComboboxContentProps = ComponentProps<typeof BaseCombobox.Popup> &
  Pick<PositionerProps, 'side' | 'sideOffset' | 'align' | 'alignOffset'>;

export function ComboboxContent({
  className,
  side,
  sideOffset = 4,
  align = 'start',
  alignOffset,
  ...props
}: ComboboxContentProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        className="hx:z-50 hx:outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
      >
        <BaseCombobox.Popup className={mergeClassName(popupClassName, className)} {...props} />
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export function ComboboxList({ className, ...props }: ComponentProps<typeof BaseCombobox.List>) {
  return <BaseCombobox.List className={mergeClassName(listClassName, className)} {...props} />;
}

export function ComboboxItem({ className, children, ...props }: ComponentProps<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item className={mergeClassName(itemClassName, className)} {...props}>
      <span className="hx:flex hx:min-w-0 hx:flex-1 hx:items-center hx:gap-2">{children}</span>
      <BaseCombobox.ItemIndicator className="hx:flex hx:text-accent">
        <CheckIcon />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

export function ComboboxEmpty({ className, ...props }: ComponentProps<typeof BaseCombobox.Empty>) {
  return <BaseCombobox.Empty className={mergeClassName(messageClassName, className)} {...props} />;
}

export type ComboboxStatusProps = ComponentProps<typeof BaseCombobox.Status> & {
  loading?: boolean;
};

/** Stays mounted so screen readers announce changes: pass `children` conditionally, not the component. */
export function ComboboxStatus({ className, loading = false, children, ...props }: ComboboxStatusProps) {
  return (
    <BaseCombobox.Status className={mergeClassName(messageClassName, className)} {...props}>
      {children != null && children !== false && (
        <>
          {loading && <SpinnerIcon />}
          {children}
        </>
      )}
    </BaseCombobox.Status>
  );
}

export function ComboboxGroupLabel({ className, ...props }: ComponentProps<typeof BaseCombobox.GroupLabel>) {
  return <BaseCombobox.GroupLabel className={mergeClassName(groupLabelClassName, className)} {...props} />;
}

export function ComboboxSeparator({ className, ...props }: ComponentProps<typeof BaseCombobox.Separator>) {
  return <BaseCombobox.Separator className={mergeClassName(separatorClassName, className)} {...props} />;
}

function defaultLabel(item: unknown): string {
  if (item && typeof item === 'object') {
    if ('label' in item && item.label != null) return String(item.label);
    if ('value' in item && item.value != null) return String(item.value);
  }
  return String(item ?? '');
}
