import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, ChevronDown, Download, Plus, RefreshCw, Save, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save' },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'outline-danger', 'header'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'icon'] },
    ring: { control: 'boolean' },
    startIcon: { control: false },
    endIcon: { control: false },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="danger">
        Delete
      </Button>
      <Button {...args} variant="outline-danger">
        Remove
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon" variant="secondary" aria-label="Add">
        <Plus />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button {...args} startIcon={<Plus />}>
        Create
      </Button>
      <Button {...args} variant="secondary" startIcon={<Download />}>
        Export
      </Button>
      <Button {...args} variant="secondary" endIcon={<ChevronDown />}>
        Actions
      </Button>
      <Button {...args} variant="outline" endIcon={<ArrowRight />}>
        Next
      </Button>
      <Button {...args} variant="danger" startIcon={<Trash2 />}>
        Delete
      </Button>
    </div>
  ),
};

/** `ring` draws a second border around the button, 2px away, to set an action apart. */
export const Ring: Story = {
  args: { ring: true },
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="danger">
        Delete
      </Button>
      <Button {...args} variant="outline-danger">
        Remove
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button {...args} variant="primary" disabled>
        Primary
      </Button>
      <Button {...args} variant="secondary" disabled>
        Secondary
      </Button>
      <Button {...args} variant="outline" disabled>
        Outline
      </Button>
      <Button {...args} variant="ghost" disabled>
        Ghost
      </Button>
      <Button {...args} variant="danger" disabled>
        Delete
      </Button>
      <Button {...args} variant="outline-danger" disabled>
        Remove
      </Button>
    </div>
  ),
};

/** `loading`: a spinner replaces the start icon and the button is disabled, but keeps the focus. Click to try. */
export const Loading: Story = {
  render: function Render(args) {
    const [saving, setSaving] = useState(false);
    const save = () => {
      setSaving(true);
      setTimeout(() => setSaving(false), 2000);
    };
    return (
      <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
        <Button {...args} loading={saving} onClick={save}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
        <Button {...args} variant="secondary" loading={saving} onClick={save}>
          Save draft
        </Button>
        <Button {...args} variant="ghost" startIcon={<Save />} loading={saving} onClick={save}>
          Save
        </Button>
      </div>
    );
  },
};

/** A command bar above a list: ghost buttons with icons, a divider, a menu button. */
export const CommandBar: Story = {
  render: (args) => (
    <div className="hx:flex hx:items-center hx:gap-1 hx:border-b hx:border-border hx:pb-2">
      <Button {...args} variant="ghost" startIcon={<Plus />}>
        Create
      </Button>
      <Button {...args} variant="ghost" startIcon={<RefreshCw />}>
        Refresh
      </Button>
      <Button {...args} variant="ghost" startIcon={<Trash2 />}>
        Delete
      </Button>
      <div className="hx:mx-1 hx:h-5 hx:w-px hx:bg-border" />
      <Button {...args} variant="ghost" startIcon={<Settings />} endIcon={<ChevronDown />}>
        Settings
      </Button>
    </div>
  ),
};

/** The footer of a form card: the primary action first, then the way out. */
export const FormFooter: Story = {
  render: (args) => (
    <div className="hx:flex hx:max-w-md hx:flex-col hx:gap-4 hx:rounded-xs hx:bg-surface hx:p-6 hx:shadow-card">
      <div className="hx:flex hx:flex-col hx:gap-1">
        <h3 className="hx:text-base hx:font-semibold">Create a client</h3>
        <p className="hx:text-sm hx:text-fg-muted">The client is added to the current company.</p>
      </div>
      <div className="hx:flex hx:gap-2">
        <Button {...args}>Create</Button>
        <Button {...args} variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  ),
};
