import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleCheck, Clock, TriangleAlert } from 'lucide-react';
import { Panel } from '../panel/Panel';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Brouillon', variant: 'neutral' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
    dot: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <Panel padding="md" className="hx:w-fit">
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
      <Badge variant="neutral">Brouillon</Badge>
      <Badge variant="info">Envoyée</Badge>
      <Badge variant="success">Payée</Badge>
      <Badge variant="warning">En attente</Badge>
      <Badge variant="danger">En retard</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-2">
      <Badge variant="success" dot>
        En ligne
      </Badge>
      <Badge variant="warning" dot>
        Maintenance
      </Badge>
      <Badge variant="danger" dot>
        Hors ligne
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-2">
      <Badge variant="success">
        <CircleCheck /> Validé
      </Badge>
      <Badge variant="warning">
        <Clock /> À relire
      </Badge>
      <Badge variant="danger">
        <TriangleAlert /> Bloqué
      </Badge>
    </div>
  ),
};
