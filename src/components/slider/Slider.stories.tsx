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
    label: 'Rabais',
    showValue: true,
    defaultValue: 10,
    max: 50,
    format: { style: 'unit', unit: 'percent' },
    locale: 'fr-CH',
  },
};

/** An array value gives a range with two thumbs; name each one with `thumbLabels`. */
export const Range: Story = {
  args: {
    label: 'Montant des factures',
    showValue: true,
    defaultValue: [1000, 8000],
    min: 0,
    max: 20000,
    step: 500,
    minStepsBetweenValues: 2,
    format: { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 },
    locale: 'fr-CH',
    thumbLabels: ['Montant minimum', 'Montant maximum'],
  },
};

export const Steps: Story = {
  args: {
    label: 'Délai de paiement',
    showValue: true,
    defaultValue: 30,
    min: 0,
    max: 90,
    step: 15,
    format: { style: 'unit', unit: 'day', unitDisplay: 'long' },
    locale: 'fr-CH',
  },
};

export const Vertical: Story = {
  args: { orientation: 'vertical', defaultValue: 60, 'aria-label': 'Volume des notifications' },
};

export const Disabled: Story = {
  args: { label: 'Rabais', showValue: true, defaultValue: 20, disabled: true },
};
