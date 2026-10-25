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
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    tone: { control: 'inline-radio', options: ['accent', 'muted', 'current'] },
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

/** Blue by default, as in Fluent. Alone on screen, give it a `label` so screen readers announce the loading. */
export const Default: Story = {};

export const SizesAndTones: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-4">
      <div className="hx:flex hx:items-center hx:gap-4">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
      <div className="hx:flex hx:items-center hx:gap-4">
        <Spinner tone="accent" />
        <Spinner tone="muted" />
        <Spinner tone="current" className="hx:text-danger-text" />
      </div>
    </div>
  ),
};

/**
 * With `tone="current"` it takes the text color, as in a badge; the visible text already says what happens.
 * For a button, use its `loading` prop.
 */
export const InContext: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button loading>Saving…</Button>
      <Button variant="secondary" loading>
        Generating PDF…
      </Button>
      <Badge variant="info">
        <Spinner size="xs" tone="current" /> Sending
      </Badge>
      <span className="hx:inline-flex hx:items-center hx:gap-2 hx:text-sm hx:text-fg-muted">
        <Spinner size="sm" /> Checking availability…
      </span>
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
      <Spinner size="lg" />
      Loading invoices…
    </div>
  ),
};
