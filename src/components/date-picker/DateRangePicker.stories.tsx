import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateRange } from '../../lib/date';
import { Field, FieldDescription, FieldLabel } from '../field/Field';
import { DateRangePicker, type DateRangePreset } from './DateRangePicker';

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const presets: DateRangePreset[] = [
  { label: 'Aujourd’hui', value: { start: '2026-10-25', end: '2026-10-25' } },
  { label: '7 derniers jours', value: { start: '2026-10-19', end: '2026-10-25' } },
  { label: '30 derniers jours', value: { start: '2026-09-26', end: '2026-10-25' } },
  { label: 'Ce mois', value: { start: '2026-10-01', end: '2026-10-31' } },
  { label: 'Cette année', value: { start: '2026-01-01', end: '2026-12-31' } },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({ start: '2026-10-01', end: '2026-10-31' });
    return (
      <div className="hx:w-72">
        <Field>
          <FieldLabel>Period</FieldLabel>
          <DateRangePicker
            value={value}
            onValueChange={setValue}
            presets={presets}
            locale="fr-CH"
            startPlaceholder="Du"
            endPlaceholder="Au"
            startLabel="Date de début"
            endLabel="Date de fin"
            clearable
          />
          <FieldDescription>
            {value.start ?? '—'} → {value.end ?? '—'}
          </FieldDescription>
        </Field>
      </div>
    );
  },
};

export const WithoutPresets: Story = {
  render: () => (
    <div className="hx:w-72">
      <Field>
        <FieldLabel>Holidays</FieldLabel>
        <DateRangePicker locale="fr-CH" startPlaceholder="Du" endPlaceholder="Au" min="2026-10-25" />
      </Field>
    </div>
  ),
};
