import { Field as BaseField } from '@base-ui/react/field';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { InputNumber } from './InputNumber';

const meta = {
  title: 'Components/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="hx:max-w-md hx:rounded-xs hx:bg-surface hx:p-6 hx:shadow-card">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Label above, hint below: a stand-in until the Field component exists. */
function FormField({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="hx:flex hx:flex-col hx:gap-1 hx:text-sm">
      <label className="hx:flex hx:flex-col hx:gap-1">
        <span className="hx:font-semibold">{label}</span>
        {children}
      </label>
      {hint && <span className="hx:text-xs hx:text-fg-muted">{hint}</span>}
    </div>
  );
}

/** Left-aligned field without steppers, which is the default presentation. */
export const Default: Story = {
  render: () => (
    <FormField label="Quantity">
      <InputNumber defaultValue={3} min={1} max={999} />
    </FormField>
  ),
};

/** `showSteppers` adds − and + buttons on each side. */
export const Steppers: Story = {
  render: () => (
    <FormField label="Inspection interval (months)" hint="Between 6 and 60, by steps of 6.">
      <InputNumber defaultValue={12} min={6} max={60} step={6} showSteppers />
    </FormField>
  ),
};

/** `decimalPlaces` controls the fixed number of digits after the decimal separator. */
export const Decimals: Story = {
  render: () => (
    <FormField label="Weight" hint="Shown with two decimal places.">
      <InputNumber defaultValue={12.5} min={0} step={0.01} decimalPlaces={2} locale="en-CH" />
    </FormField>
  ),
};

/** A required field restores `0` when the user clears it and moves focus away. */
export const Required: Story = {
  render: () => (
    <FormField label="Quantity" hint="Clear the value and leave the field: it goes back to zero.">
      <InputNumber required />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Quantity' });
    await expect(input).toHaveValue('0');
    await userEvent.clear(input);
    await expect(input).toHaveValue('');
    await userEvent.tab();
    await expect(input).toHaveValue('0');
  },
};

/** `format` and `locale` display the value as an amount; typing "1250.5" is understood. */
export const Currency: Story = {
  render: () => (
    <FormField label="Unit price" hint="Excluding VAT.">
      <InputNumber
        defaultValue={140}
        min={0}
        step={5}
        align="right"
        locale="en-CH"
        format={{ style: 'currency', currency: 'CHF' }}
      />
    </FormField>
  ),
};

/** An invoice line: hours, rate and discount side by side. In narrow columns, keep the steppers for the main value only. */
export const InvoiceLine: Story = {
  render: () => (
    <div className="hx:grid hx:grid-cols-[1.3fr_1.4fr_1fr] hx:gap-3">
      <FormField label="Hours">
        <InputNumber defaultValue={32} min={0} step={0.5} decimalPlaces={1} showSteppers locale="en-CH" />
      </FormField>
      <FormField label="Hourly rate">
        <InputNumber
          defaultValue={140}
          min={0}
          align="right"
          locale="en-CH"
          format={{ style: 'currency', currency: 'CHF' }}
        />
      </FormField>
      <FormField label="Discount">
        <InputNumber
          defaultValue={0.1}
          min={0}
          max={1}
          step={0.05}
          align="right"
          locale="en-CH"
          format={{ style: 'percent' }}
        />
      </FormField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <BaseField.Root invalid>
      <FormField label="Quantity">
        <InputNumber defaultValue={0} showSteppers />
      </FormField>
      <span className="hx:text-xs hx:text-danger-text">The quantity must be at least 1.</span>
    </BaseField.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <FormField label="Quantity">
      <InputNumber defaultValue={12} showSteppers disabled />
    </FormField>
  ),
};
