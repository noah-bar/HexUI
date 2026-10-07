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
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" placeholder="name@company.com" />
      <FieldDescription>Used for notifications and billing.</FieldDescription>
    </Field>
  ),
};

/** `invalid` forces the error state; `FieldError match` shows the message. The red ring is applied automatically. */
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
      <Field>
        <FieldLabel render={<div />}>Access</FieldLabel>
        <RadioGroup defaultValue="all" className="hx:mt-1">
          <FieldItem>
            <Radio value="all" id="access-all" />
            <label htmlFor="access-all" className="hx:text-sm hx:text-fg">
              All projects
            </label>
          </FieldItem>
          <FieldItem>
            <Radio value="selected" id="access-selected" />
            <label htmlFor="access-selected" className="hx:text-sm hx:text-fg">
              Selected projects only
            </label>
          </FieldItem>
        </RadioGroup>
      </Field>
      <label className="hx:flex hx:items-center hx:gap-2 hx:text-sm hx:text-fg">
        <Checkbox defaultChecked />
        Send the invitation by email
      </label>
      <div className="hx:flex hx:justify-end hx:gap-2">
        <Button variant="ghost" type="button">
          Cancel
        </Button>
        <Button type="submit">Invite</Button>
      </div>
    </form>
  ),
};
