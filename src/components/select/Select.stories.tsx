import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Select, SelectContent, SelectGroup, SelectGroupLabel, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from './Select';

const roles = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  // Selects live inside glass surfaces in real screens, so they are shown in a Panel.
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-xs hx:p-5">
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
      <SelectTrigger aria-label="Role">
        <SelectValue placeholder="Choose a role" />
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
      <SelectTrigger aria-label="Office">
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
          <SelectGroupLabel>Switzerland</SelectGroupLabel>
          <SelectItem value="geneve">Geneva</SelectItem>
          <SelectItem value="lausanne" disabled>
            Lausanne (coming soon)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Select items={roles}>
      <SelectTrigger aria-label="Role" aria-invalid>
        <SelectValue placeholder="Choose a role" />
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
      <SelectTrigger aria-label="Role">
        <SelectValue placeholder="Unavailable" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="x">—</SelectItem>
      </SelectContent>
    </Select>
  ),
};
