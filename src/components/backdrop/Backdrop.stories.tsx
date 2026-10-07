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
    imageBlur: { control: { type: 'range', min: 0, max: 40, step: 1 } },
  },
  render: (args) => (
    <div className="hx:relative hx:isolate hx:flex hx:min-h-96 hx:overflow-hidden hx:rounded-2xl hx:border hx:border-glass-border hx:items-center hx:justify-center hx:p-10">
      <Backdrop {...args}>
        <Card className="hx:w-full hx:max-w-sm">
          <CardHeader>
            <CardTitle>Welcome to Hex-Tech</CardTitle>
            <CardDescription>The background gives depth to glass surfaces.</CardDescription>
          </CardHeader>
          <CardFooter className="hx:justify-end">
            <Button variant="secondary">Later</Button>
            <Button>Get started</Button>
          </CardFooter>
        </Card>
      </Backdrop>
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

const dayImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80';
const nightImage = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80';

/** An image replaces the colored glows. */
export const WithImage: Story = {
  args: { image: dayImage, imageBlur: 0, overlay: 0.2 },
  argTypes: { overlay: { control: { type: 'range', min: 0, max: 1, step: 0.05 } } },
};

/** One image per theme, blurred, with a darker veil in dark mode. Switch the theme in the toolbar. */
export const ThemedImage: Story = {
  args: {
    image: { light: dayImage, dark: nightImage },
    imageBlur: 12,
    overlay: { light: 0.05, dark: 0.45 },
  },
};
