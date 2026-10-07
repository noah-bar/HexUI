import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Décrivez le besoin du client…' },
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-5">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'Trop court' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
