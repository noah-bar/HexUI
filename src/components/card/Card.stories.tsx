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
        <CardTitle>New project</CardTitle>
        <CardDescription>Create a workspace for your team.</CardDescription>
      </CardHeader>
      <CardContent>
        <label className="hx:flex hx:flex-col hx:gap-1.5 hx:font-medium">
          Project name
          <Input placeholder="Client portal redesign" />
        </label>
      </CardContent>
      <CardFooter className="hx:justify-end">
        <Button variant="ghost">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  ),
};

export const Stats: Story = {
  render: () => (
    <div className="hx:grid hx:max-w-3xl hx:grid-cols-1 hx:gap-4 hx:sm:grid-cols-3">
      {[
        { label: 'Revenue', value: '€128,450', delta: '+12.4%' },
        { label: 'Active clients', value: '2,314', delta: '+3.1%' },
        { label: 'Open tickets', value: '47', delta: '−8.6%' },
      ].map((stat) => (
        <Card key={stat.label} className="hx:gap-2 hx:p-5">
          <CardDescription>{stat.label}</CardDescription>
          <p className="hx:text-2xl hx:font-semibold hx:tabular-nums">{stat.value}</p>
          <p className="hx:text-xs hx:text-fg-muted">{stat.delta} vs last month</p>
        </Card>
      ))}
    </div>
  ),
};
