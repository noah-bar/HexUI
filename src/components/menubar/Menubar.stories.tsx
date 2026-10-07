import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './Menubar';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
  parameters: { docs: { story: { inline: false, iframeHeight: 420 } } },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Menu bar of an invoice editor. Arrow keys move between menus; once a menu is open,
 * hovering another trigger opens it.
 */
export const Default: Story = {
  render: function DefaultStory() {
    const [showVat, setShowVat] = useState(true);
    const [showNotes, setShowNotes] = useState(false);
    const [currency, setCurrency] = useState('CHF');

    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Fichier</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Nouvelle facture <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Dupliquer <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Exporter</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>PDF</MenubarItem>
                <MenubarItem>QR-facture</MenubarItem>
                <MenubarItem>Excel (CSV)</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem>
              Imprimer <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="danger">Supprimer la facture</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Édition</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Annuler <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Rétablir <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Ajouter une ligne</MenubarItem>
            <MenubarItem>Ajouter un rabais</MenubarItem>
            <MenubarItem disabled>Ajouter un acompte</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Affichage</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={showVat} onCheckedChange={setShowVat}>
              Afficher la TVA
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showNotes} onCheckedChange={setShowNotes}>
              Afficher les notes internes
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>Devise</MenubarLabel>
              <MenubarRadioGroup value={currency} onValueChange={setCurrency}>
                <MenubarRadioItem value="CHF">Franc suisse (CHF)</MenubarRadioItem>
                <MenubarRadioItem value="EUR">Euro (EUR)</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Aide</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Raccourcis clavier</MenubarItem>
            <MenubarItem>Guide de la QR-facture</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};
