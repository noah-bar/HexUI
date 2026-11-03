import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type EmptyStateProps = Omit<ComponentProps<'div'>, 'title'> & {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** A button that gets the user out of the empty state. */
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'hx:flex hx:flex-col hx:items-center hx:justify-center hx:gap-3 hx:px-4 hx:py-10 hx:text-center hx:whitespace-normal',
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="hx:flex hx:size-10 hx:items-center hx:justify-center hx:rounded-surface hx:bg-surface-hover hx:text-fg-muted hx:[&_svg]:size-5">
          {icon}
        </div>
      )}
      <div className="hx:flex hx:max-w-sm hx:flex-col hx:gap-1">
        <p className="hx:m-0 hx:text-sm hx:font-medium hx:text-fg">{title}</p>
        {description && <p className="hx:m-0 hx:text-sm hx:text-fg-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
