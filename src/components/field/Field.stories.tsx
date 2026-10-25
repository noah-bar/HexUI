import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Panel } from '../panel/Panel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select/Select';
import { Textarea } from '../textarea/Textarea';
import { Field, FieldDescription, FieldError, FieldLabel } from './Field';

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
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" placeholder="name@company.com" />
      <FieldDescription>Used for notifications and billing.</FieldDescription>
    </Field>
  ),
};

/** `invalid` forces the error state; `FieldError match` shows the message. The red underline is applied automatically. */
export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" defaultValue="invalid-address" />
      <FieldError match>Enter a valid email address.</FieldError>
    </Field>
  ),
};

/** Native validation: leave the field empty and blur it to see the error. */
export const RequiredOnBlur: Story = {
  render: () => (
    <Field validationMode="onBlur">
      <FieldLabel>Project name</FieldLabel>
      <Input required placeholder="Client portal redesign" />
      <FieldError match="valueMissing">The project name is required.</FieldError>
    </Field>
  ),
};

const roles = [
  { label: 'Administrator', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

/** A realistic form combining every form control. */
export const Form: Story = {
  render: () => (
    <form className="hx:flex hx:flex-col hx:gap-5" onSubmit={(e) => e.preventDefault()}>
      <Field>
        <FieldLabel>Full name</FieldLabel>
        <Input placeholder="Camille Martin" />
      </Field>
      <Field>
        <FieldLabel>Role</FieldLabel>
        <Select items={roles}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a role" />
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
        <FieldLabel>Invitation message</FieldLabel>
        <Textarea placeholder="Welcome to the team!" />
        <FieldDescription>Optional. Added to the invitation email.</FieldDescription>
      </Field>
      <div className="hx:flex hx:justify-end hx:gap-2">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button type="submit">Invite</Button>
      </div>
    </form>
  ),
};
