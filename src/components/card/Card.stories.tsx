import type { Meta, StoryObj } from '@storybook/react-vite';
import { Ellipsis } from 'lucide-react';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { Field, FieldLabel } from '../field/Field';
import { Input } from '../input/Input';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../menu/Menu';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

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
        <Field>
          <FieldLabel>Project name</FieldLabel>
          <Input placeholder="Client portal redesign" />
        </Field>
      </CardContent>
      <CardFooter className="hx:justify-end">
        <Button variant="secondary">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  ),
};

/** `CardAction` puts a button or a menu in the top right corner, next to the title. */
export const WithAction: Story = {
  render: () => (
    <Card className="hx:max-w-sm">
      <CardHeader>
        <CardTitle>Romandie Santé</CardTitle>
        <CardDescription>Client since March 2024</CardDescription>
        <CardAction>
          <Menu>
            <MenuTrigger render={<Button variant="ghost" size="icon" aria-label="Client actions" />}>
              <Ellipsis />
            </MenuTrigger>
            <MenuContent align="end">
              <MenuItem>Edit</MenuItem>
              <MenuItem>New invoice</MenuItem>
              <MenuItem variant="danger">Archive</MenuItem>
            </MenuContent>
          </Menu>
        </CardAction>
      </CardHeader>
      <CardContent className="hx:flex hx:items-center hx:justify-between">
        <span className="hx:text-fg-muted">Outstanding</span>
        <span className="hx:font-semibold hx:tabular-nums">CHF 4,672.05</span>
      </CardContent>
      <CardFooter>
        <Badge variant="warning" dot>
          1 overdue invoice
        </Badge>
      </CardFooter>
    </Card>
  ),
};

export const Stats: Story = {
  render: () => (
    <div className="hx:grid hx:max-w-3xl hx:grid-cols-1 hx:gap-4 hx:sm:grid-cols-3">
      {[
        { label: 'Revenue', value: 'CHF 128,450', delta: '+12.4%' },
        { label: 'Active clients', value: '2,314', delta: '+3.1%' },
        { label: 'Open invoices', value: '47', delta: '−8.6%' },
      ].map((stat) => (
        <Card key={stat.label} className="hx:gap-1">
          <CardDescription>{stat.label}</CardDescription>
          <p className="hx:m-0 hx:text-2xl hx:font-semibold hx:tabular-nums">{stat.value}</p>
          <p className="hx:m-0 hx:text-xs hx:text-fg-muted">{stat.delta} vs last month</p>
        </Card>
      ))}
    </div>
  ),
};
