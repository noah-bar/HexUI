import { useId, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type FormSectionProps = Omit<ComponentProps<'section'>, 'title'> & {
  /** Heading of the group of fields; it also names the section for screen readers. */
  title?: ReactNode;
  description?: ReactNode;
};

/**
 * A group of fields under a heading. A line separates it from the section before. Put the sections in a plain `<form>`
 * (or the one of your form library, such as react-hook-form) spaced with `flex flex-col gap-6`.
 */
export function FormSection({ title, description, className, children, ...props }: FormSectionProps) {
  const titleId = useId();
  return (
    <section
      data-hx-form-section=""
      aria-labelledby={title ? titleId : undefined}
      className={cn(
        'hx:flex hx:flex-col hx:gap-5',
        'hx:[[data-hx-form-section]+&]:border-t hx:[[data-hx-form-section]+&]:border-border hx:[[data-hx-form-section]+&]:pt-6',
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
