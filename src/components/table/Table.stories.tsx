import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Ellipsis, Mail, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge, type BadgeProps } from '../badge/Badge';
import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '../menu/Menu';
import { Panel } from '../panel/Panel';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  type SortDirection,
} from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type Invoice = { id: string; client: string; date: string; amount: number; status: string };

const invoices: Invoice[] = [
  { id: 'F-2026-1042', client: 'Banque Cantonale', date: '2026-09-02', amount: 12480, status: 'Paid' },
  { id: 'F-2026-1043', client: 'Helvetia Services', date: '2026-09-05', amount: 3950.5, status: 'Sent' },
  { id: 'F-2026-1044', client: 'Alpina Logistique', date: '2026-09-11', amount: 7210, status: 'Pending' },
  { id: 'F-2026-1045', client: 'Romandie Santé', date: '2026-09-14', amount: 18452.9, status: 'Overdue' },
  { id: 'F-2026-1046', client: 'Léman Immobilier', date: '2026-09-20', amount: 1200, status: 'Draft' },
  { id: 'F-2026-1047', client: 'Jura Énergie', date: '2026-09-27', amount: 5640.25, status: 'Paid' },
];

const statusVariant: Record<string, BadgeProps['variant']> = {
  Paid: 'success',
  Sent: 'info',
  Pending: 'warning',
  Overdue: 'danger',
  Draft: 'neutral',
};

const chf = (n: number) => n.toLocaleString('en-CH', { style: 'currency', currency: 'CHF' });
const date = (iso: string) => new Date(iso).toLocaleDateString('en-CH');

export const Default: Story = {
  render: (args) => (
    <Panel className="hx:max-w-3xl">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead align="right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 4).map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="hx:font-medium">{inv.id}</TableCell>
              <TableCell>{inv.client}</TableCell>
              <TableCell>{date(inv.date)}</TableCell>
              <TableCell align="right">{chf(inv.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  ),
};

type SortKey = 'client' | 'date' | 'amount';

/** Sorting, row selection, status badges, row actions and a total: a typical business list. */
export const Complete: Story = {
  render: function CompleteStory(args) {
    const [sort, setSort] = useState<{ key: SortKey; dir: SortDirection }>({ key: 'date', dir: 'descending' });
    const [selected, setSelected] = useState<string[]>([]);

    const rows = useMemo(() => {
      const sorted = [...invoices].sort((a, b) => (a[sort.key] < b[sort.key] ? -1 : a[sort.key] > b[sort.key] ? 1 : 0));
      return sort.dir === 'descending' ? sorted.reverse() : sorted;
    }, [sort]);

    const dirFor = (key: SortKey): SortDirection => (sort.key === key ? sort.dir : 'none');
    const toggleSort = (key: SortKey) =>
      setSort((s) => ({ key, dir: s.key === key && s.dir === 'ascending' ? 'descending' : 'ascending' }));

    const all = selected.length === rows.length;
    const total = rows.reduce((sum, r) => sum + r.amount, 0);

    return (
      <Panel className="hx:max-w-4xl">
        <Table {...args}>
          <TableHeader>
            <TableRow>
              <TableHead className="hx:w-10 hx:pr-0">
                <Checkbox
                  aria-label="Select all"
                  checked={all}
                  indeterminate={selected.length > 0 && !all}
                  onCheckedChange={(checked) => setSelected(checked ? rows.map((r) => r.id) : [])}
                />
              </TableHead>
              <TableHead>No.</TableHead>
              <TableHead sortDirection={dirFor('client')} onSort={() => toggleSort('client')}>
                Client
              </TableHead>
              <TableHead sortDirection={dirFor('date')} onSort={() => toggleSort('date')}>
                Date
              </TableHead>
              <TableHead align="right" sortDirection={dirFor('amount')} onSort={() => toggleSort('amount')}>
                Amount
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hx:w-12">
                <span className="hx:sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((inv) => {
              const isSelected = selected.includes(inv.id);
              return (
                <TableRow key={inv.id} selected={isSelected}>
                  <TableCell className="hx:pr-0">
                    <Checkbox
                      aria-label={`Select ${inv.id}`}
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        setSelected((s) => (checked ? [...s, inv.id] : s.filter((id) => id !== inv.id)))
                      }
                    />
                  </TableCell>
                  <TableCell className="hx:font-medium">{inv.id}</TableCell>
                  <TableCell>{inv.client}</TableCell>
                  <TableCell>{date(inv.date)}</TableCell>
                  <TableCell align="right">{chf(inv.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[inv.status]}>{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="hx:px-2 hx:py-1">
                    <Menu>
                      <MenuTrigger
                        render={<Button variant="ghost" size="icon" className="hx:size-8" />}
                        aria-label={`Actions for ${inv.id}`}
                      >
                        <Ellipsis />
                      </MenuTrigger>
                      <MenuContent align="end">
                        <MenuItem>
                          <Pencil /> Edit
                        </MenuItem>
                        <MenuItem>
                          <Mail /> Send a reminder
                        </MenuItem>
                        <MenuItem>
                          <Download /> Download
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem variant="danger">
                          <Trash2 /> Delete
                        </MenuItem>
                      </MenuContent>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                {selected.length > 0 ? `${selected.length} invoice(s) selected` : `${rows.length} invoices`}
              </TableCell>
              <TableCell align="right">{chf(total)}</TableCell>
              <TableCell colSpan={2} />
            </TableRow>
          </TableFooter>
        </Table>
      </Panel>
    );
  },
};

/** `density="compact"` for dense back-office screens. */
export const Compact: Story = {
  args: { density: 'compact' },
  render: Default.render,
};

export const Empty: Story = {
  render: (args) => (
    <Panel className="hx:max-w-3xl">
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Client</TableHead>
            <TableHead align="right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableEmpty colSpan={3}>No invoice matches your filters.</TableEmpty>
        </TableBody>
      </Table>
    </Panel>
  ),
};

/** Wide tables scroll horizontally inside the Panel; the caption describes the data. */
export const WideWithCaption: Story = {
  render: (args) => (
    <Panel className="hx:max-w-xl">
      <Table {...args}>
        <TableCaption>Monthly revenue per client, in CHF.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m) => (
              <TableHead key={m} align="right">
                {m}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 4).map((inv, r) => (
            <TableRow key={inv.id}>
              <TableCell className="hx:font-medium hx:whitespace-nowrap">{inv.client}</TableCell>
              {Array.from({ length: 9 }, (_, i) => (
                <TableCell key={i} align="right">
                  {((r + 2) * 1137 + i * 412).toLocaleString('en-CH')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  ),
};
