import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type TableProps = ComponentProps<'table'> & {
  density?: 'comfortable' | 'compact';
};

/** Not a glass surface itself: put it in a Panel. */
export function Table({ density = 'comfortable', className, ...props }: TableProps) {
  return (
    <div className="hx:w-full hx:overflow-x-auto">
      <table data-density={density} className={cn(tableClassName, className)} {...props} />
    </div>
  );
}

/** @internal */
export const tableClassName =
  'hx:group/table hx:w-full hx:caption-bottom hx:border-collapse hx:text-left hx:text-sm hx:text-fg hx:tabular-nums';

export function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return <thead className={cn('hx:text-fg-muted', className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return <tbody className={cn(className)} {...props} />;
}

export function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return (
    <tfoot className={cn('hx:border-t hx:border-glass-border hx:bg-tint-hover hx:font-medium', className)} {...props} />
  );
}

export type TableRowProps = ComponentProps<'tr'> & {
  selected?: boolean;
};

export function TableRow({ selected, className, ...props }: TableRowProps) {
  return (
    <tr
      aria-selected={selected || undefined}
      data-selected={selected || undefined}
      className={cn(
        'hx:border-t hx:border-glass-border hx:transition-colors',
        props.onClick && 'hx:cursor-pointer',
        'hx:[tbody>&]:hover:bg-tint-hover hx:data-selected:bg-tint-active hx:[tbody>&]:data-selected:hover:bg-tint-active',
        'hx:[thead>&]:border-t-0',
        className,
      )}
      {...props}
    />
  );
}

type Align = 'left' | 'center' | 'right';

const alignClassNames: Record<Align, string> = {
  left: 'hx:text-left',
  center: 'hx:text-center',
  right: 'hx:text-right',
};

const cellPadding = 'hx:px-4 hx:py-3 hx:group-data-[density=compact]/table:py-1.5';

export type SortDirection = 'ascending' | 'descending' | 'none';

export type TableHeadProps = ComponentProps<'th'> & {
  align?: Align;
  /** Makes the column sortable. */
  sortDirection?: SortDirection;
  onSort?: () => void;
};

export function TableHead({ align = 'left', sortDirection, onSort, className, children, ...props }: TableHeadProps) {
  const sortable = sortDirection !== undefined;
  return (
    <th
      scope="col"
      aria-sort={sortable ? sortDirection : undefined}
      className={cn(
        cellPadding,
        'hx:h-10 hx:font-medium hx:whitespace-nowrap hx:group-data-[density=compact]/table:h-8',
        alignClassNames[align],
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            'hx:-mx-1.5 hx:inline-flex hx:items-center hx:gap-1 hx:rounded-sm hx:px-1.5 hx:py-0.5 hx:font-medium',
            'hx:cursor-pointer hx:hover:bg-tint-hover hx:hover:text-fg hx:focus-ring',
            sortDirection !== 'none' && 'hx:text-fg',
            align === 'right' && 'hx:flex-row-reverse',
          )}
        >
          {children}
          <SortIcon direction={sortDirection} />
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export type TableCellProps = ComponentProps<'td'> & {
  align?: Align;
};

export function TableCell({ align = 'left', className, ...props }: TableCellProps) {
  return <td className={cn(cellPadding, 'hx:align-middle', alignClassNames[align], className)} {...props} />;
}

export function TableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return <caption className={cn('hx:px-4 hx:py-3 hx:text-left hx:text-xs hx:text-fg-muted', className)} {...props} />;
}

export type TableEmptyProps = {
  colSpan: number;
  children: ReactNode;
};

export function TableEmpty({ colSpan, children }: TableEmptyProps) {
  return (
    <tr className="hx:border-t hx:border-glass-border">
      <td colSpan={colSpan} className="hx:px-4 hx:py-10 hx:text-center hx:text-sm hx:text-fg-muted">
        {children}
      </td>
    </tr>
  );
}

function SortIcon({ direction }: { direction: SortDirection }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="hx:size-3.5 hx:shrink-0"
    >
      <path d="m5 6 3-3 3 3" className={direction === 'descending' ? 'hx:opacity-30' : undefined} />
      <path d="m5 10 3 3 3-3" className={direction === 'ascending' ? 'hx:opacity-30' : undefined} />
    </svg>
  );
}
