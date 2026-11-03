import type { Meta, StoryObj } from '@storybook/react-vite';
import { Inbox, Plus } from 'lucide-react';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Inbox />,
    title: 'No quotes yet',
    description: 'Create your first quote to send it to a client.',
    action: <Button startIcon={<Plus />}>New quote</Button>,
  },
  render: (args) => (
    <Panel className="hx:max-w-xl">
      <EmptyState {...args} />
    </Panel>
  ),
};

export const TitleOnly: Story = {
  args: { title: 'No results' },
};
