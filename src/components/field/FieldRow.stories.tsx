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
  { label: 'Genève', value: 'GE' },
  { label: 'Vaud', value: 'VD' },
  { label: 'Valais', value: 'VS' },
  { label: 'Fribourg', value: 'FR' },
];

function AddressForm() {
  return (
    <div className="hx:flex hx:flex-col hx:gap-5">
      <FieldRow>
        <Field>
          <FieldLabel>Prénom</FieldLabel>
          <Input placeholder="Camille" />
        </Field>
        <Field>
          <FieldLabel>Nom</FieldLabel>
          <Input placeholder="Martin" />
        </Field>
      </FieldRow>
      <Field>
        <FieldLabel>Rue et numéro</FieldLabel>
        <Input placeholder="Rue du Rhône 42" />
      </Field>
      <FieldRow columns="1fr 2fr 1.5fr">
        <Field>
          <FieldLabel>NPA</FieldLabel>
          <Input placeholder="1204" inputMode="numeric" />
        </Field>
        <Field>
          <FieldLabel>Localité</FieldLabel>
          <Input placeholder="Genève" />
        </Field>
        <Field>
          <FieldLabel>Canton</FieldLabel>
          <Select items={cantons}>
            <SelectTrigger className="hx:min-w-0">
              <SelectValue placeholder="Choisir" />
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
    <Panel padding="lg" className="hx:max-w-2xl">
      <AddressForm />
    </Panel>
  ),
};

/** Only one field shows a hint or an error: labels and inputs stay aligned, only the messages differ. */
export const Alignment: Story = {
  render: () => (
    <Panel padding="lg" className="hx:max-w-2xl">
      <FieldRow>
        <Field invalid>
          <FieldLabel>Date de début</FieldLabel>
          <Input type="date" defaultValue="2026-12-01" />
          <FieldError match>La date de début doit précéder la date de fin.</FieldError>
        </Field>
        <Field>
          <FieldLabel>Date de fin</FieldLabel>
          <Input type="date" defaultValue="2026-11-15" />
        </Field>
        <Field>
          <FieldLabel>Jours ouvrés</FieldLabel>
          <Input defaultValue="—" disabled />
          <FieldDescription>Calculé automatiquement.</FieldDescription>
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
      <Panel padding="lg" className="hx:w-xl">
        <AddressForm />
      </Panel>
      <Panel padding="lg" className="hx:w-80">
        <AddressForm />
      </Panel>
    </div>
  ),
};
