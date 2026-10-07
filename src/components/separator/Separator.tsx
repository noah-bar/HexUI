import { Separator as BaseSeparator } from '@base-ui/react/separator';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export function Separator({ className, orientation = 'horizontal', ...props }: ComponentProps<typeof BaseSeparator>) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={mergeClassName(
        orientation === 'vertical'
          ? 'hx:w-px hx:self-stretch hx:shrink-0 hx:bg-glass-border'
          : 'hx:h-px hx:w-full hx:shrink-0 hx:bg-glass-border',
        className,
      )}
      {...props}
    />
  );
}
