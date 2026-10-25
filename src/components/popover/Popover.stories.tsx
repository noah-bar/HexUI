import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, ListFilter } from 'lucide-react';
import { Button } from '../button/Button';
import { Field, FieldLabel } from '../field/Field';
import { InputNumber } from '../input-number/InputNumber';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/Select';
import { Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from './Popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: { defaultOpen: { control: 'boolean' } },
  decorators: [
    (Story) => (
      <div className="hx:min-h-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const statuses = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Sent', value: 'sent' },
  { label: 'Overdue', value: 'overdue' },
];

/** A filter panel: the typical business use. */
export const Filters: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="secondary" />}>
        <ListFilter /> Filters
      </PopoverTrigger>
      <PopoverContent align="start" className="hx:w-80 hx:gap-4">
        <PopoverTitle>Filter invoices</PopoverTitle>
        <Field>
          <FieldLabel>Status</FieldLabel>
          <Select items={statuses} defaultValue="overdue">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>Minimum amount (CHF)</FieldLabel>
          <InputNumber min={0} step={100} placeholder="0" />
        </Field>
        <div className="hx:flex hx:justify-end hx:gap-2">
          <PopoverClose render={<Button variant="secondary" size="sm" />}>Reset</PopoverClose>
          <PopoverClose render={<Button size="sm" />}>Apply</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/** Extra details next to a value, without leaving the page. */
export const Details: Story = {
  render: (args) => (
    <div className="hx:flex hx:items-center hx:gap-2 hx:text-sm hx:text-fg">
      Romandie Santé
      <Popover {...args}>
        <PopoverTrigger render={<Button variant="ghost" size="icon" />} aria-label="Client details">
          <Info />
        </PopoverTrigger>
        <PopoverContent side="right" align="start">
          <div className="hx:flex hx:items-center hx:justify-between hx:gap-2">
            <PopoverTitle>Romandie Santé SA</PopoverTitle>
            <span className="hx:text-xs hx:font-semibold hx:text-danger-text">Overdue</span>
          </div>
          <PopoverDescription>Client since 2021 · 14 invoices · Contact: Léa Rochat</PopoverDescription>
          <dl className="hx:grid hx:grid-cols-2 hx:gap-x-4 hx:gap-y-1 hx:text-sm">
            <dt className="hx:text-fg-muted">Outstanding</dt>
            <dd className="hx:text-right hx:tabular-nums">CHF 18,452.90</dd>
            <dt className="hx:text-fg-muted">Average delay</dt>
            <dd className="hx:text-right hx:tabular-nums">38 days</dd>
          </dl>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
