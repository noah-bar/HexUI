import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field/Field';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type the date in the locale's order (25.10.2026, 25.10, 2510…) or open the calendar (also Alt + Arrow Down). */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('2026-10-25');
    return (
      <div className="hx:flex hx:w-64 hx:flex-col hx:gap-3">
        <Field>
          <FieldLabel>Quote date</FieldLabel>
          <DatePicker value={value} onValueChange={setValue} locale="fr-CH" placeholder="jj.mm.aaaa" clearable />
          <FieldDescription>The value is an ISO date: {value ?? '—'}</FieldDescription>
        </Field>
      </div>
    );
  },
};

export const MinAndMax: Story = {
  render: () => (
    <div className="hx:w-64">
      <Field>
        <FieldLabel>Delivery date</FieldLabel>
        <DatePicker defaultValue={null} min="2026-10-26" max="2026-12-23" locale="fr-CH" placeholder="jj.mm.aaaa" />
        <FieldDescription>Between 26.10 and 23.12.2026.</FieldDescription>
      </Field>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="hx:flex hx:w-64 hx:flex-col hx:gap-4">
      <Field invalid>
        <FieldLabel>Invalid</FieldLabel>
        <DatePicker defaultValue="2026-10-25" locale="fr-CH" aria-invalid />
        <FieldError match>The date is required.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>Disabled</FieldLabel>
        <DatePicker defaultValue="2026-10-25" locale="fr-CH" disabled />
      </Field>
      <Field>
        <FieldLabel>US format, week from Sunday</FieldLabel>
        <DatePicker defaultValue="2026-10-25" locale="en-US" weekStartsOn={0} />
      </Field>
    </div>
  ),
};
