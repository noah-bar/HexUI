import type { Meta, StoryObj } from '@storybook/react-vite';
import { Copy, Download, Pencil, Trash2 } from 'lucide-react';
import { Panel } from '../panel/Panel';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table/Table';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './ContextMenu';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

function InvoiceMenu() {
  return (
    <ContextMenuContent>
      <ContextMenuItem>
        <Pencil /> Edit
      </ContextMenuItem>
      <ContextMenuItem>
        <Copy /> Duplicate
        <ContextMenuShortcut>⌘D</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <Download /> Download
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>PDF</ContextMenuItem>
          <ContextMenuItem>QR-bill</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuItem variant="danger">
        <Trash2 /> Delete
      </ContextMenuItem>
    </ContextMenuContent>
  );
}

/** Right-click (or long-press) in the area. */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="hx:flex hx:h-40 hx:max-w-md hx:items-center hx:justify-center hx:rounded-xs hx:border hx:border-dashed hx:border-border-strong hx:text-sm hx:text-fg-muted">
        Right-click here
      </ContextMenuTrigger>
      <InvoiceMenu />
    </ContextMenu>
  ),
};

const invoices = [
  { id: 'F-2026-1042', client: 'Banque Cantonale du Léman', total: '1,830.00' },
  { id: 'F-2026-1043', client: 'Helvetia Services SA', total: '2,777.35' },
  { id: 'F-2026-1044', client: 'Alpina Logistique SA', total: '3,724.70' },
];

/** On the rows of a table: each row is a trigger. Keep the same actions reachable by a visible button too. */
export const OnTableRows: Story = {
  render: () => (
    <Panel className="hx:max-w-2xl hx:p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead align="right">Total (CHF)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <ContextMenu key={invoice.id}>
              <ContextMenuTrigger render={<TableRow />}>
                <TableCell className="hx:font-semibold">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell align="right" className="hx:tabular-nums">
                  {invoice.total}
                </TableCell>
              </ContextMenuTrigger>
              <InvoiceMenu />
            </ContextMenu>
          ))}
        </TableBody>
      </Table>
    </Panel>
  ),
};
