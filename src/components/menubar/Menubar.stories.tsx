import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Panel } from '../panel/Panel';
import { Separator } from '../separator/Separator';
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
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'ghost'] },
  },
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Menu bar of an invoice editor. Arrow keys move between menus; once a menu is open,
 * hovering another trigger opens it.
 */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [showVat, setShowVat] = useState(true);
    const [showNotes, setShowNotes] = useState(false);
    const [currency, setCurrency] = useState('CHF');

    return (
      <Menubar {...args}>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New invoice <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Duplicate <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Export</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>PDF</MenubarItem>
                <MenubarItem>QR-bill</MenubarItem>
                <MenubarItem>Excel (CSV)</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem>
              Print <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem variant="danger">Delete invoice</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Add a line</MenubarItem>
            <MenubarItem>Add a discount</MenubarItem>
            <MenubarItem disabled>Add a deposit</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={showVat} onCheckedChange={setShowVat}>
              Show VAT
            </MenubarCheckboxItem>
            <MenubarCheckboxItem checked={showNotes} onCheckedChange={setShowNotes}>
              Show internal notes
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>Currency</MenubarLabel>
              <MenubarRadioGroup value={currency} onValueChange={setCurrency}>
                <MenubarRadioItem value="CHF">Swiss franc (CHF)</MenubarRadioItem>
                <MenubarRadioItem value="EUR">Euro (EUR)</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Keyboard shortcuts</MenubarItem>
            <MenubarItem>QR-bill guide</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  },
};

/** `variant="ghost"`: no glass strip of its own, for a menu bar inside a surface that is already glass (page header). */
export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args, context) => (
    <Panel variant="thin" className="hx:flex hx:h-12 hx:w-fit hx:items-center hx:gap-3 hx:px-3">
      <span className="hx:text-sm hx:font-medium">F-2026-1045</span>
      <Separator orientation="vertical" className="hx:h-5" />
      {Default.render!(args, context)}
    </Panel>
  ),
};
