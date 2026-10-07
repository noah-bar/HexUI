import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, FieldDescription, FieldError, FieldLabel, FieldRow } from '../field/Field';
import { Panel } from '../panel/Panel';
import { InputNumber } from './InputNumber';

const meta = {
  title: 'Components/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel padding="lg" className="hx:max-w-md">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Arrow keys and the buttons step the value; Shift + arrow uses `largeStep`. */
export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Quantité</FieldLabel>
      <InputNumber defaultValue={3} min={1} max={999} />
    </Field>
  ),
};

/** `format` and `locale` display the value as an amount; typing "1250,5" is understood. */
export const Currency: Story = {
  render: () => (
    <Field>
      <FieldLabel>Prix unitaire</FieldLabel>
      <InputNumber
        defaultValue={140}
        min={0}
        step={5}
        showSteppers={false}
        align="right"
        locale="fr-CH"
        format={{ style: 'currency', currency: 'CHF' }}
      />
      <FieldDescription>Hors TVA.</FieldDescription>
    </Field>
  ),
};

/** An invoice line: hours, rate and discount side by side. In narrow columns, keep the steppers for the main value only. */
export const InvoiceLine: Story = {
  render: () => (
    <FieldRow columns="1.3fr 1.4fr 1fr" stackBelow="sm">
      <Field>
        <FieldLabel>Heures</FieldLabel>
        <InputNumber defaultValue={32} min={0} step={0.5} locale="fr-CH" />
      </Field>
      <Field>
        <FieldLabel>Taux horaire</FieldLabel>
        <InputNumber defaultValue={140} min={0} showSteppers={false} align="right" locale="fr-CH" format={{ style: 'currency', currency: 'CHF' }} />
      </Field>
      <Field>
        <FieldLabel>Rabais</FieldLabel>
        <InputNumber defaultValue={0.1} min={0} max={1} step={0.05} showSteppers={false} align="right" locale="fr-CH" format={{ style: 'percent' }} />
      </Field>
    </FieldRow>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>Quantité</FieldLabel>
      <InputNumber defaultValue={0} />
      <FieldError match>La quantité doit être d’au moins 1.</FieldError>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <FieldLabel>Quantité</FieldLabel>
      <InputNumber defaultValue={12} disabled />
    </Field>
  ),
};
