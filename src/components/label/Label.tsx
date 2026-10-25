import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export type LabelProps = ComponentProps<'label'> & {
  /** Adds a red asterisk after the text. Also set `required` on the control, which is what browsers check. */
  required?: boolean;
};

/** A label outside a `Field`: wrapping a checkbox or a switch, or linked to a control with `htmlFor`. */
export function Label({ required = false, className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'hx:inline-flex hx:items-center hx:gap-2 hx:text-sm hx:text-fg hx:select-none',
        'hx:has-disabled:cursor-not-allowed hx:has-disabled:text-fg-disabled',
        'hx:has-data-disabled:cursor-not-allowed hx:has-data-disabled:text-fg-disabled',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="hx:-ms-1 hx:text-danger-text">
          *
        </span>
      )}
    </label>
  );
}
