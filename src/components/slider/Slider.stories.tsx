import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Discount',
    showValue: true,
    defaultValue: 10,
    max: 50,
    format: { style: 'unit', unit: 'percent' },
    locale: 'en-CH',
  },
};

/** An array value gives a range with two thumbs; name each one with `thumbLabels`. */
export const Range: Story = {
  args: {
    label: 'Invoice amount',
    showValue: true,
    defaultValue: [1000, 8000],
    min: 0,
    max: 20000,
    step: 500,
    minStepsBetweenValues: 2,
    format: { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 },
    locale: 'en-CH',
    thumbLabels: ['Minimum amount', 'Maximum amount'],
  },
};

export const Steps: Story = {
  args: {
    label: 'Payment terms',
    showValue: true,
    defaultValue: 30,
    min: 0,
    max: 90,
    step: 15,
    format: { style: 'unit', unit: 'day', unitDisplay: 'long' },
    locale: 'en-CH',
  },
};

export const Vertical: Story = {
  args: { orientation: 'vertical', defaultValue: 60, 'aria-label': 'Notification volume' },
};

export const Disabled: Story = {
  args: { label: 'Discount', showValue: true, defaultValue: 20, disabled: true },
};
