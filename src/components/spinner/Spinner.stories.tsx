import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: { label: 'Loading' },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['current', 'muted', 'accent'] },
  },
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Alone on screen, give it a `label` so screen readers announce the loading. */
export const Default: Story = {
  args: { size: 'md', tone: 'accent' },
};

export const SizesAndTones: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-4">
      <div className="hx:flex hx:items-center hx:gap-4">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
      <div className="hx:flex hx:items-center hx:gap-4">
        <Spinner size="md" tone="current" />
        <Spinner size="md" tone="muted" />
        <Spinner size="md" tone="accent" />
      </div>
    </div>
  ),
};

/** Inside a button or a badge it takes the text color; the visible label already says what happens. */
export const InContext: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button disabled>
        <Spinner /> Saving…
      </Button>
      <Button variant="secondary" disabled>
        <Spinner /> Generating PDF…
      </Button>
      <Badge variant="info">
        <Spinner size="xs" /> Sending
      </Badge>
    </div>
  ),
};

/** Loading state of a panel. With a visible text, the container is the live region and the spinner stays silent. */
export const PanelLoading: Story = {
  render: () => (
    <div
      role="status"
      className="hx:flex hx:h-40 hx:flex-col hx:items-center hx:justify-center hx:gap-3 hx:text-sm hx:text-fg-muted"
    >
      <Spinner size="lg" tone="accent" />
      Loading invoices…
    </div>
  ),
};
