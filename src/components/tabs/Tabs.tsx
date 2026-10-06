import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';

export function Tabs({ className, ...props }: ComponentProps<typeof BaseTabs.Root>) {
  return <BaseTabs.Root className={mergeClassName('hx:flex hx:flex-col hx:gap-3', className)} {...props} />;
}

export function TabsList({ className, children, ...props }: ComponentProps<typeof BaseTabs.List>) {
  return (
    <BaseTabs.List
      className={mergeClassName(
        'hx:glass-thin hx:relative hx:z-0 hx:inline-flex hx:w-fit hx:items-center hx:gap-1 hx:rounded-xl hx:p-1',
        className,
      )}
      {...props}
    >
      {children}
      <BaseTabs.Indicator
        className={[
          'hx:glass-strong hx:absolute hx:top-(--active-tab-top) hx:left-0 hx:-z-10 hx:rounded-lg',
          'hx:h-(--active-tab-height) hx:w-(--active-tab-width) hx:translate-x-(--active-tab-left)',
          'hx:transition-[translate,width] hx:duration-200 hx:ease-out',
        ].join(' ')}
      />
    </BaseTabs.List>
  );
}

export function TabsTab({ className, ...props }: ComponentProps<typeof BaseTabs.Tab>) {
  return (
    <BaseTabs.Tab
      className={mergeClassName(
        [
          'hx:inline-flex hx:h-8 hx:items-center hx:justify-center hx:gap-2 hx:rounded-lg hx:px-3 hx:cursor-pointer',
          'hx:text-sm hx:font-medium hx:whitespace-nowrap hx:text-fg-muted hx:select-none',
          'hx:transition-colors hx:duration-150 hx:hover:text-fg hx:data-active:text-fg hx:focus-ring',
          'hx:data-disabled:pointer-events-none hx:data-disabled:opacity-50',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

export function TabsPanel({ className, ...props }: ComponentProps<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={mergeClassName('hx:text-fg hx:outline-none hx:focus-ring', className)} {...props} />;
}
