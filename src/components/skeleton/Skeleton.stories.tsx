import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel padding="lg" className="hx:max-w-md">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: 'hx:w-48' },
};

/** Text lines of varying width: a loading paragraph. */
export const Text: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-2.5">
      <Skeleton className="hx:h-5 hx:w-1/2" />
      <Skeleton className="hx:w-full" />
      <Skeleton className="hx:w-full" />
      <Skeleton className="hx:w-3/4" />
    </div>
  ),
};

/** A loading contact card: avatar, name, details and actions. */
export const Card: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-5">
      <div className="hx:flex hx:items-center hx:gap-3">
        <Skeleton className="hx:size-10 hx:rounded-full" />
        <div className="hx:flex hx:flex-1 hx:flex-col hx:gap-2">
          <Skeleton className="hx:w-36" />
          <Skeleton className="hx:h-3 hx:w-24" />
        </div>
      </div>
      <div className="hx:flex hx:flex-col hx:gap-2">
        <Skeleton className="hx:w-full" />
        <Skeleton className="hx:w-5/6" />
      </div>
      <div className="hx:flex hx:justify-end hx:gap-2">
        <Skeleton className="hx:h-9 hx:w-20 hx:rounded-md" />
        <Skeleton className="hx:h-9 hx:w-24 hx:rounded-md" />
      </div>
    </div>
  ),
};

/** Loading form: labels and fields. */
export const Form: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="hx:flex hx:flex-col hx:gap-2">
          <Skeleton className="hx:h-3.5 hx:w-28" />
          <Skeleton className="hx:h-9 hx:w-full hx:rounded-md" />
        </div>
      ))}
    </div>
  ),
};
