import { createContext, use, useState, type ComponentProps, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Pagination } from '../pagination/Pagination';
import { Skeleton } from '../skeleton/Skeleton';
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  tableClassName,
  type SortDirection,
  type TableHeadProps,
  type TableRowProps,
} from '../table/Table';

export {
  TableCaption as DataTableCaption,
  TableCell as DataTableCell,
  TableEmpty as DataTableEmpty,
  TableFooter as DataTableFooter,
  TableHead as DataTableHead,
  type TableCellProps as DataTableCellProps,
  type TableEmptyProps as DataTableEmptyProps,
  type TableHeadProps as DataTableHeadProps,
} from '../table/Table';

export type DataTablePage = { total: number; skip: number; limit: number };

type RowValue = string | number;

type DataTableContextValue = {
  ordering: string;
  onOrderingChange?: (ordering: string) => void;
  /** Set with `showCurrent`: the row opened last, and how to change it. */
  current?: { value: RowValue | undefined; open: (value: RowValue) => void };
};

const DataTableContext = createContext<DataTableContextValue>({ ordering: '' });

// The row opened last, per table. In memory: it outlives the table while the row's details are shown (the table is
// unmounted, then mounted again on the way back), and is forgotten on reload.
const openedRows = new Map<string, RowValue>();

function useCurrentRow(showCurrent: boolean | string | undefined) {
  const key =
    typeof showCurrent === 'string' ? showCurrent : typeof window === 'undefined' ? '' : window.location.pathname;
  const [value, setValue] = useState(() => openedRows.get(key));
  if (!showCurrent) return undefined;
  return {
    value,
    open: (next: RowValue) => {
      openedRows.set(key, next);
      setValue(next);
    },
  };
}

export type DataTableProps = {
  children: ReactNode;
  /** Current sort, Django style: `"field"` ascending, `"-field"` descending, `""` none. */
  ordering?: string;
  onOrderingChange?: (ordering: string) => void;
  pagination?: DataTablePage;
  onSkipChange?: (skip: number) => void;
  density?: 'comfortable' | 'compact';
  /**
   * Mark the row opened last (a blue bar on its left), so it stands out when the user comes back from its details.
   * Rows need a `value`. A row counts as opened when it is clicked (if it has an `onClick`) or when a link inside it
   * is followed, including one in its menu. Remembered per page (URL path), or per key when a string is given.
   */
  showCurrent?: boolean | string;
  className?: string;
};

/** Fills its parent's height and scrolls inside: give the parent a height. */
export function DataTable({
  children,
  ordering = '',
  onOrderingChange,
  pagination,
  onSkipChange,
  density = 'comfortable',
  showCurrent,
  className,
}: DataTableProps) {
  const current = useCurrentRow(showCurrent);
  return (
    <DataTableContext value={{ ordering, onOrderingChange, current }}>
      {/* Clips the sticky header inside the rounded corners. */}
      <div
        className={cn('hx:flex hx:size-full hx:min-h-0 hx:flex-col hx:overflow-hidden hx:rounded-[inherit]', className)}
      >
        <div className="hx:min-h-0 hx:flex-1 hx:overflow-auto hx:overscroll-contain hx:rounded-t-[inherit]">
          <table data-density={density} className={cn(tableClassName, 'hx:rounded-t-[inherit] hx:whitespace-nowrap')}>
            {children}
          </table>
        </div>
        {pagination && onSkipChange && <DataTablePagination {...pagination} onSkipChange={onSkipChange} />}
      </div>
    </DataTableContext>
  );
}

export function DataTableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <TableHeader
      className={cn(
        // Sticky on the whole thead, not each th, so the header is one surface without seams.
        'hx:sticky hx:top-0 hx:z-10 hx:rounded-t-[inherit] hx:bg-surface',
        // Collapsed table borders don't stick: draw the separator as an inset shadow instead.
        'hx:shadow-[inset_0_-1px_0_var(--hx-border)]',
        className,
      )}
      {...props}
    />
  );
}

export type DataTableRowProps = TableRowProps & {
  /** Identifies the row for `showCurrent` on the table, such as the record's id. */
  value?: RowValue;
};

export function DataTableRow({ value, current, onClickCapture, ...props }: DataTableRowProps) {
  const table = use(DataTableContext).current;
  const tracked = table !== undefined && value !== undefined;

  function handleClickCapture(event: MouseEvent<HTMLTableRowElement>) {
    onClickCapture?.(event);
    if (!tracked) return;
    // Capture, so a cell that stops the click (a menu) still lets the row see a link being followed. React events
    // also arrive from popups portaled out of the row, such as its menu.
    const target = event.target as Element;
    const followsLink = target.closest('a[href]') !== null;
    const opensRow =
      props.onClick !== undefined && !target.closest('button, a, input, select, textarea, label, [role=menuitem]');
    if (followsLink || opensRow) table.open(value);
  }

  return (
    <TableRow current={current ?? (tracked && table.value === value)} onClickCapture={handleClickCapture} {...props} />
  );
}

/** Cycles a Django-style ordering for `field`: ascending → descending → none. */
export function nextOrdering(ordering: string, field: string): string {
  if (ordering === field) return `-${field}`;
  if (ordering === `-${field}`) return '';
  return field;
}

export type DataTableSortableHeadProps = Omit<TableHeadProps, 'sortDirection' | 'onSort'> & {
  field: string;
};

export function DataTableSortableHead({ field, ...props }: DataTableSortableHeadProps) {
  const { ordering, onOrderingChange } = use(DataTableContext);
  const direction: SortDirection = ordering === field ? 'ascending' : ordering === `-${field}` ? 'descending' : 'none';
  return (
    <TableHead {...props} sortDirection={direction} onSort={() => onOrderingChange?.(nextOrdering(ordering, field))} />
  );
}

export type DataTableBodyProps = Omit<ComponentProps<'tbody'>, 'children'> & {
  colSpan: number;
  isPending?: boolean;
  isEmpty?: boolean;
  emptyText?: ReactNode;
  pendingRows?: number;
  children?: ReactNode;
};

export function DataTableBody({
  colSpan,
  isPending,
  isEmpty,
  emptyText = 'No results.',
  pendingRows = 5,
  children,
  ...props
}: DataTableBodyProps) {
  let content = children;
  if (isPending) {
    content = Array.from({ length: pendingRows }, (_, i) => (
      <TableRow key={i} aria-hidden="true">
        {Array.from({ length: colSpan }, (_, j) => (
          <TableCell key={j}>
            <Skeleton className="hx:w-full hx:max-w-40" />
          </TableCell>
        ))}
      </TableRow>
    ));
  } else if (isEmpty) {
    content = (
      <tr className="hx:border-t hx:border-border hx:first:border-t-0">
        <td colSpan={colSpan} className="hx:h-24 hx:px-3 hx:text-center hx:text-sm hx:text-fg-muted">
          {emptyText}
        </td>
      </tr>
    );
  }
  return (
    <tbody aria-busy={isPending || undefined} {...props}>
      {content}
    </tbody>
  );
}

type DataTablePaginationProps = DataTablePage & { onSkipChange: (skip: number) => void };

function DataTablePagination({ total, skip, limit, onSkipChange }: DataTablePaginationProps) {
  if (total === 0 || limit <= 0) return null;
  return (
    <Pagination
      page={Math.floor(skip / limit) + 1}
      totalPages={Math.ceil(total / limit)}
      onPageChange={(page) => onSkipChange((page - 1) * limit)}
      className="hx:border-t hx:border-border hx:px-2 hx:py-1.5"
    />
  );
}
