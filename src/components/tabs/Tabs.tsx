import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export function Tabs({ className, ...props }: ComponentProps<typeof BaseTabs.Root>) {
  return <BaseTabs.Root className={mergeClassName('hx:flex hx:flex-col hx:gap-3', className)} {...props} />;
}

/** Plain tabs on the page, the active one marked by a blue bar that slides underneath. */
export function TabsList({ className, children, ...props }: ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={mergeClassName('hx:group/tabs hx:relative hx:inline-flex hx:w-fit hx:items-center', className)}
      {...props}
    >
      {children}
      <BaseTabs.Indicator
        className={[
          // Inset by the tab padding (12px each side), like the hover bar of the other tabs.
          'hx:absolute hx:bottom-0 hx:left-0 hx:h-[3px] hx:rounded-full hx:bg-accent',
          'hx:w-[calc(var(--active-tab-width)-1.5rem)] hx:translate-x-[calc(var(--active-tab-left)+0.75rem)]',
          // Slides only while the user acts on the list (pointer over it, or keyboard focus in it): on first render,
          // a resize or a change from outside, it jumps into place instead of sliding in from the left.
          'hx:group-hover/tabs:transition-[translate,width] hx:group-focus-within/tabs:transition-[translate,width]',
          'hx:duration-200 hx:ease-[cubic-bezier(0.1,0.9,0.2,1)] hx:motion-reduce:transition-none',
        ].join(' ')}
      />
    </BaseTabs.List>
  );
}

export function TabsTab({ className, children, ...props }: ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={mergeClassName(
        [
          'hx:group hx:relative hx:inline-flex hx:h-11 hx:items-center hx:justify-center hx:rounded-xs hx:px-3 hx:cursor-pointer',
          'hx:text-sm hx:whitespace-nowrap hx:text-fg-muted hx:select-none',
          'hx:transition-colors hx:duration-100 hx:hover:text-fg hx:data-active:text-fg hx:focus-ring',
          // Hover bar under inactive tabs, where the active bar would sit.
          // It fades, so it does not blink out when the tab is clicked and the active bar slides in.
          'hx:after:absolute hx:after:inset-x-3 hx:after:bottom-0 hx:after:h-[3px] hx:after:rounded-full',
          'hx:after:transition-colors hx:after:duration-100',
          'hx:not-data-active:hover:after:bg-border-strong',
          'hx:data-disabled:pointer-events-none hx:data-disabled:text-fg-disabled',
          'hx:[&_svg]:size-4 hx:[&_svg]:shrink-0',
        ].join(' '),
        className,
      )}
      {...props}
    >
      {/* The active tab is semibold; a hidden semibold copy reserves that width, so tabs never shift. */}
      <span className="hx:grid">
        <span className="hx:col-start-1 hx:row-start-1 hx:inline-flex hx:items-center hx:gap-1.5 hx:group-data-active:font-semibold">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="hx:invisible hx:col-start-1 hx:row-start-1 hx:inline-flex hx:items-center hx:gap-1.5 hx:font-semibold"
        >
          {children}
        </span>
      </span>
    </BaseTabs.Tab>
  );
}

export function TabsPanel({ className, ...props }: ComponentProps<typeof BaseTabs.Panel>) {
  return (
    <BaseTabs.Panel className={mergeClassName('hx:text-fg hx:outline-none hx:focus-ring', className)} {...props} />
  );
}
