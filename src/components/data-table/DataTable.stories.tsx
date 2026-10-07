import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { Badge, type BadgeProps } from '../badge/Badge';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '../menu/Menu';
import { Panel } from '../panel/Panel';
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHead,
  DataTableHeader,
  DataTableRow,
  DataTableSortableHead,
  type DataTablePage,
} from './DataTable';

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Fake paginated API (Django style: search, ordering "field" / "-field", skip, limit).
// ---------------------------------------------------------------------------
type Quote = { id: number; title: string; client: string; date: string; total: number; status: string };

const clients = [
  'Banque Cantonale',
  'Helvetia Services',
  'Alpina Logistique',
  'Romandie Santé',
  'Léman Immobilier',
  'Jura Énergie',
];
const statuses = ['Draft', 'Sent', 'Accepted', 'Declined'];
const subjects = [
  'Website redesign',
  'Annual maintenance',
  'Security audit',
  'Cloud migration',
  'Team training',
  'Mobile app',
  'Accounting platform migration to the cloud with staff onboarding and support',
];

const allQuotes: Quote[] = Array.from({ length: 87 }, (_, i) => ({
  id: 1000 + i,
  title: `${subjects[i % subjects.length]} ${Math.floor(i / subjects.length) + 1}`,
  client: clients[(i * 7) % clients.length],
  date: new Date(2026, 0, 1 + ((i * 37) % 270)).toISOString().slice(0, 10),
  total: Math.round(((i * 7919) % 48000) + 1200),
  status: statuses[(i * 3) % statuses.length],
}));

type Query = { search: string; ordering: string; skip: number; limit: number };

function fetchQuotes({ search, ordering, skip, limit }: Query): Promise<DataTablePage & { results: Quote[] }> {
  let rows = allQuotes.filter((q) => `${q.title} ${q.client}`.toLowerCase().includes(search.toLowerCase()));
  if (ordering) {
    const desc = ordering.startsWith('-');
    const key = ordering.replace('-', '') as keyof Quote;
    rows = [...rows].sort((a, b) => (a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0) * (desc ? -1 : 1));
  }
  return new Promise((resolve) =>
    setTimeout(() => resolve({ results: rows.slice(skip, skip + limit), total: rows.length, skip, limit }), 600),
  );
}

/** Minimal stand-in for a query hook (TanStack Query, SWR…). */
function useQuotes({ search, ordering, skip, limit }: Query) {
  const key = JSON.stringify([search, ordering, skip, limit]);
  // The previous page stays displayed while the next one loads; pending until the result matches the query.
  const [result, setResult] = useState<{ key: string; data: Awaited<ReturnType<typeof fetchQuotes>> }>();
  useEffect(() => {
    let active = true;
    fetchQuotes({ search, ordering, skip, limit }).then((data) => {
      if (active) setResult({ key, data });
    });
    return () => {
      active = false;
    };
  }, [key, search, ordering, skip, limit]);
  return { data: result?.data, isPending: result?.key !== key };
}

const statusVariant: Record<string, BadgeProps['variant']> = {
  Draft: 'neutral',
  Sent: 'info',
  Accepted: 'success',
  Declined: 'danger',
};

const chf = (n: number) => n.toLocaleString('en-CH', { style: 'currency', currency: 'CHF' });

/**
 * Server-side search, sorting and pagination, with loading skeletons and an empty state.
 * In an app, `search`, `ordering` and `skip` usually live in the URL (see the README).
 */
export const ServerSide: Story = {
  args: { children: null },
  render: function ServerSideStory() {
    const [search, setSearch] = useState('');
    const [ordering, setOrdering] = useState('-date');
    const [skip, setSkip] = useState(0);
    const debouncedSearch = useDebouncedValue(search, 300);
    const { data, isPending } = useQuotes({ search: debouncedSearch, ordering, skip, limit: 10 });
    const quotes = data?.results ?? [];

    return (
      <div className="hx:flex hx:h-[640px] hx:max-w-5xl hx:flex-col hx:gap-3">
        <Panel variant="thin" className="hx:p-3">
          <Input
            placeholder="Search for a quote or a client…"
            className="hx:max-w-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSkip(0);
            }}
          />
        </Panel>
        <Panel className="hx:min-h-0 hx:flex-1 hx:p-0">
          <DataTable
            ordering={ordering}
            onOrderingChange={(o) => {
              setOrdering(o);
              setSkip(0);
            }}
            pagination={data}
            onSkipChange={setSkip}
          >
            <DataTableHeader>
              <DataTableRow>
                <DataTableSortableHead field="title">Title</DataTableSortableHead>
                <DataTableSortableHead field="client">Client</DataTableSortableHead>
                <DataTableSortableHead field="date">Date</DataTableSortableHead>
                <DataTableSortableHead field="total" align="right">
                  Total incl. VAT
                </DataTableSortableHead>
                <DataTableSortableHead field="status">Status</DataTableSortableHead>
                <DataTableHead className="hx:w-12">
                  <span className="hx:sr-only">Actions</span>
                </DataTableHead>
              </DataTableRow>
            </DataTableHeader>
            <DataTableBody
              colSpan={6}
              isPending={isPending}
              isEmpty={quotes.length === 0}
              emptyText={`No quote matches “${debouncedSearch}”.`}
            >
              {quotes.map((q) => (
                <DataTableRow key={q.id} onClick={() => console.log('Open quote', q.id)}>
                  <DataTableCell className="hx:font-medium">{q.title}</DataTableCell>
                  <DataTableCell>{q.client}</DataTableCell>
                  <DataTableCell>{new Date(q.date).toLocaleDateString('en-CH')}</DataTableCell>
                  <DataTableCell align="right">{chf(q.total)}</DataTableCell>
                  <DataTableCell>
                    <Badge variant={statusVariant[q.status]}>{q.status}</Badge>
                  </DataTableCell>
                  <DataTableCell className="hx:px-2 hx:py-1" onClick={(e) => e.stopPropagation()}>
                    <Menu>
                      <MenuTrigger
                        render={<Button variant="ghost" size="icon" className="hx:size-8" />}
                        aria-label={`Actions for ${q.title}`}
                      >
                        <Ellipsis />
                      </MenuTrigger>
                      <MenuContent align="end">
                        <MenuItem>
                          <Pencil /> Edit
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem variant="danger">
                          <Trash2 /> Delete
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTable>
        </Panel>
      </div>
    );
  },
};

/** Skeleton rows while the first page loads. */
export const Loading: Story = {
  args: { children: null },
  render: () => (
    <Panel className="hx:h-80 hx:max-w-3xl hx:p-0">
      <DataTable>
        <DataTableHeader>
          <DataTableRow>
            <DataTableHead>Title</DataTableHead>
            <DataTableHead>Client</DataTableHead>
            <DataTableHead align="right">Total incl. VAT</DataTableHead>
          </DataTableRow>
        </DataTableHeader>
        <DataTableBody colSpan={3} isPending />
      </DataTable>
    </Panel>
  ),
};
