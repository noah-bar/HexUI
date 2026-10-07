import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Separator } from './Separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel padding="lg" className="hx:max-w-md">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-4 hx:text-sm">
      <div>
        <p className="hx:font-medium">Léman Immobilier SA</p>
        <p className="hx:text-fg-muted">Route de Genève 8, 1260 Nyon</p>
      </div>
      <Separator />
      <div className="hx:flex hx:justify-between">
        <span className="hx:text-fg-muted">Total TTC</span>
        <span className="hx:font-medium hx:tabular-nums">CHF 5 619.40</span>
      </div>
    </div>
  ),
};

/** In a flex row, the vertical separator takes the row's height. */
export const Vertical: Story = {
  render: () => (
    <div className="hx:flex hx:h-5 hx:items-center hx:gap-3 hx:text-sm">
      <span>Factures</span>
      <Separator orientation="vertical" />
      <span>Devis</span>
      <Separator orientation="vertical" />
      <span>Clients</span>
    </div>
  ),
};
