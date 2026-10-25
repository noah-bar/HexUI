import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronDown, ChevronLeft, ChevronRight, Copy, Download, Minus, Plus, Save } from 'lucide-react';
import { Button } from '../button/Button';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../menu/Menu';
import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Related actions attached together: the borders of outline buttons merge into one. */
export const Default: Story = {
  render: (args) => (
    <ButtonGroup aria-label="Period" {...args}>
      <Button variant="outline" size="icon" aria-label="Previous month">
        <ChevronLeft />
      </Button>
      <Button variant="outline">October 2026</Button>
      <Button variant="outline" size="icon" aria-label="Next month">
        <ChevronRight />
      </Button>
    </ButtonGroup>
  ),
};

/** A split button: the main action, and a menu with the other ones. Filled buttons get a thin line between them. */
export const SplitButton: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-4">
      <ButtonGroup aria-label="Save">
        <Button startIcon={<Save />}>Save</Button>
        <Menu>
          <MenuTrigger render={<Button size="icon" aria-label="More save options" />}>
            <ChevronDown />
          </MenuTrigger>
          <MenuContent align="end">
            <MenuItem>Save as draft</MenuItem>
            <MenuItem>Save and send</MenuItem>
            <MenuItem>Save as template</MenuItem>
          </MenuContent>
        </Menu>
      </ButtonGroup>
      <ButtonGroup aria-label="Export">
        <Button variant="secondary" startIcon={<Download />}>
          Export
        </Button>
        <Menu>
          <MenuTrigger render={<Button variant="secondary" size="icon" aria-label="Export format" />}>
            <ChevronDown />
          </MenuTrigger>
          <MenuContent align="end">
            <MenuItem>PDF</MenuItem>
            <MenuItem>Excel</MenuItem>
            <MenuItem>CSV</MenuItem>
          </MenuContent>
        </Menu>
      </ButtonGroup>
    </div>
  ),
};

/** Icon buttons in a group, such as a zoom control. Each one needs an `aria-label`. */
export const Icons: Story = {
  render: () => (
    <ButtonGroup aria-label="Zoom">
      <Button variant="outline" size="icon" aria-label="Zoom out">
        <Minus />
      </Button>
      <Button variant="outline" className="hx:min-w-16 hx:tabular-nums">
        100%
      </Button>
      <Button variant="outline" size="icon" aria-label="Zoom in">
        <Plus />
      </Button>
    </ButtonGroup>
  ),
};

/** `orientation="vertical"` stacks the buttons; only the top and bottom corners stay rounded. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ButtonGroup aria-label="Invoice actions" {...args}>
      <Button variant="outline" startIcon={<Copy />}>
        Duplicate
      </Button>
      <Button variant="outline" startIcon={<Download />}>
        Download
      </Button>
      <Button variant="outline-danger">Cancel invoice</Button>
    </ButtonGroup>
  ),
};
