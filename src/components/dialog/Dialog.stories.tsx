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
