import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

/** Section that folds and unfolds (details, advanced options). Holds a CollapsibleTrigger and a CollapsibleContent. */
export function Collapsible({ className, ...props }: ComponentProps<typeof BaseCollapsible.Root>) {
  return <BaseCollapsible.Root className={mergeClassName('hx:flex hx:flex-col', className)} {...props} />;
}

/**
 * Button that folds the section. Style it with `render`: `<CollapsibleTrigger render={<Button variant="ghost" />}>`,
 * and add a CollapsibleChevron inside.
 */
export function CollapsibleTrigger({ className, ...props }: ComponentProps<typeof BaseCollapsible.Trigger>) {
  return <BaseCollapsible.Trigger className={mergeClassName('hx:group/collapsible', className)} {...props} />;
}

/** Chevron that turns when its CollapsibleTrigger is open. */
export function CollapsibleChevron({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        'hx:size-4 hx:shrink-0 hx:text-fg-muted hx:transition-transform hx:duration-200 hx:ease-out hx:motion-reduce:transition-none',
        'hx:group-data-panel-open/collapsible:rotate-180',
        className,
      )}
      {...props}
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

/**
 * Folding content, with a height animation. `hiddenUntilFound` lets the browser's find-in-page
 * search inside and open it.
 */
export function CollapsibleContent({ className, ...props }: ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      className={mergeClassName(
        [
          // overflow-hidden drives the animation; the 4px inset leaves room for focus rings of fields inside.
          'hx:-m-1 hx:h-(--collapsible-panel-height) hx:overflow-hidden hx:p-1',
          'hx:transition-[height] hx:duration-200 hx:ease-out hx:motion-reduce:transition-none',
          'hx:data-starting-style:h-0 hx:data-ending-style:h-0',
          "hx:[&[hidden]:not([hidden='until-found'])]:hidden",
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}
