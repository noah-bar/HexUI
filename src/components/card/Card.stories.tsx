import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Input } from '../input/Input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="hx:max-w-sm">
      <CardHeader>
        <CardTitle>Nouveau projet</CardTitle>
        <CardDescription>Créez un espace de travail pour votre équipe.</CardDescription>
      </CardHeader>
      <CardContent>
        <label className="hx:flex hx:flex-col hx:gap-1.5 hx:font-medium">
          Nom du projet
          <Input placeholder="Refonte du portail client" />
        </label>
      </CardContent>
      <CardFooter className="hx:justify-end">
        <Button variant="ghost">Annuler</Button>
        <Button>Créer</Button>
      </CardFooter>
    </Card>
  ),
};

export const Stats: Story = {
  render: () => (
    <div className="hx:grid hx:max-w-3xl hx:grid-cols-1 hx:gap-4 hx:sm:grid-cols-3">
      {[
        { label: 'Chiffre d’affaires', value: '128 450 €', delta: '+12,4 %' },
        { label: 'Clients actifs', value: '2 314', delta: '+3,1 %' },
        { label: 'Tickets ouverts', value: '47', delta: '−8,6 %' },
      ].map((stat) => (
        <Card key={stat.label} className="hx:gap-2 hx:p-5">
          <CardDescription>{stat.label}</CardDescription>
          <p className="hx:text-2xl hx:font-semibold hx:tabular-nums">{stat.value}</p>
          <p className="hx:text-xs hx:text-fg-muted">{stat.delta} vs mois dernier</p>
        </Card>
      ))}
    </div>
  ),
};
