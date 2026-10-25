import type { ComponentProps } from 'react';
import { cn } from './cn';

// Internal icons for the components, drawn inline so apps need no icon library. Same grid, stroke and shapes as
// Phosphor's "regular" weight (256 units, 16-unit stroke, round ends), so they sit well next to Phosphor icons.

type IconProps = ComponentProps<'svg'>;

function Icon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
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
      <path d="M208 96l-80 80-80-80" />
    </Icon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M160 208l-80-80 80-80" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M96 48l80 80-80 80" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M40 144l56 56L224 72" />
    </Icon>
  );
}

export function XIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M200 56L56 200M200 200L56 56" />
    </Icon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M40 128h176M128 40v176" />
    </Icon>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M40 128h176" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="112" cy="112" r="80" />
      <path d="M168.57 168.57L224 224" />
    </Icon>
  );
}

export function SpinnerIcon({ className, ...props }: IconProps) {
  return (
    <Icon className={cn('hx:animate-spin hx:text-accent', className)} {...props}>
      <circle cx="128" cy="128" r="96" className="hx:opacity-25" />
      <path d="M224 128a96 96 0 0 0-96-96" />
    </Icon>
  );
}

export function SuccessIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="128" cy="128" r="96" />
      <path d="M88 136l24 24 56-56" />
    </Icon>
  );
}

export function ErrorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="128" cy="128" r="96" />
      <path d="M160 96l-64 64M96 96l64 64" />
    </Icon>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M142.41 40.22l87.46 151.87C236 202.79 228.08 216 215.46 216H40.54C27.92 216 20 202.79 26.13 192.09l87.46-151.87c6.3-10.96 22.52-10.96 28.82 0z" />
      <path d="M128 104v40" />
      <circle cx="128" cy="180" r="12" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="128" cy="128" r="96" />
      <path d="M120 120a8 8 0 0 1 8 8v40a8 8 0 0 0 8 8" />
      <circle cx="124" cy="84" r="12" fill="currentColor" stroke="none" />
    </Icon>
  );
}
