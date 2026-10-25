import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateRange } from '../../lib/date';
import { Panel } from '../panel/Panel';
import { Calendar } from './Calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Arrow keys move by day and week, Page Up and Page Down by month (with Shift, by year), Home and End to the week's ends. */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>('2026-10-25');
    return (
      <Panel className="hx:inline-flex hx:flex-col hx:gap-3 hx:p-3">
        <Calendar value={value} onValueChange={setValue} locale="fr-CH" />
        <p className="hx:m-0 hx:text-xs hx:text-fg-muted">Value: {value ?? '—'}</p>
      </Panel>
    );
  },
};

export const Range: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange>({ start: '2026-10-12', end: '2026-10-21' });
    return (
      <Panel className="hx:inline-flex hx:flex-col hx:gap-3 hx:p-3">
        <Calendar
          mode="range"
          value={value}
          onValueChange={setValue}
          numberOfMonths={2}
          locale="fr-CH"
          min="2026-10-05"
          isDateDisabled={(date) => [0, 6].includes(new Date(date).getUTCDay())}
        />
        <p className="hx:m-0 hx:text-xs hx:text-fg-muted">
          Value: {value.start ?? '—'} → {value.end ?? '—'}
        </p>
      </Panel>
    );
  },
};
