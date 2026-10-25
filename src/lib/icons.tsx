import type { ComponentProps } from 'react';
import { cn } from './cn';

// Internal icons for the components, drawn inline so apps need no icon library.

type IconProps = ComponentProps<'svg'>;

function Icon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('hx:size-4 hx:shrink-0', className)}
      {...props}
    />
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 6 4 4 4-4" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon strokeWidth="1.5" {...props}>
      <path d="m3.5 8.5 3 3 6-7" />
    </Icon>
  );
}

export function XIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 4.5 7 7M11.5 4.5l-7 7" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" />
    </Icon>
  );
}

export function SpinnerIcon({ className, ...props }: IconProps) {
  return (
    <Icon strokeWidth="1.5" className={cn('hx:animate-spin hx:text-accent', className)} {...props}>
      <circle cx="8" cy="8" r="6" className="hx:opacity-25" />
      <path d="M14 8a6 6 0 0 0-6-6" />
    </Icon>
  );
}
