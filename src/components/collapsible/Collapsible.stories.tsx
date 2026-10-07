import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Field, FieldDescription, FieldLabel } from '../field/Field';
import { Input } from '../input/Input';
import { Panel } from '../panel/Panel';
import { Collapsible, CollapsibleChevron, CollapsibleContent, CollapsibleTrigger } from './Collapsible';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel padding="lg" className="hx:max-w-md">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

const lines = [
  { label: 'Développement sur mesure (32 h)', amount: '4 480.00' },
  { label: 'Hébergement annuel', amount: '360.00' },
  { label: 'TVA 8,1 %', amount: '392.05' },
];

/** Invoice summary whose line details fold away. */
export const Default: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-3 hx:text-sm">
      <div className="hx:flex hx:items-baseline hx:justify-between">
        <span className="hx:font-medium">F-2026-1044 · Alpina Logistique SA</span>
        <span className="hx:font-semibold hx:tabular-nums">CHF 5 232.05</span>
      </div>
      <Collapsible>
        <CollapsibleTrigger render={<Button variant="ghost" size="sm" className="hx:-ml-3 hx:w-fit" />}>
          Détail des lignes <CollapsibleChevron />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="hx:mt-2 hx:flex hx:flex-col hx:gap-2 hx:border-t hx:border-glass-border hx:pt-3">
            {lines.map((line) => (
              <li key={line.label} className="hx:flex hx:justify-between hx:gap-4">
                <span className="hx:text-fg-muted">{line.label}</span>
                <span className="hx:tabular-nums">{line.amount}</span>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

/** Advanced options of a form, closed by default. */
export const FormOptions: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-4">
      <Field>
        <FieldLabel>Client</FieldLabel>
        <Input defaultValue="Léman Immobilier SA" />
      </Field>
      <Collapsible>
        <CollapsibleTrigger render={<Button variant="secondary" size="sm" className="hx:w-fit" />}>
          Options avancées <CollapsibleChevron />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="hx:flex hx:flex-col hx:gap-4 hx:pt-4">
            <Field>
              <FieldLabel>Référence interne</FieldLabel>
              <Input placeholder="PRJ-2026-018" />
            </Field>
            <Field>
              <FieldLabel>Délai de paiement (jours)</FieldLabel>
              <Input type="number" defaultValue={30} />
              <FieldDescription>Remplace le délai défini pour ce client.</FieldDescription>
            </Field>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
