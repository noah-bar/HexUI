import { Field as BaseField } from '@base-ui/react/field';
import { Children, type ComponentProps, type CSSProperties } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

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

const stackBelowClassNames = {
  sm: 'hx:@sm:grid-cols-(--hx-field-cols)',
  md: 'hx:@md:grid-cols-(--hx-field-cols)',
  lg: 'hx:@lg:grid-cols-(--hx-field-cols)',
  xl: 'hx:@xl:grid-cols-(--hx-field-cols)',
} as const;

export type FieldRowProps = ComponentProps<'div'> & {
  /**
   * Column widths once the row is wide enough: a count (`3`) for equal columns,
   * or a CSS grid template (`"1fr 3fr"`). Defaults to one equal column per child.
   */
  columns?: number | string;
  /**
   * Row width under which fields stack vertically: `sm` 24rem · `md` 28rem · `lg` 32rem (default) · `xl` 36rem.
   * Measured on the row itself (container query), so it also works in dialogs and side panels.
   */
  stackBelow?: keyof typeof stackBelowClassNames;
};

/** Lays out several Fields on one line, stacking them when the row gets too narrow. */
export function FieldRow({ columns, stackBelow = 'lg', className, style, children, ...props }: FieldRowProps) {
  const count = Children.toArray(children).length;
  const template =
    typeof columns === 'string' ? columns : `repeat(${columns ?? Math.max(count, 1)}, minmax(0, 1fr))`;

  return (
    <div className="hx:@container">
      <div
        className={cn(
          // items-start keeps labels and controls aligned when only one field shows a hint or an error.
          'hx:grid hx:grid-cols-1 hx:items-start hx:gap-x-4 hx:gap-y-5',
          stackBelowClassNames[stackBelow],
          className,
        )}
        style={{ '--hx-field-cols': template, ...style } as CSSProperties}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
