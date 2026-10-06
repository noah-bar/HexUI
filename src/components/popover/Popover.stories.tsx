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
  decorators: [(Story) => <div className="hx:min-h-96"><Story /></div>],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A filter panel: the typical business use. */
export const Filters: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="secondary" />}>
        <ListFilter /> Filtres
      </PopoverTrigger>
      <PopoverContent align="start" className="hx:w-80 hx:gap-4">
        <PopoverTitle>Filtrer les factures</PopoverTitle>
        <div className="hx:flex hx:flex-col hx:gap-2.5">
          {['Payée', 'Envoyée', 'En attente', 'En retard'].map((status, i) => (
            <label key={status} className="hx:flex hx:items-center hx:gap-2">
              <Checkbox defaultChecked={i > 1} />
              {status}
            </label>
          ))}
        </div>
        <Field>
          <FieldLabel>Montant minimum (CHF)</FieldLabel>
          <Input type="number" placeholder="0" />
        </Field>
        <div className="hx:flex hx:justify-end hx:gap-2">
          <PopoverClose render={<Button variant="ghost" size="sm" />}>Réinitialiser</PopoverClose>
          <PopoverClose render={<Button size="sm" />}>Appliquer</PopoverClose>
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
        <PopoverTrigger render={<Button variant="ghost" size="icon" className="hx:size-7" />} aria-label="Détails du client">
          <Info />
        </PopoverTrigger>
        <PopoverContent side="right" align="start">
          <div className="hx:flex hx:items-center hx:justify-between hx:gap-2">
            <PopoverTitle>Romandie Santé SA</PopoverTitle>
            <Badge variant="danger">En retard</Badge>
          </div>
          <PopoverDescription>Client depuis 2021 · 14 factures · Contact : Léa Rochat</PopoverDescription>
          <dl className="hx:grid hx:grid-cols-2 hx:gap-x-4 hx:gap-y-1 hx:text-sm">
            <dt className="hx:text-fg-muted">Encours</dt>
            <dd className="hx:text-right hx:tabular-nums">CHF 18 452,90</dd>
            <dt className="hx:text-fg-muted">Délai moyen</dt>
            <dd className="hx:text-right hx:tabular-nums">38 jours</dd>
          </dl>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
