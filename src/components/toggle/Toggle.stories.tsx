import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlignCenter, AlignLeft, AlignRight, Archive, Bold, Italic, LayoutGrid, List, Star, Underline } from 'lucide-react';
import { Panel } from '../panel/Panel';
import { Toggle, ToggleGroup } from './Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <Panel padding="lg" className="hx:max-w-md">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { 'aria-label': 'Favori', children: <Star /> },
};

export const WithText: Story = {
  render: (args) => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-2">
      <Toggle {...args} defaultPressed>
        <Archive /> Afficher les archivées
      </Toggle>
      <Toggle {...args} variant="outline">
        <Star /> Favoris uniquement
      </Toggle>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="hx:flex hx:items-center hx:gap-2">
      <Toggle {...args} size="sm" aria-label="Gras">
        <Bold />
      </Toggle>
      <Toggle {...args} size="md" aria-label="Gras" defaultPressed>
        <Bold />
      </Toggle>
      <Toggle {...args} size="lg" aria-label="Gras">
        <Bold />
      </Toggle>
    </div>
  ),
};

/** Single choice: one value at a time. */
export const Group: Story = {
  render: () => (
    <div className="hx:flex hx:flex-wrap hx:items-center hx:gap-3">
      <ToggleGroup defaultValue={['left']} aria-label="Alignement du texte">
        <Toggle value="left" size="sm" aria-label="Aligner à gauche">
          <AlignLeft />
        </Toggle>
        <Toggle value="center" size="sm" aria-label="Centrer">
          <AlignCenter />
        </Toggle>
        <Toggle value="right" size="sm" aria-label="Aligner à droite">
          <AlignRight />
        </Toggle>
      </ToggleGroup>
      <ToggleGroup defaultValue={['list']} aria-label="Affichage">
        <Toggle value="list" size="sm">
          <List /> Liste
        </Toggle>
        <Toggle value="grid" size="sm">
          <LayoutGrid /> Grille
        </Toggle>
      </ToggleGroup>
    </div>
  ),
};

/** `multiple`: several toggles can be pressed at once. */
export const GroupMultiple: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={['bold']} aria-label="Mise en forme">
      <Toggle value="bold" size="sm" aria-label="Gras">
        <Bold />
      </Toggle>
      <Toggle value="italic" size="sm" aria-label="Italique">
        <Italic />
      </Toggle>
      <Toggle value="underline" size="sm" aria-label="Souligné">
        <Underline />
      </Toggle>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: { 'aria-label': 'Favori', children: <Star />, disabled: true },
};
