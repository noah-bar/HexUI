import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import { checkControlClassName } from '../field/fieldStyles';

export function RadioGroup({ className, ...props }: ComponentProps<typeof BaseRadioGroup>) {
  return <BaseRadioGroup className={mergeClassName('hx:flex hx:flex-col hx:gap-2.5', className)} {...props} />;
}

export type RadioProps = ComponentProps<typeof BaseRadio.Root>;

export function Radio({ className, ...props }: RadioProps) {
  return (
    <BaseRadio.Root
      className={mergeClassName([checkControlClassName, 'hx:rounded-full hx:data-checked:glass-tint'].join(' '), className)}
      {...props}
    >
      <BaseRadio.Indicator className="hx:glass-bead hx:size-2 hx:rounded-full hx:data-unchecked:hidden" />
    </BaseRadio.Root>
  );
}
