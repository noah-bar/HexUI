import { Form as BaseForm } from '@base-ui/react/form';
import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

export type FormProps<Values extends Record<string, unknown> = Record<string, unknown>> = BaseForm.Props<Values>;

/**
 * A `<form>` that spaces its sections. `errors` shows server errors under the `Field` with the matching `name`;
 * `onFormSubmit` receives the values by name. The submit button can sit in a `PageHeaderActions` inside the form,
 * or anywhere on the page with `form="<id>"`.
 */
export function Form<Values extends Record<string, unknown> = Record<string, unknown>>({
  className,
  ...props
}: FormProps<Values>) {
  return <BaseForm<Values> className={mergeClassName('hx:flex hx:flex-col hx:gap-6', className)} {...props} />;
}

export type FormSectionProps = Omit<ComponentProps<'section'>, 'title'> & {
  /** Heading of the group of fields; it also names the section for screen readers. */
  title?: ReactNode;
  description?: ReactNode;
};

/** A group of fields under a heading. A line separates it from the section before. */
export function FormSection({ title, description, className, children, ...props }: FormSectionProps) {
  const titleId = useId();
  return (
    <section
      data-hx-form-section=""
      aria-labelledby={title ? titleId : undefined}
      className={cn(
        'hx:flex hx:flex-col hx:gap-5',
        'hx:[[data-hx-form-section]+&]:border-t hx:[[data-hx-form-section]+&]:border-border-medium hx:[[data-hx-form-section]+&]:pt-6',
        className,
      )}
      {...props}
    >
      {(title || description) && (
        <div className="hx:flex hx:flex-col hx:gap-1">
          {title && (
            <h2 id={titleId} className="hx:m-0 hx:text-base hx:leading-snug hx:font-semibold hx:text-fg">
              {title}
            </h2>
          )}
          {description && <p className="hx:m-0 hx:text-sm hx:text-fg-muted">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
