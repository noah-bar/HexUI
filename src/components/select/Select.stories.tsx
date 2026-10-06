import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Select, SelectContent, SelectGroup, SelectGroupLabel, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from './Select';

const roles = [
  { label: 'Administrateur', value: 'admin' },
  { label: 'Éditeur', value: 'editor' },
  { label: 'Lecteur', value: 'viewer' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  // Selects live inside glass surfaces in real screens, so they are shown in a Panel.
  decorators: [
    (Story) => (
      <Panel padding="md" className="hx:max-w-xs">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select items={roles}>
      <SelectTrigger aria-label="Rôle">
        <SelectValue placeholder="Choisir un rôle" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Select defaultValue="paris">
      <SelectTrigger aria-label="Bureau">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectGroupLabel>France</SelectGroupLabel>
          <SelectItem value="paris">Paris</SelectItem>
          <SelectItem value="lyon">Lyon</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Suisse</SelectGroupLabel>
          <SelectItem value="geneve">Genève</SelectItem>
          <SelectItem value="lausanne" disabled>
            Lausanne (bientôt)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Select items={roles}>
      <SelectTrigger aria-label="Rôle" aria-invalid>
        <SelectValue placeholder="Choisir un rôle" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger aria-label="Rôle">
        <SelectValue placeholder="Indisponible" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="x">—</SelectItem>
      </SelectContent>
    </Select>
  ),
};
