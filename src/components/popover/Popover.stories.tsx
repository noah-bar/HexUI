import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, ListFilter } from 'lucide-react';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Field, FieldLabel } from '../field/Field';
import { Input } from '../input/Input';
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

/** A filter panel: the typical business use. */
export const Filters: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="secondary" />}>
        <ListFilter /> Filters
      </PopoverTrigger>
      <PopoverContent align="start" className="hx:w-80 hx:gap-4">
        <PopoverTitle>Filter invoices</PopoverTitle>
        <div className="hx:flex hx:flex-col hx:gap-2.5">
          {['Paid', 'Sent', 'Pending', 'Overdue'].map((status, i) => (
            <label key={status} className="hx:flex hx:items-center hx:gap-2">
              <Checkbox defaultChecked={i > 1} />
              {status}
            </label>
          ))}
        </div>
        <Field>
          <FieldLabel>Minimum amount (CHF)</FieldLabel>
          <Input type="number" placeholder="0" />
        </Field>
        <div className="hx:flex hx:justify-end hx:gap-2">
          <PopoverClose render={<Button variant="ghost" size="sm" />}>Reset</PopoverClose>
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
        <PopoverTrigger
          render={<Button variant="ghost" size="icon" className="hx:size-7" />}
          aria-label="Client details"
        >
          <Info />
        </PopoverTrigger>
        <PopoverContent side="right" align="start">
          <div className="hx:flex hx:items-center hx:justify-between hx:gap-2">
            <PopoverTitle>Romandie Santé SA</PopoverTitle>
            <Badge variant="danger">Overdue</Badge>
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
