import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Plus, Send, Trash2 } from 'lucide-react';
import { Panel } from '../panel/Panel';
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

const invoices = Array.from({ length: 9 }, (_, i) => ({
  id: `F-2026-${1042 + i}`,
  client: ['Banque Cantonale', 'Helvetia Services', 'Alpina Logistique', 'Romandie Santé'][i % 4],
  total: `${(1830 + i * 947.35).toFixed(2)} CHF`,
}));

/**
 * Worst case: a bulk actions bar floating over a dense list. The stained glass frosts
 * what is behind it, so the label stays readable.
 *
 * Keep floating bars outside the glass surface they cover (here a sibling of the Panel):
 * in Chrome, an element nested in a blurred surface cannot blur that surface's content.
 */
export const OverContent: Story = {
  render: (args) => (
    <div className="hx:relative hx:max-w-lg">
      <Panel>
        <ul className="hx:divide-y hx:divide-glass-border hx:text-sm">
          {invoices.map((invoice) => (
            <li key={invoice.id} className="hx:flex hx:gap-4 hx:px-5 hx:py-2.5">
              <span className="hx:font-medium">{invoice.id}</span>
              <span className="hx:flex-1 hx:text-fg-muted">{invoice.client}</span>
              <span className="hx:tabular-nums">{invoice.total}</span>
            </li>
          ))}
        </ul>
      </Panel>
      <div className="hx:absolute hx:inset-x-0 hx:bottom-24 hx:flex hx:justify-center hx:gap-3">
        <Button {...args} variant="danger">
          <Trash2 /> Supprimer
        </Button>
        <Button {...args}>
          <Send /> Envoyer 3 factures
        </Button>
      </div>
    </div>
  ),
};
