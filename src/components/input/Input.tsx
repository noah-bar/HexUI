import { Input as BaseInput } from '@base-ui/react/input';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import { fieldControlClassName } from '../field/fieldStyles';

export type InputProps = ComponentProps<typeof BaseInput>;

export function Input({ className, ...props }: InputProps) {
  return (
    <BaseInput
      className={mergeClassName(
        [
          fieldControlClassName,
          'hx:h-9 hx:w-full hx:min-w-0 hx:px-3 hx:placeholder:text-fg-subtle',
          'hx:file:border-0 hx:file:bg-transparent hx:file:text-sm hx:file:font-medium',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}
