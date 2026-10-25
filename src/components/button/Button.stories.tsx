import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown, Download, Plus, RefreshCw, Settings, Trash2 } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'icon'] },
    disabled: { control: 'boolean' },
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
      <Button {...args}>
        <Plus /> Create
      </Button>
      <Button {...args} variant="secondary">
        <Download /> Export
      </Button>
      <Button {...args} variant="danger">
        <Trash2 /> Delete
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
    </div>
  ),
};

/** A command bar above a list, as in the Azure portal: ghost buttons with icons, a divider, a menu button. */
export const CommandBar: Story = {
  render: (args) => (
    <div className="hx:flex hx:items-center hx:gap-1 hx:border-b hx:border-border hx:pb-2">
      <Button {...args} variant="ghost">
        <Plus /> Create
      </Button>
      <Button {...args} variant="ghost">
        <RefreshCw /> Refresh
      </Button>
      <Button {...args} variant="ghost">
        <Trash2 /> Delete
      </Button>
      <div className="hx:mx-1 hx:h-5 hx:w-px hx:bg-border" />
      <Button {...args} variant="ghost">
        <Settings /> Settings <ChevronDown />
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
