import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'nom@entreprise.com' },
  // Inputs live inside glass surfaces in real screens, so they are shown in a Panel.
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-sm hx:p-5">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <label className="hx:flex hx:flex-col hx:gap-1.5 hx:text-sm hx:font-medium hx:text-fg">
      Adresse e-mail
      <Input {...args} type="email" />
    </label>
  ),
};

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'adresse-invalide' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
