import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bold, Italic, Underline } from 'lucide-react';
import { Button } from '../button/Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="hx:pt-12">
      <Tooltip {...args}>
        <TooltipTrigger render={<Button variant="secondary" />}>Hover me</TooltipTrigger>
        <TooltipContent>Shortcut: ⌘ S</TooltipContent>
      </Tooltip>
    </div>
  ),
};

export const Toolbar: Story = {
  render: () => (
    <div className="hx:pt-12">
      <div className="hx:glass hx:inline-flex hx:gap-1 hx:rounded-lg hx:p-1">
        {[
          { label: 'Bold', icon: Bold },
          { label: 'Italic', icon: Italic },
          { label: 'Underline', icon: Underline },
        ].map(({ label, icon: Icon }) => (
          <Tooltip key={label}>
            <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label={label} />}>
              <Icon />
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  ),
};
