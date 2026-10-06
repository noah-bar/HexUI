import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { 'aria-label': 'Activer' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithLabel: Story = {
  render: () => (
    <div className="hx:glass hx:flex hx:max-w-sm hx:flex-col hx:gap-4 hx:rounded-xl hx:p-5 hx:text-sm hx:text-fg">
      {['Notifications par e-mail', 'Rapport hebdomadaire', 'Authentification à deux facteurs'].map((label, i) => (
        <label key={label} className="hx:flex hx:items-center hx:justify-between hx:gap-4">
          {label}
          <Switch defaultChecked={i !== 1} />
        </label>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
};
