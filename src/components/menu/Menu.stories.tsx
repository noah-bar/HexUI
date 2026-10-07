import type { Meta, StoryObj } from '@storybook/react-vite';
import { Archive, Copy, Download, Ellipsis, Mail, Pencil, Trash2, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Badge, type BadgeProps } from '../badge/Badge';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from './Menu';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: { defaultOpen: { control: 'boolean' } },
  decorators: [(Story) => <div className="hx:min-h-96"><Story /></div>],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuTrigger render={<Button variant="secondary" />}>Actions</MenuTrigger>
      <MenuContent>
        <MenuItem>
          <Pencil /> Edit <MenuShortcut>⌘E</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <Copy /> Duplicate <MenuShortcut>⌘D</MenuShortcut>
        </MenuItem>
        <MenuItem>
          <Download /> Export as PDF
        </MenuItem>
        <MenuSub>
          <MenuSubTrigger>
            <UserPlus /> Share
          </MenuSubTrigger>
          <MenuSubContent>
            <MenuItem>
              <Mail /> By email
            </MenuItem>
            <MenuItem>
              <Copy /> Copy link
            </MenuItem>
          </MenuSubContent>
        </MenuSub>
        <MenuSeparator />
        <MenuItem disabled>
          <Archive /> Archive
        </MenuItem>
        <MenuItem variant="danger">
          <Trash2 /> Delete <MenuShortcut>⌫</MenuShortcut>
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const CheckboxAndRadio: Story = {
  render: function ViewOptionsStory() {
    const [columns, setColumns] = useState({ client: true, date: true, amount: true, owner: false });
    const [density, setDensity] = useState('comfortable');
    return (
      <Menu>
        <MenuTrigger render={<Button variant="secondary" />}>View</MenuTrigger>
        <MenuContent>
          <MenuGroup>
            <MenuGroupLabel>Columns</MenuGroupLabel>
            {(
              [
                ['client', 'Client'],
                ['date', 'Date'],
                ['amount', 'Amount'],
                ['owner', 'Owner'],
              ] as const
            ).map(([key, label]) => (
              <MenuCheckboxItem
                key={key}
                checked={columns[key]}
                onCheckedChange={(checked) => setColumns((c) => ({ ...c, [key]: checked }))}
                closeOnClick={false}
              >
                {label}
              </MenuCheckboxItem>
            ))}
          </MenuGroup>
          <MenuSeparator />
          <MenuGroup>
            <MenuGroupLabel>Density</MenuGroupLabel>
            <MenuRadioGroup value={density} onValueChange={setDensity}>
              <MenuRadioItem value="comfortable" closeOnClick={false}>
                Comfortable
              </MenuRadioItem>
              <MenuRadioItem value="compact" closeOnClick={false}>
                Compact
              </MenuRadioItem>
            </MenuRadioGroup>
          </MenuGroup>
        </MenuContent>
      </Menu>
    );
  },
};

const statusVariant: Record<string, BadgeProps['variant']> = {
  Paid: 'success',
  Sent: 'info',
  Pending: 'warning',
  Overdue: 'danger',
  Draft: 'neutral',
};

const invoices = [
  { id: 'F-2026-1042', client: 'Banque Cantonale', amount: 'CHF 12,480.00', status: 'Paid' },
  { id: 'F-2026-1043', client: 'Helvetia Services', amount: 'CHF 3,950.50', status: 'Sent' },
  { id: 'F-2026-1044', client: 'Alpina Logistique', amount: 'CHF 7,210.00', status: 'Pending' },
  { id: 'F-2026-1045', client: 'Romandie Santé', amount: 'CHF 18,452.90', status: 'Overdue' },
  { id: 'F-2026-1046', client: 'Léman Immobilier', amount: 'CHF 1,200.00', status: 'Draft' },
];

/** Data table with status badges and a row actions menu: Badge + Menu working together. */
export const RowActions: Story = {
  render: () => (
    <Panel className="hx:max-w-3xl">
      <table className="hx:w-full hx:border-collapse hx:text-left hx:text-sm hx:tabular-nums">
        <thead className="hx:text-fg-muted">
          <tr>
            {['No.', 'Client', 'Amount', 'Status', ''].map((h, i) => (
              <th key={i} className="hx:px-4 hx:py-3 hx:font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((row) => (
            <tr key={row.id} className="hx:border-t hx:border-glass-border hx:transition-colors hx:hover:bg-tint-hover">
              <td className="hx:px-4 hx:py-2 hx:font-medium">{row.id}</td>
              <td className="hx:px-4 hx:py-2">{row.client}</td>
              <td className="hx:px-4 hx:py-2">{row.amount}</td>
              <td className="hx:px-4 hx:py-2">
                <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
              </td>
              <td className="hx:w-12 hx:px-2 hx:py-2 hx:text-right">
                <Menu>
                  <MenuTrigger
                    render={<Button variant="ghost" size="icon" className="hx:size-8" />}
                    aria-label={`Actions for ${row.id}`}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  ),
};
