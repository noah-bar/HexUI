import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Panel } from '../panel/Panel';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { value: 45 },
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Exporting invoices', showValue: true, value: 45, locale: 'en-CH' },
};

/** The bar animates its width and turns green once complete. */
export const Running: Story = {
  render: function RunningStory() {
    const [value, setValue] = useState(10);
    useEffect(() => {
      const timer = setInterval(() => setValue((v) => (v >= 100 ? 10 : Math.min(100, v + 15))), 900);
      return () => clearInterval(timer);
    }, []);
    return <Progress label={value === 100 ? 'Sending complete' : 'Sending reminders'} showValue value={value} locale="en-CH" />;
  },
};

/** `value={null}`: unknown duration. */
export const Indeterminate: Story = {
  args: { label: 'Syncing with the bank', value: null },
};

/** Without a visible label, give it an `aria-label`. */
export const WithoutLabel: Story = {
  args: { value: 70, 'aria-label': 'Storage quota used' },
};

export const Complete: Story = {
  args: { label: 'Importing clients', showValue: true, value: 100, locale: 'en-CH' },
};
