import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Input } from '../input/Input';
import { Panel } from '../panel/Panel';
import { Radio, RadioGroup } from '../radio/Radio';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/Select';
import { Textarea } from '../textarea/Textarea';
import { Field, FieldDescription, FieldError, FieldItem, FieldLabel } from './Field';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Adresse e-mail</FieldLabel>
      <Input type="email" placeholder="nom@entreprise.com" />
      <FieldDescription>Utilisée pour les notifications et la facturation.</FieldDescription>
    </Field>
  ),
};

/** `invalid` forces the error state; `FieldError match` shows the message. The red ring is applied automatically. */
export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>Adresse e-mail</FieldLabel>
      <Input type="email" defaultValue="adresse-invalide" />
      <FieldError match>Saisissez une adresse e-mail valide.</FieldError>
    </Field>
  ),
};

/** Native validation: leave the field empty and blur it to see the error. */
export const RequiredOnBlur: Story = {
  render: () => (
    <Field validationMode="onBlur">
      <FieldLabel>Nom du projet</FieldLabel>
      <Input required placeholder="Refonte du portail client" />
      <FieldError match="valueMissing">Le nom du projet est obligatoire.</FieldError>
    </Field>
  ),
};

const roles = [
  { label: 'Administrateur', value: 'admin' },
  { label: 'Éditeur', value: 'editor' },
  { label: 'Lecteur', value: 'viewer' },
];

/** A realistic form combining every form control. */
export const Form: Story = {
  render: () => (
    <form className="hx:flex hx:flex-col hx:gap-5" onSubmit={(e) => e.preventDefault()}>
      <Field>
        <FieldLabel>Nom complet</FieldLabel>
        <Input placeholder="Camille Martin" />
      </Field>
      <Field>
        <FieldLabel>Rôle</FieldLabel>
        <Select items={roles}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir un rôle" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel>Message d’invitation</FieldLabel>
        <Textarea placeholder="Bienvenue dans l’équipe !" />
        <FieldDescription>Facultatif. Ajouté à l’e-mail d’invitation.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel render={<div />}>Accès</FieldLabel>
        <RadioGroup defaultValue="all" className="hx:mt-1">
          <FieldItem>
            <Radio value="all" id="access-all" />
            <label htmlFor="access-all" className="hx:text-sm hx:text-fg">
              Tous les projets
            </label>
          </FieldItem>
          <FieldItem>
            <Radio value="selected" id="access-selected" />
            <label htmlFor="access-selected" className="hx:text-sm hx:text-fg">
              Projets sélectionnés uniquement
            </label>
          </FieldItem>
        </RadioGroup>
      </Field>
      <label className="hx:flex hx:items-center hx:gap-2 hx:text-sm hx:text-fg">
        <Checkbox defaultChecked />
        Envoyer l’invitation par e-mail
      </label>
      <div className="hx:flex hx:justify-end hx:gap-2">
        <Button variant="ghost" type="button">
          Annuler
        </Button>
        <Button type="submit">Inviter</Button>
      </div>
    </form>
  ),
};
