import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export type InputProps = ComponentProps<typeof BaseInput>;

export function Input({ className, ...props }: InputProps) {
  return (
    <BaseInput
      className={mergeClassName(
        [
          'hx:glass-field hx:h-9 hx:w-full hx:min-w-0 hx:rounded-md hx:px-3 hx:text-sm hx:text-fg',
          'hx:placeholder:text-fg-subtle hx:transition-[border-color,box-shadow] hx:duration-150',
          'hx:hover:border-field-border-hover',
          'hx:outline-none hx:focus-visible:border-accent hx:focus-visible:ring-3 hx:focus-visible:ring-ring',
          'hx:error:border-danger hx:error:ring-3 hx:error:ring-danger/15',
          'hx:error:focus-visible:border-danger hx:error:focus-visible:ring-danger/30',
          'hx:data-disabled:cursor-not-allowed hx:data-disabled:opacity-50',
          'hx:file:border-0 hx:file:bg-transparent hx:file:text-sm hx:file:font-medium',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}
