import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Radio, RadioGroup } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel className="hx:w-fit hx:p-5 hx:text-sm hx:text-fg">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const plans = [
  { value: 'monthly', label: 'Monthly', hint: 'CHF 29 / month' },
  { value: 'yearly', label: 'Yearly', hint: 'CHF 290 / year, 2 months free' },
  { value: 'enterprise', label: 'Enterprise', hint: 'On quote', disabled: true },
];

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="yearly" aria-label="Plan" {...args}>
      {plans.map((plan) => (
        <label key={plan.value} className="hx:flex hx:items-start hx:gap-2.5 hx:has-data-disabled:opacity-50">
          <Radio value={plan.value} disabled={plan.disabled} className="hx:mt-0.5" />
          <span className="hx:flex hx:flex-col">
            <span className="hx:font-medium">{plan.label}</span>
            <span className="hx:text-xs hx:text-fg-muted">{plan.hint}</span>
          </span>
        </label>
      ))}
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup defaultValue="week" aria-label="Period" className="hx:flex-row hx:gap-5" {...args}>
      {['Day', 'Week', 'Month'].map((label, i) => (
        <label key={label} className="hx:flex hx:items-center hx:gap-2">
          <Radio value={['day', 'week', 'month'][i]} />
          {label}
        </label>
      ))}
    </RadioGroup>
  ),
};
