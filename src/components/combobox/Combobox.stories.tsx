import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useMemo, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { Field, FieldDescription, FieldError, FieldLabel } from '../field/Field';
import { Panel } from '../panel/Panel';
import {
  Combobox,
  ComboboxChips,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSearch,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
} from './Combobox';

type Client = { id: number; label: string; city: string };

const clients: Client[] = [
  { id: 1, label: 'Alpina Logistique SA', city: 'Sion' },
  { id: 2, label: 'Banque Cantonale du Léman', city: 'Lausanne' },
  { id: 3, label: 'Boulangerie Favre Sàrl', city: 'Fribourg' },
  { id: 4, label: 'Cabinet Dr. Rochat', city: 'Neuchâtel' },
  { id: 5, label: 'Helvetia Services SA', city: 'Genève' },
  { id: 6, label: 'Jura Énergie SA', city: 'Delémont' },
  { id: 7, label: 'Léman Immobilier SA', city: 'Nyon' },
  { id: 8, label: 'Menuiserie Berset', city: 'Bulle' },
  { id: 9, label: 'Romandie Santé', city: 'Yverdon-les-Bains' },
  { id: 10, label: 'Transports Morand & Fils', city: 'Martigny' },
  { id: 11, label: 'Vaud Conseil Fiduciaire', city: 'Morges' },
  { id: 12, label: 'Zürcher Treuhand AG', city: 'Zurich' },
];

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  // Comboboxes live inside glass surfaces in real screens, so they are shown in a Panel.
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Type to filter, arrow keys to move, Enter to pick. Only items of the list can be chosen. */
export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>Client</FieldLabel>
      <Combobox items={clients}>
        <ComboboxInput placeholder="Search for a client" />
        <ComboboxContent>
          <ComboboxEmpty>No client found.</ComboboxEmpty>
          <ComboboxList>
            {(client: Client) => (
              <ComboboxItem key={client.id} value={client}>
                {client.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>The invoice uses the client's billing address.</FieldDescription>
    </Field>
  ),
};

/** Items can show extra detail next to their label; filtering still uses the label. */
export const WithDetails: Story = {
  render: () => (
    <Field>
      <FieldLabel>Client</FieldLabel>
      <Combobox items={clients} defaultValue={clients[6]}>
        <ComboboxInput placeholder="Search for a client" />
        <ComboboxContent>
          <ComboboxEmpty>No client found.</ComboboxEmpty>
          <ComboboxList>
            {(client: Client) => (
              <ComboboxItem key={client.id} value={client}>
                <span className="hx:truncate">{client.label}</span>
                <span className="hx:ml-auto hx:shrink-0 hx:text-xs hx:text-fg-muted">{client.city}</span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
};

type Member = { id: string; label: string; role: string };

const members: Member[] = [
  { id: 'cm', label: 'Camille Martin', role: 'Project manager' },
  { id: 'lb', label: 'Luca Bianchi', role: 'Developer' },
  { id: 'sr', label: 'Sophie Rey', role: 'Designer' },
  { id: 'ng', label: 'Nicolas Girard', role: 'Developer' },
  { id: 'em', label: 'Elena Müller', role: 'Accountant' },
  { id: 'tp', label: 'Thomas Pittet', role: 'Consultant' },
  { id: 'ad', label: 'Aline Dubois', role: 'Support' },
];

/** `multiple` with `ComboboxChips`: Backspace removes the last chip, Left Arrow moves into the chips. */
export const Multiple: Story = {
  render: () => (
    <Field>
      <FieldLabel>Project team</FieldLabel>
      <Combobox items={members} multiple defaultValue={[members[0], members[2]]}>
        <ComboboxChips placeholder="Add a team member" />
        <ComboboxContent>
          <ComboboxEmpty>No one matches.</ComboboxEmpty>
          <ComboboxList>
            {(member: Member) => (
              <ComboboxItem key={member.id} value={member}>
                <span className="hx:truncate">{member.label}</span>
                <span className="hx:ml-auto hx:shrink-0 hx:text-xs hx:text-fg-muted">{member.role}</span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>Team members receive a notification.</FieldDescription>
    </Field>
  ),
};

const cantons = [
  'Aargau',
  'Appenzell Ausserrhoden',
  'Appenzell Innerrhoden',
  'Basel-Landschaft',
  'Basel-Stadt',
  'Bern',
  'Fribourg',
  'Geneva',
  'Glarus',
  'Graubünden',
  'Jura',
  'Lucerne',
  'Neuchâtel',
  'Nidwalden',
  'Obwalden',
  'Schaffhausen',
  'Schwyz',
  'Solothurn',
  'St. Gallen',
  'Thurgau',
  'Ticino',
  'Uri',
  'Valais',
  'Vaud',
  'Zug',
  'Zurich',
];

/**
 * Dropdown: a Select-like button that opens a list with a search field inside.
 * Use it when the field should look like a Select but the list is long.
 */
export const Dropdown: Story = {
  render: () => (
    <Field>
      <FieldLabel>Canton</FieldLabel>
      <Combobox items={cantons}>
        <ComboboxTrigger>
          <ComboboxValue placeholder="Choose a canton" />
        </ComboboxTrigger>
        <ComboboxContent aria-label="Choose a canton">
          <ComboboxSearch placeholder="Search…" />
          <ComboboxEmpty>No canton found.</ComboboxEmpty>
          <ComboboxList>
            {(canton: string) => (
              <ComboboxItem key={canton} value={canton}>
                {canton}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>Sets the applied tax rate.</FieldDescription>
    </Field>
  ),
};

type Service = { id: string; label: string };
type ServiceGroup = { value: string; items: Service[] };

const services: ServiceGroup[] = [
  {
    value: 'Development',
    items: [
      { id: 'web', label: 'Website' },
      { id: 'app', label: 'Mobile app' },
      { id: 'api', label: 'API integration' },
    ],
  },
  {
    value: 'Consulting',
    items: [
      { id: 'audit', label: 'Security audit' },
      { id: 'cloud', label: 'Cloud migration' },
    ],
  },
  {
    value: 'Support',
    items: [
      { id: 'maint', label: 'Annual maintenance' },
      { id: 'train', label: 'Team training' },
    ],
  },
];

/** Groups: pass `{ value, items }[]` to the root and render each group with `ComboboxCollection`. */
export const Grouped: Story = {
  render: () => (
    <Field>
      <FieldLabel>Service</FieldLabel>
      <Combobox items={services}>
        <ComboboxInput placeholder="Search for a service" />
        <ComboboxContent>
          <ComboboxEmpty>No service found.</ComboboxEmpty>
          <ComboboxList>
            {(group: ServiceGroup, index: number) => (
              <ComboboxGroup key={group.value} items={group.items}>
                {index > 0 && <ComboboxSeparator />}
                <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(service: Service) => (
                    <ComboboxItem key={service.id} value={service}>
                      {service.label}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
};

// Fake API: searches a large client base with network latency.
const clientBase: Client[] = Array.from({ length: 400 }, (_, i) => {
  const base = clients[i % clients.length];
  return { id: 100 + i, label: i < clients.length ? base.label : `${base.label} (${Math.floor(i / clients.length) + 1})`, city: base.city };
});

function searchClients(query: string, signal: AbortSignal) {
  return new Promise<Client[]>((resolve, reject) => {
    const timer = setTimeout(() => {
      const q = query.toLocaleLowerCase('fr-CH');
      resolve(clientBase.filter((c) => c.label.toLocaleLowerCase('fr-CH').includes(q)).slice(0, 20));
    }, 600);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

/**
 * Results come from an API: `filter={null}` turns off local filtering, `onInputValueChange`
 * feeds the request, and `ComboboxStatus` announces loading. Keep the selected item in `items`.
 */
export const AsyncSearch: Story = {
  render: function AsyncSearchStory() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Client[]>([]);
    const [selected, setSelected] = useState<Client | null>(null);
    const [isPending, setIsPending] = useState(false);
    const debouncedQuery = useDebouncedValue(query.trim(), 300);

    useEffect(() => {
      if (debouncedQuery === '') {
        setResults([]);
        return;
      }
      const controller = new AbortController();
      setIsPending(true);
      searchClients(debouncedQuery, controller.signal)
        .then((found) => {
          setResults(found);
          setIsPending(false);
        })
        .catch(() => {});
      return () => controller.abort();
    }, [debouncedQuery]);

    const items = useMemo(
      () => (selected && !results.some((c) => c.id === selected.id) ? [...results, selected] : results),
      [results, selected],
    );

    const searching = isPending || query.trim() !== debouncedQuery;

    return (
      <Field>
        <FieldLabel>Client</FieldLabel>
        <Combobox
          items={items}
          filter={null}
          value={selected}
          onValueChange={setSelected}
          onInputValueChange={setQuery}
          isItemEqualToValue={(a: Client, b: Client) => a.id === b.id}
        >
          <ComboboxInput placeholder="Type at least one letter" />
          <ComboboxContent>
            <ComboboxStatus loading={searching}>
              {searching
                ? 'Searching…'
                : query.trim() === '' && !selected
                  ? 'Start typing to search 400 clients.'
                  : null}
            </ComboboxStatus>
            <ComboboxEmpty>{!searching && query.trim() !== '' ? `No client for “${query.trim()}”.` : null}</ComboboxEmpty>
            <ComboboxList>
              {(client: Client) => (
                <ComboboxItem key={client.id} value={client}>
                  <span className="hx:truncate">{client.label}</span>
                  <span className="hx:ml-auto hx:shrink-0 hx:text-xs hx:text-fg-muted">{client.city}</span>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    );
  },
};

/** Inside an invalid `Field`, the input group turns red like the other fields. */
export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>Client</FieldLabel>
      <Combobox items={clients}>
        <ComboboxInput placeholder="Search for a client" />
        <ComboboxContent>
          <ComboboxEmpty>No client found.</ComboboxEmpty>
          <ComboboxList>
            {(client: Client) => (
              <ComboboxItem key={client.id} value={client}>
                {client.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldError match>Choose the client to invoice.</FieldError>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled>
      <FieldLabel>Client</FieldLabel>
      <Combobox items={clients} defaultValue={clients[4]} disabled>
        <ComboboxInput placeholder="Search for a client" />
        <ComboboxContent>
          <ComboboxList>
            {(client: Client) => (
              <ComboboxItem key={client.id} value={client}>
                {client.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>The client can no longer change once the invoice is sent.</FieldDescription>
    </Field>
  ),
};
