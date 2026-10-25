import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Archive,
  Bold,
  Italic,
  LayoutGrid,
  List,
  Star,
  Underline,
} from 'lucide-react';
import { Panel } from '../panel/Panel';
import { Toggle, ToggleGroup } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['outline', 'subtle'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { 'aria-label': 'Favorite', children: <Star /> },
};

export const WithText: Story = {
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-2">
      <Toggle {...args} defaultPressed>
        <Archive /> Show archived
      </Toggle>
      <Toggle {...args} variant="subtle">
        <Star /> Favorites only
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="hx:flex hx:items-center hx:gap-2">
      <Toggle {...args} size="sm" aria-label="Bold">
        <Bold />
      </Toggle>
      <Toggle {...args} size="md" aria-label="Bold" defaultPressed>
        <Bold />
      </Toggle>
      <Toggle {...args} size="lg" aria-label="Bold">
        <Bold />
      </Toggle>
    </div>
  ),
};

/** Single choice: one value at a time. The toggles are attached, like a `ButtonGroup`. */
export const Group: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
        <Toggle value="left" aria-label="Align left">
          <AlignLeft />
        </Toggle>
        <Toggle value="center" aria-label="Center">
          <AlignCenter />
        </Toggle>
        <Toggle value="right" aria-label="Align right">
          <AlignRight />
        </Toggle>
      </ToggleGroup>
      <ToggleGroup defaultValue={['list']} aria-label="View">
        <Toggle value="list">
          <List /> List
        </Toggle>
        <Toggle value="grid">
          <LayoutGrid /> Grid
        </Toggle>
      </ToggleGroup>
    </div>
  ),
};

/** `multiple`: several toggles can be pressed at once. */
export const GroupMultiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={['bold']} aria-label="Formatting">
      <Toggle value="bold" aria-label="Bold">
        <Bold />
      </Toggle>
      <Toggle value="italic" aria-label="Italic">
        <Italic />
      </Toggle>
      <Toggle value="underline" aria-label="Underline">
        <Underline />
      </Toggle>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: { 'aria-label': 'Favorite', children: <Star />, disabled: true },
};
