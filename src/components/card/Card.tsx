import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:glass hx:flex hx:flex-col hx:gap-5 hx:rounded-2xl hx:p-6 hx:text-fg', className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:flex-col hx:gap-1.5', className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<'h3'>) {
  return <h3 className={cn('hx:text-base hx:leading-tight hx:font-semibold', className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('hx:text-sm hx:text-fg-muted', className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:text-sm', className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:items-center hx:gap-2', className)} {...props} />;
}
