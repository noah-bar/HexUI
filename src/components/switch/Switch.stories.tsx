import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { 'aria-label': 'Enable' },
  // Switches live inside glass surfaces in real screens, so they are shown in a Panel.
  decorators: [
    (Story) => (
      <Panel className="hx:w-fit hx:min-w-20 hx:p-5 hx:text-sm hx:text-fg">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const WithLabel: Story = {
  render: () => (
    <div className="hx:flex hx:w-80 hx:flex-col hx:gap-4">
      {['Email notifications', 'Weekly report', 'Two-factor authentication'].map((label, i) => (
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
