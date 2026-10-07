import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../input/Input';
import { Panel } from '../panel/Panel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/Select';
import { Field, FieldDescription, FieldError, FieldLabel, FieldRow } from './Field';

const meta = {
  title: 'Components/FieldRow',
  component: FieldRow,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldRow>;

export default meta;
type Story = StoryObj<typeof meta>;

const cantons = [
  { label: 'Geneva', value: 'GE' },
  { label: 'Vaud', value: 'VD' },
  { label: 'Valais', value: 'VS' },
  { label: 'Fribourg', value: 'FR' },
];

function AddressForm() {
  return (
    <div className="hx:flex hx:flex-col hx:gap-5">
      <FieldRow>
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input placeholder="Camille" />
        </Field>
        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input placeholder="Martin" />
        </Field>
      </FieldRow>
      <Field>
        <FieldLabel>Street and number</FieldLabel>
        <Input placeholder="Rue du Rhône 42" />
      </Field>
      <FieldRow columns="1fr 2fr 1.5fr">
        <Field>
          <FieldLabel>Postcode</FieldLabel>
          <Input placeholder="1204" inputMode="numeric" />
        </Field>
        <Field>
          <FieldLabel>City</FieldLabel>
          <Input placeholder="Geneva" />
        </Field>
        <Field>
          <FieldLabel>Canton</FieldLabel>
          <Select items={cantons}>
            <SelectTrigger className="hx:min-w-0">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              {cantons.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FieldRow>
    </div>
  );
}

/** Equal columns by default; `columns="1fr 2fr 1.5fr"` sizes the postcode / city / canton row. */
export const Default: Story = {
  render: () => (
    <Panel className="hx:max-w-2xl hx:p-6">
      <AddressForm />
    </Panel>
  ),
};

/** Only one field shows a hint or an error: labels and inputs stay aligned, only the messages differ. */
export const Alignment: Story = {
  render: () => (
    <Panel className="hx:max-w-2xl hx:p-6">
      <FieldRow>
        <Field invalid>
          <FieldLabel>Start date</FieldLabel>
          <Input type="date" defaultValue="2026-12-01" />
          <FieldError match>The start date must be before the end date.</FieldError>
        </Field>
        <Field>
          <FieldLabel>End date</FieldLabel>
          <Input type="date" defaultValue="2026-11-15" />
        </Field>
        <Field>
          <FieldLabel>Working days</FieldLabel>
          <Input defaultValue="—" disabled />
          <FieldDescription>Calculated automatically.</FieldDescription>
        </Field>
      </FieldRow>
    </Panel>
  ),
};

/**
 * The same form in a narrow container (a side panel, a dialog): rows stack because they measure
 * their own width, not the screen's.
 */
export const NarrowContainer: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-start hx:gap-6">
      <Panel className="hx:w-xl hx:p-6">
        <AddressForm />
      </Panel>
      <Panel className="hx:w-80 hx:p-6">
        <AddressForm />
      </Panel>
    </div>
  ),
};
