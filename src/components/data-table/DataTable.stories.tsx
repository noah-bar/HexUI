import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { Badge, type BadgeProps } from '../badge/Badge';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '../menu/Menu';
import { Panel } from '../panel/Panel';
import { TableCell, TableHead, TableRow } from '../table/Table';
import { DataTable, DataTableBody, DataTableHeader, DataTableSortableHead, type DataTablePage } from './DataTable';

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

const clients = ['Banque Cantonale', 'Helvetia Services', 'Alpina Logistique', 'Romandie Santé', 'Léman Immobilier', 'Jura Énergie'];
const statuses = ['Brouillon', 'Envoyé', 'Accepté', 'Refusé'];
const subjects = ['Refonte site web', 'Maintenance annuelle', 'Audit sécurité', 'Migration cloud', 'Formation équipe', 'Application mobile'];

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
function useQuotes(query: Query) {
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchQuotes>>>();
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    let active = true;
    setIsPending(true);
    fetchQuotes(query).then((res) => {
      if (!active) return;
      setData(res);
      setIsPending(false);
    });
    return () => {
      active = false;
    };
  }, [query.search, query.ordering, query.skip, query.limit]); // eslint-disable-line react-hooks/exhaustive-deps
  return { data, isPending };
}

const statusVariant: Record<string, BadgeProps['variant']> = {
  Brouillon: 'neutral',
  Envoyé: 'info',
  Accepté: 'success',
  Refusé: 'danger',
};

const chf = (n: number) => n.toLocaleString('fr-CH', { style: 'currency', currency: 'CHF' });

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
            placeholder="Rechercher un devis ou un client…"
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
              <TableRow>
                <DataTableSortableHead field="title">Titre</DataTableSortableHead>
                <DataTableSortableHead field="client">Client</DataTableSortableHead>
                <DataTableSortableHead field="date">Date</DataTableSortableHead>
                <DataTableSortableHead field="total" align="right">
                  Total TTC
                </DataTableSortableHead>
                <DataTableSortableHead field="status">Statut</DataTableSortableHead>
                <TableHead className="hx:w-12">
                  <span className="hx:sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </DataTableHeader>
            <DataTableBody
              colSpan={6}
              isPending={isPending}
              isEmpty={quotes.length === 0}
              emptyText={`Aucun devis ne correspond à « ${debouncedSearch} ».`}
            >
              {quotes.map((q) => (
                <TableRow key={q.id} onClick={() => console.log('Ouvrir le devis', q.id)}>
                  <TableCell className="hx:font-medium">{q.title}</TableCell>
                  <TableCell>{q.client}</TableCell>
                  <TableCell>{new Date(q.date).toLocaleDateString('fr-CH')}</TableCell>
                  <TableCell align="right">{chf(q.total)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[q.status]}>{q.status}</Badge>
                  </TableCell>
                  <TableCell className="hx:px-2 hx:py-1" onClick={(e) => e.stopPropagation()}>
                    <Menu>
                      <MenuTrigger
                        render={<Button variant="ghost" size="icon" className="hx:size-8" />}
                        aria-label={`Actions pour ${q.title}`}
                      >
                        <Ellipsis />
                      </MenuTrigger>
                      <MenuContent align="end">
                        <MenuItem>
                          <Pencil /> Modifier
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem variant="danger">
                          <Trash2 /> Supprimer
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  </TableCell>
                </TableRow>
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
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Client</TableHead>
            <TableHead align="right">Total TTC</TableHead>
          </TableRow>
        </DataTableHeader>
        <DataTableBody colSpan={3} isPending />
      </DataTable>
    </Panel>
  ),
};
