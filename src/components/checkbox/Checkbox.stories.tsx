import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Panel } from '../panel/Panel';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { 'aria-label': 'Sélectionner' },
  decorators: [
    (Story) => (
      <Panel padding="md" className="hx:w-fit hx:min-w-20 hx:text-sm hx:text-fg">
        {Story()}
      </Panel>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const States: Story = {
  render: () => (
    <div className="hx:flex hx:flex-col hx:gap-3">
      <label className="hx:flex hx:items-center hx:gap-2">
        <Checkbox /> Non coché
      </label>
      <label className="hx:flex hx:items-center hx:gap-2">
        <Checkbox defaultChecked /> Coché
      </label>
      <label className="hx:flex hx:items-center hx:gap-2">
        <Checkbox indeterminate /> Indéterminé
      </label>
      <label className="hx:flex hx:items-center hx:gap-2">
        <Checkbox aria-invalid /> Invalide
      </label>
      <label className="hx:flex hx:items-center hx:gap-2 hx:opacity-50">
        <Checkbox disabled defaultChecked /> Désactivé
      </label>
    </div>
  ),
};

const items = ['Portail client', 'Application mobile', 'Migration ERP'];

/** "Select all" pattern with the indeterminate state. */
export const SelectAll: Story = {
  render: function SelectAllStory() {
    const [selected, setSelected] = useState<string[]>([items[0]]);
    const all = selected.length === items.length;
    return (
      <div className="hx:flex hx:w-64 hx:flex-col hx:gap-3">
        <label className="hx:flex hx:items-center hx:gap-2 hx:font-medium">
          <Checkbox
            checked={all}
            indeterminate={selected.length > 0 && !all}
            onCheckedChange={(checked) => setSelected(checked ? items : [])}
          />
          Tous les projets
        </label>
        <div className="hx:flex hx:flex-col hx:gap-3 hx:pl-6">
          {items.map((item) => (
            <label key={item} className="hx:flex hx:items-center hx:gap-2">
              <Checkbox
                checked={selected.includes(item)}
                onCheckedChange={(checked) =>
                  setSelected((prev) => (checked ? [...prev, item] : prev.filter((i) => i !== item)))
                }
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    );
  },
};
