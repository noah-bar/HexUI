import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../button/Button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../card/Card';
import { Backdrop } from './Backdrop';

const meta = {
  title: 'Components/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
  // This story draws its own backdrop instead of the global one.
  parameters: { backdrop: false },
  args: { variant: 'mesh', intensity: 'subtle', texture: 'none', position: 'absolute' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['mesh', 'aurora', 'plain'] },
    intensity: { control: 'inline-radio', options: ['subtle', 'medium'] },
    texture: { control: 'inline-radio', options: ['none', 'grain', 'grid'] },
    position: { control: 'inline-radio', options: ['fixed', 'absolute'] },
  },
  render: (args) => (
    <div className="hx:relative hx:isolate hx:flex hx:min-h-96 hx:overflow-hidden hx:rounded-2xl hx:border hx:border-glass-border hx:items-center hx:justify-center hx:p-10">
      <Backdrop {...args} />
      <Card className="hx:w-full hx:max-w-sm">
        <CardHeader>
          <CardTitle>Bienvenue sur Hex-Tech</CardTitle>
          <CardDescription>Le fond donne de la profondeur aux surfaces en verre.</CardDescription>
        </CardHeader>
        <CardFooter className="hx:justify-end">
          <Button variant="secondary">Plus tard</Button>
          <Button>Commencer</Button>
        </CardFooter>
      </Card>
    </div>
  ),
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mesh: Story = {};

export const Aurora: Story = {
  args: { variant: 'aurora', intensity: 'medium' },
};

export const Plain: Story = {
  args: { variant: 'plain' },
};

export const WithGrain: Story = {
  args: { variant: 'mesh', intensity: 'medium', texture: 'grain' },
};

export const WithGrid: Story = {
  args: { variant: 'plain', texture: 'grid' },
};
