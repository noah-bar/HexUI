import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Describe the defect found during the inspection' },
  decorators: [
    (Story) => (
      <div className="hx:max-w-sm hx:rounded-xs hx:bg-surface hx:p-6 hx:shadow-card">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

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
    <FormField label="Comment" hint="Visible on the inspection report.">
      <Textarea {...args} />
    </FormField>
  ),
};

export const Invalid: Story = {
  args: { 'aria-invalid': true },
  render: (args) => (
    <FormField label="Comment">
      <Textarea {...args} />
      <span className="hx:text-xs hx:text-danger-text">A comment is required for a failed check.</span>
    </FormField>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Checked on 12.10.2026, no defect.' },
};
