import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Panel } from '../panel/Panel';
import { Progress } from './Progress';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { value: 45 },
  decorators: [
    (Story) => (
      <Panel padding="lg" className="hx:max-w-md">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Export des factures', showValue: true, value: 45, locale: 'fr-CH' },
};

/** The bar animates its width and turns green once complete. */
export const Running: Story = {
  render: function RunningStory() {
    const [value, setValue] = useState(10);
    useEffect(() => {
      const timer = setInterval(() => setValue((v) => (v >= 100 ? 10 : Math.min(100, v + 15))), 900);
      return () => clearInterval(timer);
    }, []);
    return <Progress label={value === 100 ? 'Envoi terminé' : 'Envoi des rappels'} showValue value={value} locale="fr-CH" />;
  },
};

/** `value={null}`: unknown duration. */
export const Indeterminate: Story = {
  args: { label: 'Synchronisation avec la banque', value: null },
};

/** Without a visible label, give it an `aria-label`. */
export const WithoutLabel: Story = {
  args: { value: 70, 'aria-label': 'Quota de stockage utilisé' },
};

export const Complete: Story = {
  args: { label: 'Import des clients', showValue: true, value: 100, locale: 'fr-CH' },
};
