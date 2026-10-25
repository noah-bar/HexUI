import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import { Stepper, StepperItem } from './Stepper';

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { value: 'draft', title: 'Draft', description: 'Created on 12.10' },
  { value: 'sent', title: 'Sent', description: 'To the client on 14.10' },
  { value: 'accepted', title: 'Accepted', description: 'Order received' },
  { value: 'completed', title: 'Completed', description: 'Invoiced' },
];

export const Default: Story = {
  args: { value: 'sent' },
  render: (args) => (
    <Panel className="hx:max-w-3xl hx:p-4">
      <Stepper {...args} aria-label="Quote progress">
        {steps.map((step) => (
          <StepperItem key={step.value} {...step} />
        ))}
      </Stepper>
    </Panel>
  ),
};

export const Interactive: Story = {
  args: { value: 'draft' },
  render: () => {
    const [value, setValue] = useState<string | number>('draft');
    const index = steps.findIndex((step) => step.value === value);
    const done = index === steps.length;
    return (
      <Panel className="hx:flex hx:max-w-3xl hx:flex-col hx:gap-4 hx:p-4">
        <Stepper value={value} onValueChange={setValue} complete={done} aria-label="Quote progress">
          {steps.map((step) => (
            <StepperItem key={step.value} {...step} />
          ))}
        </Stepper>
        <div className="hx:flex hx:gap-2">
          <Button
            variant="secondary"
            disabled={index <= 0}
            onClick={() => setValue(steps[Math.max(0, index - 1)].value)}
          >
            Previous step
          </Button>
          <Button disabled={done} onClick={() => setValue(steps[index + 1]?.value ?? 'done')}>
            Next step
          </Button>
        </div>
      </Panel>
    );
  },
};

export const Vertical: Story = {
  args: { value: 'accepted' },
  render: (args) => (
    <Panel className="hx:max-w-sm hx:p-4">
      <Stepper {...args} orientation="vertical" aria-label="Order progress">
        <StepperItem value="draft" title="Draft" description="Created on 12.10" />
        <StepperItem value="sent" title="Sent" description="To the client on 14.10" />
        <StepperItem value="accepted" title="Payment" description="The card was declined" status="error" />
        <StepperItem value="completed" title="Completed" />
      </Stepper>
    </Panel>
  ),
};
