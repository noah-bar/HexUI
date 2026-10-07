import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilePlus, FileText, LayoutDashboard, ReceiptText, Settings, UserPlus, Users, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from './Command';

type Action = { value: string; label: string; icon: LucideIcon; shortcut?: string };
type ActionGroup = { value: string; items: Action[] };

const actions: ActionGroup[] = [
  {
    value: 'Créer',
    items: [
      { value: 'new-invoice', label: 'Nouvelle facture', icon: FilePlus, shortcut: '⌘N' },
      { value: 'new-quote', label: 'Nouveau devis', icon: FileText },
      { value: 'new-client', label: 'Nouveau client', icon: UserPlus },
    ],
  },
  {
    value: 'Aller à',
    items: [
      { value: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
      { value: 'invoices', label: 'Factures', icon: ReceiptText, shortcut: 'G F' },
      { value: 'clients', label: 'Clients', icon: Users, shortcut: 'G C' },
      { value: 'settings', label: 'Paramètres', icon: Settings, shortcut: '⌘,' },
    ],
  },
];

const meta = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
  parameters: { docs: { story: { inline: false, iframeHeight: 520 } } },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

function renderGroups(onRun: (action: Action) => void) {
  return (group: ActionGroup) => (
    <CommandGroup key={group.value} items={group.items}>
      <CommandGroupLabel>{group.value}</CommandGroupLabel>
      <CommandCollection>
        {(action: Action) => (
          <CommandItem key={action.value} value={action} onClick={() => onRun(action)}>
            <action.icon />
            {action.label}
            {action.shortcut && <CommandShortcut>{action.shortcut}</CommandShortcut>}
          </CommandItem>
        )}
      </CommandCollection>
    </CommandGroup>
  );
}

/** Inline in a glass panel. Type to filter, arrow keys to move, Enter to run. */
export const Default: Story = {
  render: function DefaultStory() {
    const [last, setLast] = useState<string>();
    return (
      <div className="hx:flex hx:max-w-md hx:flex-col hx:gap-3">
        <Panel variant="strong">
          <Command items={actions}>
            <CommandInput placeholder="Rechercher une action…" />
            <CommandEmpty>Aucune action trouvée.</CommandEmpty>
            <CommandList>{renderGroups((action) => setLast(action.label))}</CommandList>
          </Command>
        </Panel>
        <p className="hx:text-sm hx:text-fg-muted" aria-live="polite">
          {last ? `Action lancée : ${last}` : 'Aucune action lancée.'}
        </p>
      </div>
    );
  },
};

/** Command palette in a dialog, opened with the button or ⌘K / Ctrl+K. */
export const Dialog: Story = {
  render: function DialogStory() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          setOpen((value) => !value);
        }
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Rechercher… <kbd className="hx:font-sans hx:text-xs hx:text-fg-muted">⌘K</kbd>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command items={actions}>
            <CommandInput placeholder="Rechercher une action ou une page…" />
            <CommandEmpty>Aucune action trouvée.</CommandEmpty>
            <CommandList>{renderGroups(() => setOpen(false))}</CommandList>
          </Command>
        </CommandDialog>
      </>
    );
  },
};
