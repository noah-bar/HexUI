import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eye, Mail, Search } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '../button/Button';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'name@company.com' },
  argTypes: { startIcon: { control: false }, endIcon: { control: false } },
  // Fields sit on cards in real screens.
  decorators: [
    (Story) => (
      <div className="hx:max-w-sm hx:rounded-xs hx:bg-surface hx:p-6 hx:shadow-card">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Label above, hint below: a stand-in until the Field component exists. */
function FormField({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="hx:flex hx:flex-col hx:gap-1 hx:text-sm">
      <span className="hx:font-semibold">{label}</span>
      {children}
      {hint && <span className="hx:text-xs hx:text-fg-muted">{hint}</span>}
    </label>
  );
}

export const Default: Story = {};

export const WithLabel: Story = {
  render: (args) => (
    <FormField label="Email address">
      <Input {...args} type="email" />
    </FormField>
  ),
};

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'invalid-address' },
  render: (args) => (
    <FormField label="Email address">
      <Input {...args} type="email" />
      <span className="hx:text-xs hx:text-danger-text">Enter a valid email address.</span>
    </FormField>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-4">
      <Input startIcon={<Search />} placeholder="Search equipment" type="search" />
      <Input endIcon={<Mail />} placeholder="name@company.com" type="email" />
      <Input startIcon={<Search />} endIcon={<Eye />} placeholder="Both sides" />
      <Input startIcon={<Search />} placeholder="Invalid" aria-invalid defaultValue="pump 12" />
      <Input startIcon={<Search />} placeholder="Disabled" disabled />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'contact@hex-tech.ch' },
};

export const Types: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-4">
      <FormField label="Password">
        <Input type="password" defaultValue="secret-password" />
      </FormField>
      <FormField label="Quantity">
        <Input type="number" defaultValue={12} />
      </FormField>
      <FormField label="Due date">
        <Input type="date" defaultValue="2026-11-30" />
      </FormField>
      <FormField label="Attachment">
        <Input type="file" />
      </FormField>
    </div>
  ),
};

/** A short form: fields stacked 16px apart, actions at the bottom. */
export const InForm: Story = {
  render: () => (
    <form className="hx:flex hx:flex-col hx:gap-4" onSubmit={(event) => event.preventDefault()}>
      <FormField label="Company name">
        <Input placeholder="Hex-Tech Sàrl" />
      </FormField>
      <FormField label="Billing email" hint="Shown on quotes and invoices.">
        <Input type="email" placeholder="billing@company.com" />
      </FormField>
      <FormField label="VAT number">
        <Input placeholder="CHE-123.456.789" />
      </FormField>
      <div className="hx:mt-2 hx:flex hx:gap-2">
        <Button type="submit">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </form>
  ),
};
