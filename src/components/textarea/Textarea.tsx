import { Field as BaseField } from '@base-ui/react/field';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';
import { fieldControlClassName } from '../field/fieldStyles';

export type TextareaProps = ComponentProps<'textarea'>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <BaseField.Control
      render={
        <textarea
          className={cn(
            fieldControlClassName,
            'hx:block hx:min-h-20 hx:w-full hx:min-w-0 hx:resize-y hx:px-3 hx:py-2 hx:placeholder:text-fg-subtle',
            className,
          )}
          {...props}
        />
      }
    />
  );
}
