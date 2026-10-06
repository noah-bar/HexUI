import { createContext, use, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Button } from '../button/Button';
import { Skeleton } from '../skeleton/Skeleton';
import {
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  tableClassName,
  type SortDirection,
  type TableHeadProps,
} from '../table/Table';

/** Server-side page: same shape as a paginated API response (`results` is ignored here). */
export type DataTablePage = { total: number; skip: number; limit: number };

type DataTableContextValue = {
  ordering: string;
  onOrderingChange?: (ordering: string) => void;
};

const DataTableContext = createContext<DataTableContextValue>({ ordering: '' });

export type DataTableProps = {
  children: ReactNode;
  /** Current sort, Django style: `"field"` ascending, `"-field"` descending, `""` none. */
  ordering?: string;
  onOrderingChange?: (ordering: string) => void;
  /** Pagination info from the API. Omit it to hide the pagination bar. */
  pagination?: DataTablePage;
  /** Called with the new `skip` when the user changes page. */
  onSkipChange?: (skip: number) => void;
  density?: 'comfortable' | 'compact';
  className?: string;
};

/**
 * Data table wired for server-side data: sorting, pagination, loading and empty states,
 * sticky header. It fills its parent's height and scrolls inside, so give the parent a height
 * (e.g. a Panel in a flex layout): `<Panel className="h-[600px]"><DataTable …/></Panel>`.
 */
export function DataTable({
  children,
  ordering = '',
  onOrderingChange,
  pagination,
  onSkipChange,
  density = 'comfortable',
  className,
}: DataTableProps) {
  return (
    <DataTableContext value={{ ordering, onOrderingChange }}>
      {/* Clips the sticky header's background inside the container's border and rounded corners,
          so it never paints over the Panel's border or lit edge. */}
      <div className={cn('hx:flex hx:size-full hx:min-h-0 hx:flex-col hx:overflow-hidden hx:rounded-[inherit]', className)}>
        <div className="hx:min-h-0 hx:flex-1 hx:overflow-auto hx:overscroll-contain">
          <table data-density={density} className={tableClassName}>
            {children}
          </table>
        </div>
        {pagination && onSkipChange && <DataTablePagination {...pagination} onSkipChange={onSkipChange} />}
      </div>
    </DataTableContext>
  );
}

/** Header that stays visible while the body scrolls. */
export function DataTableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <TableHeader
      className={cn(
        // Translucent glass: rows scrolling underneath show through as color, blurred beyond reading.
        'hx:[&_th]:sticky hx:[&_th]:top-0 hx:[&_th]:z-10 hx:[&_th]:bg-glass hx:[&_th]:backdrop-blur-xl hx:[&_th]:backdrop-saturate-150',
        // Collapsed table borders don't stick: draw the separator on the cells instead.
        'hx:[&_th]:shadow-[inset_0_-1px_0_var(--hx-glass-border)]',
        className,
      )}
      {...props}
    />
  );
}

/** Next value of a Django-style ordering when `field` is clicked: ascending → descending → none. */
export function nextOrdering(ordering: string, field: string): string {
  if (ordering === field) return `-${field}`;
  if (ordering === `-${field}`) return '';
  return field;
}

export type DataTableSortableHeadProps = Omit<TableHeadProps, 'sortDirection' | 'onSort'> & {
  /** API field name sent in `ordering` (e.g. `"client__full_name"`). */
  field: string;
};

/** Column header that sorts the table by `field`. */
export function DataTableSortableHead({ field, ...props }: DataTableSortableHeadProps) {
  const { ordering, onOrderingChange } = use(DataTableContext);
  const direction: SortDirection =
    ordering === field ? 'ascending' : ordering === `-${field}` ? 'descending' : 'none';
  return (
    <TableHead {...props} sortDirection={direction} onSort={() => onOrderingChange?.(nextOrdering(ordering, field))} />
  );
}

export type DataTableBodyProps = Omit<ComponentProps<'tbody'>, 'children'> & {
  /** Number of columns, so loading and empty rows span the whole table. */
  colSpan: number;
  /** Shows skeleton rows instead of the children. */
  isPending?: boolean;
  /** Shows `emptyText` instead of the children. */
  isEmpty?: boolean;
  emptyText?: ReactNode;
  /** Number of skeleton rows while pending. */
  pendingRows?: number;
  children?: ReactNode;
};

export function DataTableBody({
  colSpan,
  isPending,
  isEmpty,
  emptyText = 'Aucun résultat.',
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
      <tr className="hx:border-t hx:border-glass-border hx:first:border-t-0">
        <td colSpan={colSpan} className="hx:h-24 hx:px-4 hx:text-center hx:text-sm hx:text-fg-muted">
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

export type DataTablePaginationProps = DataTablePage & {
  onSkipChange: (skip: number) => void;
  /** Maximum number of page buttons, ellipses included. */
  maxVisible?: number;
  previousLabel?: string;
  nextLabel?: string;
  /** Accessible label of a page button. */
  pageLabel?: (page: number) => string;
};

/** Page numbers with ellipses: `1 … 4 5 6 … 12`. Pages from `maxVisible` slots. */
export function getVisiblePages(current: number, totalPages: number, maxVisible = 5): (number | 'ellipsis')[] {
  if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const side = Math.floor((maxVisible - 3) / 2);
  let start = Math.max(2, current - side);
  let end = Math.min(totalPages - 1, current + side);
  if (current <= side + 1) end = Math.min(totalPages - 1, maxVisible - 1);
  else if (current >= totalPages - side) start = Math.max(2, totalPages - maxVisible + 2);
  const pages: (number | 'ellipsis')[] = [1];
  if (start > 2) pages.push('ellipsis');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages - 1) pages.push('ellipsis');
  pages.push(totalPages);
  return pages;
}

export function DataTablePagination({
  total,
  skip,
  limit,
  onSkipChange,
  maxVisible = 5,
  previousLabel = 'Page précédente',
  nextLabel = 'Page suivante',
  pageLabel = (page) => `Page ${page}`,
}: DataTablePaginationProps) {
  if (total === 0 || limit <= 0) return null;
  const totalPages = Math.ceil(total / limit);
  const current = Math.floor(skip / limit) + 1;
  const goTo = (page: number) => onSkipChange((page - 1) * limit);

  return (
    <nav
      aria-label="Pagination"
      className="hx:flex hx:items-center hx:justify-center hx:gap-1 hx:border-t hx:border-glass-border hx:px-2 hx:py-1.5"
    >
      <Button variant="ghost" size="icon" className="hx:size-8" aria-label={previousLabel} disabled={current === 1} onClick={() => goTo(current - 1)}>
        <Chevron direction="left" />
      </Button>
      {getVisiblePages(current, totalPages, maxVisible).map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} aria-hidden="true" className="hx:px-1.5 hx:text-sm hx:text-fg-muted">
            …
          </span>
        ) : (
          <Button
            key={page}
            variant={page === current ? 'secondary' : 'ghost'}
            size="sm"
            className="hx:min-w-8 hx:px-2 hx:tabular-nums"
            aria-label={pageLabel(page)}
            aria-current={page === current ? 'page' : undefined}
            onClick={() => goTo(page)}
          >
            {page}
          </Button>
        ),
      )}
      <Button variant="ghost" size="icon" className="hx:size-8" aria-label={nextLabel} disabled={current === totalPages} onClick={() => goTo(current + 1)}>
        <Chevron direction="right" />
      </Button>
    </nav>
  );
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === 'left' ? 'm10 4-4 4 4 4' : 'm6 4 4 4-4 4'} />
    </svg>
  );
}
