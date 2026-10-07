import { Field as BaseField } from '@base-ui/react/field';
import { Children, type ComponentProps, type CSSProperties } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

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

export function FieldError({ className, ...props }: ComponentProps<typeof BaseField.Error>) {
  return (
    <BaseField.Error
      className={mergeClassName('hx:text-xs hx:font-medium hx:text-danger-text', className)}
      {...props}
    />
  );
}

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
  /** A column count (`3`) or a CSS grid template (`"1fr 3fr"`). */
  columns?: number | string;
  /** Row width under which fields stack: `sm` 24rem · `md` 28rem · `lg` 32rem · `xl` 36rem. Measured on the row (container query). */
  stackBelow?: keyof typeof stackBelowClassNames;
};

export function FieldRow({ columns, stackBelow = 'lg', className, style, children, ...props }: FieldRowProps) {
  const count = Children.toArray(children).length;
  const template = typeof columns === 'string' ? columns : `repeat(${columns ?? Math.max(count, 1)}, minmax(0, 1fr))`;

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
