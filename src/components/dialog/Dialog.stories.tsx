import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="secondary" />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive the project?</DialogTitle>
          <DialogDescription>
            The project will be hidden from the main list. You can restore it from the archive at any time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Archive</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="danger" />}>Delete account</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete permanently?</DialogTitle>
          <DialogDescription>This action cannot be undone. All related data will be lost.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <DialogClose render={<Button variant="danger" />}>Delete</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

const invoices = Array.from({ length: 14 }, (_, i) => ({
  id: `F-2026-${String(1042 + i).padStart(4, '0')}`,
  client: ['Banque Cantonale', 'Helvetia Services', 'Alpina Logistique', 'Romandie Santé', 'Léman Immobilier'][i % 5],
  date: `${String((i % 28) + 1).padStart(2, '0')}.09.2026`,
  amount: (1830 + i * 947.35).toLocaleString('en-CH', { style: 'currency', currency: 'CHF' }),
  status: ['Paid', 'Pending', 'Overdue'][i % 3],
}));

/** Worst case for readability: a semi-transparent dialog over dense, high-contrast data. */
export const OverDenseContent: Story = {
  tags: ['!autodocs'],
  render: (args) => (
    <>
      <Panel>
        <table className="hx:w-full hx:border-collapse hx:text-left hx:text-sm hx:tabular-nums">
          <thead className="hx:text-fg-muted">
            <tr>
              {['No.', 'Client', 'Date', 'Amount', 'Status'].map((h) => (
                <th key={h} className="hx:px-4 hx:py-3 hx:font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((row) => (
              <tr key={row.id} className="hx:border-t hx:border-glass-border">
                <td className="hx:px-4 hx:py-2.5 hx:font-medium">{row.id}</td>
                <td className="hx:px-4 hx:py-2.5">{row.client}</td>
                <td className="hx:px-4 hx:py-2.5">{row.date}</td>
                <td className="hx:px-4 hx:py-2.5">{row.amount}</td>
                <td className="hx:px-4 hx:py-2.5">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <Dialog defaultOpen {...args}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send reminders for 5 overdue invoices?</DialogTitle>
            <DialogDescription>
              A reminder email will be sent to each client concerned, with the invoice attached. The total amount
              outstanding is CHF 18,452.90.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
            <DialogClose render={<Button />}>Send reminders</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  ),
};
