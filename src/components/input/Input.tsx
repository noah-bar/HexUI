import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentProps, ReactNode } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { fieldControlClassName } from '../field/fieldStyles';

export type InputProps = ComponentProps<typeof BaseInput> & {
  /** Icon before the text, such as a search glass. */
  startIcon?: ReactNode;
  /** Icon after the text, or a small button (show password, clear). */
  endIcon?: ReactNode;
};

const sizeClassName = 'hx:h-8 hx:w-full hx:min-w-0 hx:px-2.5';
const fileClassName =
  'hx:file:me-3 hx:file:h-full hx:file:border-0 hx:file:p-0 hx:file:bg-transparent hx:file:text-sm hx:file:font-semibold hx:file:text-fg';

export function Input({ className, startIcon, endIcon, ...props }: InputProps) {
  if (!startIcon && !endIcon) {
    return (
      <BaseInput
        className={mergeClassName([fieldControlClassName, sizeClassName, fileClassName].join(' '), className)}
        {...props}
      />
    );
  }

  // With icons, the frame moves to a wrapper and the input inside is bare. A string className styles the frame.
  return (
    <span
      className={cn(
        fieldControlClassName,
        sizeClassName,
        'hx:inline-flex hx:items-center hx:gap-2',
        'hx:[&>svg]:size-4 hx:[&>svg]:shrink-0 hx:[&>svg]:text-fg-muted hx:has-disabled:[&>svg]:text-fg-disabled',
        typeof className === 'string' && className,
      )}
    >
      {startIcon}
      <BaseInput
        className={mergeClassName(
          'hx:h-full hx:min-w-0 hx:flex-1 hx:border-0 hx:bg-transparent hx:p-0 hx:text-inherit hx:outline-none hx:placeholder:text-fg-placeholder hx:disabled:cursor-not-allowed hx:disabled:placeholder:text-fg-disabled',
          typeof className === 'function' ? className : undefined,
        )}
        {...props}
      />
      {endIcon}
    </span>
  );
}
