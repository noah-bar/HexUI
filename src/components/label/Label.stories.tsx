import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '../checkbox/Checkbox';
import { Input } from '../input/Input';
import { Panel } from '../panel/Panel';
import { Switch } from '../switch/Switch';
import { Label } from './Label';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Wrapping the control: clicking the text toggles it. */
export const WithControls: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-4">
      <Label>
        <Checkbox defaultChecked /> Joindre le bulletin QR à la facture
      </Label>
      <Label>
        <Switch /> Envoyer un rappel automatique
      </Label>
      <Label>
        <Checkbox disabled /> Facturation en EUR (bientôt)
      </Label>
    </div>
  ),
};

/** Linked with `htmlFor` when the label sits apart from the control. Inside a Field, use FieldLabel. */
export const HtmlFor: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-2">
      <Label htmlFor="iban">IBAN</Label>
      <Input id="iban" placeholder="CH93 0076 2011 6238 5295 7" />
    </div>
  ),
};
