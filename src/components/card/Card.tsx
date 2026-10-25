import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { Panel, type PanelProps } from '../panel/Panel';

/** A `Panel` laid out as a card: a header (title, description, action), content and a footer. */
export function Card({ className, ...props }: PanelProps) {
  return <Panel className={cn('hx:flex hx:flex-col hx:gap-4 hx:p-4', className)} {...props} />;
}

/** Title and description; a `CardAction` inside sits on the right of the title. */
export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'hx:grid hx:grid-cols-[1fr_auto] hx:items-start hx:gap-x-3 hx:gap-y-1 hx:[&>:not([data-card-action])]:col-start-1',
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 className={cn('hx:m-0 hx:text-base hx:leading-snug hx:font-semibold hx:text-fg', className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('hx:m-0 hx:text-sm hx:text-fg-muted', className)} {...props} />;
}

/** A button or a menu in the top right corner of the card. */
export function CardAction({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-card-action=""
      className={cn('hx:col-start-2 hx:row-span-2 hx:row-start-1 hx:-my-1 hx:self-start', className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:text-sm', className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:items-center hx:gap-2', className)} {...props} />;
}
