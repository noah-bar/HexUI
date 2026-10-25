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
            'hx:block hx:min-h-20 hx:w-full hx:min-w-0 hx:resize-y hx:px-2.5 hx:py-1.5',
            className,
          )}
          {...props}
        />
      }
    />
  );
}
