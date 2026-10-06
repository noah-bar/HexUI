import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardDescription, CardHeader, CardTitle } from '../card/Card';
import { Tabs, TabsList, TabsPanel, TabsTab } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const panels = [
  { value: 'overview', label: 'Vue d’ensemble', text: 'Statistiques et activité récente de l’espace de travail.' },
  { value: 'projects', label: 'Projets', text: 'Jalons, échéances et responsables.' },
  { value: 'billing', label: 'Facturation', text: 'Abonnement, factures et moyens de paiement.' },
];

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" className="hx:max-w-lg" {...args}>
      <TabsList>
        {panels.map((p) => (
          <TabsTab key={p.value} value={p.value}>
            {p.label}
          </TabsTab>
        ))}
        <TabsTab value="disabled" disabled>
          Désactivé
        </TabsTab>
      </TabsList>
      {panels.map((p) => (
        <TabsPanel key={p.value} value={p.value}>
          <Card>
            <CardHeader>
              <CardTitle>{p.label}</CardTitle>
              <CardDescription>{p.text}</CardDescription>
            </CardHeader>
          </Card>
        </TabsPanel>
      ))}
    </Tabs>
  ),
};
