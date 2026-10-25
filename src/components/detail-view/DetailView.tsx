import { useRender } from '@base-ui/react/use-render';
import type { ComponentProps, ReactNode } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { ExpandIcon } from '../../lib/icons';
import { Tabs, TabsList, TabsPanel } from '../tabs/Tabs';

export function DetailView({ className, render, ...props }: useRender.ComponentProps<'section'>) {
  return useRender({
    defaultTagName: 'section',
    render,
    props: {
      ...props,
      className: mergeClassName(
        'hx:flex hx:min-h-0 hx:flex-col hx:overflow-clip hx:rounded-xs hx:bg-surface hx:text-fg hx:shadow-card',
        className,
      ),
    },
  });
}

export function DetailViewHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:shrink-0 hx:items-start hx:gap-3 hx:p-3 hx:sm:p-4', className)} {...props} />;
}

export type DetailViewImageProps = Omit<ComponentProps<'div'>, 'onClick'> & {
  src?: string;
  alt?: string;
  onClick?: () => void;
  clickLabel?: string;
  children?: ReactNode;
};

export function DetailViewImage({
  src,
  alt = '',
  onClick,
  clickLabel = 'View image',
  className,
  children,
  ...props
}: DetailViewImageProps) {
  const content = src ? (
    <img src={src} alt={alt} className="hx:size-full hx:object-cover" />
  ) : (
    <span className="hx:flex hx:size-full hx:items-center hx:justify-center hx:text-fg-muted hx:[&_svg]:size-7">
      {children}
    </span>
  );
  const frameClassName = cn(
    'hx:relative hx:size-16 hx:shrink-0 hx:overflow-clip hx:rounded-xs hx:bg-surface-hover',
    'hx:after:pointer-events-none hx:after:absolute hx:after:inset-0 hx:after:rounded-[inherit] hx:after:shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]',
    className,
  );

  if (!onClick) {
    return (
      <div className={frameClassName} {...props}>
        {content}
      </div>
    );
  }
  return (
    <div className={frameClassName} {...props}>
      <button
        type="button"
        onClick={onClick}
        aria-label={clickLabel}
        className="hx:group hx:block hx:size-full hx:cursor-pointer hx:rounded-[inherit] hx:focus-ring"
      >
        {content}
        <span className="hx:absolute hx:inset-0 hx:flex hx:items-center hx:justify-center hx:bg-black/45 hx:text-white hx:opacity-0 hx:transition-opacity hx:duration-100 hx:group-hover:opacity-100 hx:group-focus-visible:opacity-100">
          <ExpandIcon className="hx:size-5" />
        </span>
      </button>
    </div>
  );
}

export function DetailViewHeading({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('hx:flex hx:min-h-16 hx:min-w-0 hx:flex-1 hx:flex-col hx:justify-center hx:gap-0.5', className)}
      {...props}
    />
  );
}

export function DetailViewTitle({ className, render, ...props }: useRender.ComponentProps<'h2'>) {
  return useRender({
    defaultTagName: 'h2',
    render,
    props: {
      ...props,
      className: cn('hx:m-0 hx:truncate hx:text-lg hx:leading-snug hx:font-semibold hx:text-fg', className),
    },
  });
}

export function DetailViewDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('hx:m-0 hx:truncate hx:text-sm hx:text-fg-muted', className)} {...props} />;
}

export function DetailViewMeta({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('hx:m-0 hx:truncate hx:text-xs hx:text-fg-muted', className)} {...props} />;
}

export function DetailViewActions({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:ms-auto hx:flex hx:shrink-0 hx:items-center hx:gap-1', className)} {...props} />;
}

const contentClassName = 'hx:min-h-0 hx:flex-1 hx:overflow-y-auto hx:p-3 hx:sm:p-4';

export function DetailViewContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn(contentClassName, 'hx:border-t hx:border-border', className)} {...props} />;
}

export function DetailViewTabs({ className, ...props }: ComponentProps<typeof Tabs>) {
  return <Tabs className={mergeClassName('hx:flex hx:min-h-0 hx:flex-1 hx:flex-col', className)} {...props} />;
}

export function DetailViewTabsList({ className, ...props }: ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      className={mergeClassName(
        'hx:flex hx:w-full hx:shrink-0 hx:overflow-x-auto hx:border-y hx:border-border hx:px-1 hx:sm:px-2',
        className,
      )}
      {...props}
    />
  );
}

export function DetailViewTabsPanel({ className, ...props }: ComponentProps<typeof TabsPanel>) {
  return <TabsPanel className={mergeClassName(contentClassName, className)} {...props} />;
}

export function DetailSection({
  title,
  className,
  children,
  ...props
}: Omit<ComponentProps<'section'>, 'title'> & { title?: ReactNode }) {
  return (
    <section
      className={cn(
        'hx:flex hx:flex-col hx:gap-3 hx:not-first:mt-4 hx:not-first:border-t hx:not-first:border-border hx:not-first:pt-4',
        className,
      )}
      {...props}
    >
      {title && (
        <h3 className="hx:m-0 hx:text-xs hx:font-semibold hx:tracking-wide hx:text-fg-muted hx:uppercase">{title}</h3>
      )}
      {children}
    </section>
  );
}

const columnClassNames = {
  1: '',
  2: 'hx:@sm:grid-cols-2',
  3: 'hx:@sm:grid-cols-2 hx:@2xl:grid-cols-3',
  4: 'hx:@sm:grid-cols-2 hx:@2xl:grid-cols-3 hx:@4xl:grid-cols-4',
};

export type DetailListProps = ComponentProps<'dl'> & {
  columns?: 1 | 2 | 3 | 4;
};

export function DetailList({ columns = 4, className, ...props }: DetailListProps) {
  return (
    <div className="hx:@container">
      <dl
        className={cn('hx:m-0 hx:grid hx:grid-cols-1 hx:gap-x-6 hx:gap-y-3', columnClassNames[columns], className)}
        {...props}
      />
    </div>
  );
}

export type DetailItemProps = Omit<ComponentProps<'div'>, 'children'> & {
  label: ReactNode;
  value?: ReactNode;
  unit?: ReactNode;
  span?: 'full';
};

export function DetailItem({ label, value, unit, span, className, ...props }: DetailItemProps) {
  const empty = value === null || value === undefined || value === '';
  return (
    <div
      className={cn('hx:flex hx:min-w-0 hx:flex-col hx:gap-0.5', span === 'full' && 'hx:col-span-full', className)}
      {...props}
    >
      <dt className="hx:text-xs hx:text-fg-muted">{label}</dt>
      <dd className="hx:m-0 hx:text-sm hx:break-words hx:whitespace-pre-line hx:text-fg">
        {empty ? (
          <span className="hx:text-fg-subtle">—</span>
        ) : (
          <>
            {value}
            {unit && <span className="hx:text-fg-muted"> {unit}</span>}
          </>
        )}
      </dd>
    </div>
  );
}
