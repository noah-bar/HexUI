import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
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
      <DialogTrigger render={<Button variant="secondary" />}>Ouvrir la boîte de dialogue</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archiver le projet ?</DialogTitle>
          <DialogDescription>
            Le projet sera masqué de la liste principale. Vous pourrez le restaurer à tout moment depuis les archives.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Annuler</DialogClose>
          <DialogClose render={<Button />}>Archiver</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button variant="danger" />}>Supprimer le compte</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer définitivement ?</DialogTitle>
          <DialogDescription>Cette action est irréversible. Toutes les données associées seront perdues.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Annuler</DialogClose>
          <DialogClose render={<Button variant="danger" />}>Supprimer</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

const invoices = Array.from({ length: 14 }, (_, i) => ({
  id: `F-2026-${String(1042 + i).padStart(4, '0')}`,
  client: ['Banque Cantonale', 'Helvetia Services', 'Alpina Logistique', 'Romandie Santé', 'Léman Immobilier'][i % 5],
  date: `${String((i % 28) + 1).padStart(2, '0')}.09.2026`,
  amount: (1830 + i * 947.35).toLocaleString('fr-CH', { style: 'currency', currency: 'CHF' }),
  status: ['Payée', 'En attente', 'En retard'][i % 3],
}));

/** Worst case for readability: a semi-transparent dialog over dense, high-contrast data. */
export const OverDenseContent: Story = {
  tags: ['!autodocs'],
  render: (args) => (
    <>
      <div className="hx:glass hx:overflow-hidden hx:rounded-2xl">
        <table className="hx:w-full hx:text-left hx:text-sm hx:tabular-nums">
          <thead className="hx:text-fg-muted">
            <tr>
              {['N°', 'Client', 'Date', 'Montant', 'Statut'].map((h) => (
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
      </div>
      <Dialog defaultOpen {...args}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Relancer 5 factures en retard ?</DialogTitle>
            <DialogDescription>
              Un e-mail de rappel sera envoyé à chaque client concerné, avec la facture en pièce jointe. Le montant total
              en souffrance est de CHF 18 452,90.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>Annuler</DialogClose>
            <DialogClose render={<Button />}>Envoyer les rappels</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  ),
};
