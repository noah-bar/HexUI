import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronsUpDown, CreditCard, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: { docs: { story: { inline: false, iframeHeight: 420 } } },
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** User menu. Same parts as Menu, with shadcn/ui names. */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" />}>
        Camille Martin <ChevronsUpDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
          <DropdownMenuItem>
            <User /> Profil <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard /> Abonnement
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings /> Paramètres <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Espace de travail</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Hex-Tech Sàrl</DropdownMenuItem>
            <DropdownMenuItem>Atelier Favre</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger">
          <LogOut /> Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/** Checkbox and radio items keep the menu's state (here, the columns and order of a table). */
export const CheckboxesAndRadios: Story = {
  render: function CheckboxesStory() {
    const [columns, setColumns] = useState({ client: true, due: true, vat: false });
    const [order, setOrder] = useState('date');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="secondary" />}>Affichage</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Colonnes</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={columns.client} onCheckedChange={(v) => setColumns({ ...columns, client: v })}>
              Client
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={columns.due} onCheckedChange={(v) => setColumns({ ...columns, due: v })}>
              Échéance
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={columns.vat} onCheckedChange={(v) => setColumns({ ...columns, vat: v })}>
              TVA
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Trier par</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={order} onValueChange={setOrder}>
              <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="amount">Montant</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="client">Client</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
