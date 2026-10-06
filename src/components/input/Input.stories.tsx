import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'nom@entreprise.com' },
  decorators: [(Story) => <div className="hx:max-w-sm">{Story()}</div>],
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
