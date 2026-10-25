import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleCheck, Clock, TriangleAlert } from 'lucide-react';
import { Panel } from '../panel/Panel';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Draft', variant: 'neutral' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
    dot: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <Panel className="hx:w-fit hx:p-5">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-2">
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="info">Sent</Badge>
      <Badge variant="success">Paid</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Overdue</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-2">
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="warning" dot>
        Maintenance
      </Badge>
      <Badge variant="danger" dot>
        Offline
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-2">
      <Badge variant="success">
        <CircleCheck /> Approved
      </Badge>
      <Badge variant="warning">
        <Clock /> To review
      </Badge>
      <Badge variant="danger">
        <TriangleAlert /> Blocked
      </Badge>
    </div>
  ),
};
