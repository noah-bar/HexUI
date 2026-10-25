import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { ChevronDownIcon } from '../../lib/icons';

export function Collapsible({ className, ...props }: ComponentProps<typeof BaseCollapsible.Root>) {
  return <BaseCollapsible.Root className={mergeClassName('hx:flex hx:flex-col', className)} {...props} />;
}

export function CollapsibleTrigger({ className, ...props }: ComponentProps<typeof BaseCollapsible.Trigger>) {
  return <BaseCollapsible.Trigger className={mergeClassName('hx:group/collapsible', className)} {...props} />;
}

/** A chevron for the trigger; it turns when the content opens. */
export function CollapsibleChevron({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <ChevronDownIcon
      className={cn(
        'hx:text-fg-muted hx:transition-transform hx:duration-200 hx:ease-out hx:motion-reduce:transition-none',
        'hx:group-data-panel-open/collapsible:rotate-180',
        className,
      )}
      {...props}
    />
  );
}

const panelClassName = [
  // overflow-hidden drives the animation; the 4px inset leaves room for focus rings of fields inside.
  'hx:-m-1 hx:h-(--collapsible-panel-height) hx:overflow-hidden hx:p-1',
  'hx:transition-[height] hx:duration-200 hx:ease-out hx:motion-reduce:transition-none',
  'hx:data-starting-style:h-0 hx:data-ending-style:h-0',
  "hx:[&[hidden]:not([hidden='until-found'])]:hidden",
].join(' ');

export function CollapsibleContent({ className, ...props }: ComponentProps<typeof BaseCollapsible.Panel>) {
  return <BaseCollapsible.Panel className={mergeClassName(panelClassName, className)} {...props} />;
}
