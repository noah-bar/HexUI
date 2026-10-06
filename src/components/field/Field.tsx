import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

/**
 * Groups a label, a control, a description and an error message.
 * Controls inside (Input, Textarea, Select, Checkbox…) get their ids, aria links
 * and invalid state wired automatically.
 */
export function Field({ className, ...props }: ComponentProps<typeof BaseField.Root>) {
  return <BaseField.Root className={mergeClassName('hx:flex hx:flex-col hx:gap-1.5', className)} {...props} />;
}

export function FieldLabel({ className, ...props }: ComponentProps<typeof BaseField.Label>) {
  return (
    <BaseField.Label
      className={mergeClassName('hx:text-sm hx:font-medium hx:text-fg hx:data-disabled:opacity-50', className)}
      {...props}
    />
  );
}

export function FieldDescription({ className, ...props }: ComponentProps<typeof BaseField.Description>) {
  return <BaseField.Description className={mergeClassName('hx:text-xs hx:text-fg-muted', className)} {...props} />;
}

/**
 * Shown when the field is invalid. Use `match` to target a specific validity state
 * (e.g. `match="valueMissing"`), or `match={true}` to always show it while invalid.
 */
export function FieldError({ className, ...props }: ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error className={mergeClassName('hx:text-xs hx:font-medium hx:text-danger-text', className)} {...props} />
  );
}

/** Wraps a single option (checkbox, radio) inside a Field that holds a group. */
export function FieldItem({ className, ...props }: ComponentProps<typeof BaseField.Item>) {
  return <BaseField.Item className={mergeClassName('hx:flex hx:items-center hx:gap-2', className)} {...props} />;
}
