import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText } from 'lucide-react';
import { Stat } from './Stat';

const meta = {
  title: 'Components/Stat',
  component: Stat,
  tags: ['autodocs'],
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Open quotes', value: '24', description: '+3 this week', icon: <FileText /> },
  render: (args) => (
    <div className="hx:max-w-64">
      <Stat {...args} />
    </div>
  ),
};

export const Row: Story = {
  args: { label: 'Open quotes', value: '24' },
  render: () => (
    <div className="hx:grid hx:max-w-3xl hx:grid-cols-3 hx:gap-3">
      <Stat label="Open quotes" value="24" description="+3 this week" />
      <Stat label="Invoiced" value="CHF 128’400" description="This year" />
      <Stat label="Accepted" value="68 %" description="Of the quotes sent" />
    </div>
  ),
};
