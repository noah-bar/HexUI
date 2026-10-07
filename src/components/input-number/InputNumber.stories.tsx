import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Field, FieldDescription, FieldError, FieldLabel, FieldRow } from '../field/Field';
import { Panel } from '../panel/Panel';
import { InputNumber } from './InputNumber';

const meta = {
  title: 'Components/InputNumber',
  component: InputNumber,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Left-aligned field without steppers, which is the default presentation. */
export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Quantité</FieldLabel>
      <InputNumber defaultValue={3} min={1} max={999} />
    </Field>
  ),
};

/** `decimalPlaces` controls the fixed number of digits after the decimal separator. */
export const Decimals: Story = {
  render: () => (
    <Field>
      <FieldLabel>Poids</FieldLabel>
      <InputNumber defaultValue={12.5} min={0} step={0.01} decimalPlaces={2} locale="fr-CH" />
      <FieldDescription>Affiché avec deux décimales.</FieldDescription>
    </Field>
  ),
};

/** A required field restores `0` when the user clears it and moves focus away. */
export const Required: Story = {
  render: () => (
    <Field>
      <FieldLabel>Quantité</FieldLabel>
      <InputNumber required />
      <FieldDescription>Effacez la valeur puis quittez le champ : elle revient à zéro.</FieldDescription>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Quantité' });
    await expect(input).toHaveValue('0');
    await userEvent.clear(input);
    await expect(input).toHaveValue('');
    await userEvent.tab();
    await expect(input).toHaveValue('0');
  },
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
        <InputNumber defaultValue={32} min={0} step={0.5} decimalPlaces={1} showSteppers locale="fr-CH" />
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
