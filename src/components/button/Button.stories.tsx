import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Plus, Trash2 } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Enregistrer' },
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
      <Button {...args} variant="primary">Primaire</Button>
      <Button {...args} variant="secondary">Secondaire</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Supprimer</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="icon" variant="secondary" aria-label="Ajouter">
        <Plus />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button {...args}>
        <Download /> Exporter
      </Button>
      <Button {...args} variant="danger">
        <Trash2 /> Supprimer
      </Button>
    </div>
  ),
};

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args}>
        <Download /> Exporter
      </Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="icon" aria-label="Ajouter">
        <Plus />
      </Button>
      <Button {...args} disabled>
        Désactivé
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
