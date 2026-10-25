import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { ChevronRightIcon } from '../../lib/icons';

/** Sections that open one at a time (`multiple` to open several); `defaultValue` lists the open ones. */
export function Accordion({ className, ...props }: ComponentProps<typeof BaseAccordion.Root>) {
  return <BaseAccordion.Root className={mergeClassName('hx:flex hx:w-full hx:flex-col', className)} {...props} />;
}

export function AccordionItem({ className, ...props }: ComponentProps<typeof BaseAccordion.Item>) {
  return <BaseAccordion.Item className={mergeClassName('hx:border-b hx:border-border', className)} {...props} />;
}

/** The heading of a section. Fluent: the chevron sits before the text and points down once open. */
export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof BaseAccordion.Trigger>) {
  return (
    <BaseAccordion.Header className="hx:m-0">
      <BaseAccordion.Trigger
        className={mergeClassName(
          cn(
            'hx:group hx:flex hx:min-h-11 hx:w-full hx:items-center hx:gap-2 hx:px-2 hx:py-2 hx:text-start',
            'hx:text-sm hx:font-semibold hx:text-fg hx:cursor-pointer hx:select-none hx:rounded-xs',
            'hx:transition-colors hx:duration-100 hx:hover:bg-surface-hover hx:focus-ring hx:focus-visible:-outline-offset-2',
            'hx:data-disabled:pointer-events-none hx:data-disabled:text-fg-disabled',
          ),
          className,
        )}
        {...props}
      >
        <ChevronRightIcon className="hx:text-fg-muted hx:transition-transform hx:duration-200 hx:ease-out hx:group-data-panel-open:rotate-90 hx:motion-reduce:transition-none" />
        {children}
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof BaseAccordion.Panel>) {
  return (
    <BaseAccordion.Panel
      className={mergeClassName(
        [
          'hx:h-(--accordion-panel-height) hx:overflow-hidden hx:text-sm hx:text-fg',
          'hx:transition-[height] hx:duration-200 hx:ease-out hx:motion-reduce:transition-none',
          'hx:data-starting-style:h-0 hx:data-ending-style:h-0',
        ].join(' '),
        className,
      )}
      {...props}
    >
      {/* Aligned with the text of the trigger, after the chevron. */}
      <div className="hx:ps-8 hx:pe-2 hx:pb-4">{children}</div>
    </BaseAccordion.Panel>
  );
}
