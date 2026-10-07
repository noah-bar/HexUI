import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { Field, FieldDescription, FieldError, FieldLabel, FieldRow } from '../field/Field';
import { Input } from '../input/Input';
import { Panel } from '../panel/Panel';
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
} from './Autocomplete';

const cities = [
  'Bienne',
  'Bulle',
  'Carouge',
  'Delémont',
  'Fribourg',
  'Genève',
  'La Chaux-de-Fonds',
  'Lausanne',
  'Martigny',
  'Monthey',
  'Montreux',
  'Morges',
  'Neuchâtel',
  'Nyon',
  'Renens',
  'Sierre',
  'Sion',
  'Vevey',
  'Yverdon-les-Bains',
];

const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  // Autocompletes live inside glass surfaces in real screens, so they are shown in a Panel.
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Free text with suggestions: the user may pick one or keep what they typed. */
export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel>City</FieldLabel>
      <Autocomplete items={cities}>
        <AutocompleteInput placeholder="Lausanne" />
        <AutocompleteContent>
          <AutocompleteList>
            {(city: string) => (
              <AutocompleteItem key={city} value={city}>
                {city}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
      <FieldDescription>A city that is not in the list is accepted.</FieldDescription>
    </Field>
  ),
};

/** `autoHighlight` highlights the first match, so Enter completes it straight away. */
export const InAForm: Story = {
  render: () => (
    <form className="hx:flex hx:flex-col hx:gap-5" onSubmit={(e) => e.preventDefault()}>
      <Field>
        <FieldLabel>Street and number</FieldLabel>
        <Input placeholder="Avenue de la Gare 12" />
      </Field>
      <FieldRow columns="1fr 3fr" stackBelow="sm">
        <Field>
          <FieldLabel>Postcode</FieldLabel>
          <Input inputMode="numeric" placeholder="1003" />
        </Field>
        <Field>
          <FieldLabel>City</FieldLabel>
          <Autocomplete items={cities} autoHighlight>
            <AutocompleteInput placeholder="Lausanne" />
            <AutocompleteContent>
              <AutocompleteList>
                {(city: string) => (
                  <AutocompleteItem key={city} value={city}>
                    {city}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompleteContent>
          </Autocomplete>
        </Field>
      </FieldRow>
    </form>
  ),
};

type Suggestion = { value: string; items: string[] };

const libraryLines: Suggestion[] = [
  { value: 'Recent', items: ['Custom development', 'Annual hosting'] },
  {
    value: 'Catalogue',
    items: ['Security audit', 'Team training (half day)', 'Annual maintenance', 'Cloud migration', 'Priority support'],
  },
];

/** Grouped suggestions, e.g. recent entries first. Shows `AutocompleteEmpty` when nothing matches. */
export const Grouped: Story = {
  render: () => (
    <Field>
      <FieldLabel>Line description</FieldLabel>
      <Autocomplete items={libraryLines} openOnInputClick>
        <AutocompleteInput placeholder="Describe the service" />
        <AutocompleteContent>
          <AutocompleteEmpty>No suggestions: the typed text will be used.</AutocompleteEmpty>
          <AutocompleteList>
            {(group: Suggestion) => (
              <AutocompleteGroup key={group.value} items={group.items}>
                <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(line: string) => (
                    <AutocompleteItem key={line} value={line}>
                      {line}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </Field>
  ),
};

// Fake address API with network latency.
const streets = [
  'Avenue de la Gare',
  'Rue du Lac',
  'Chemin des Vignes',
  'Rue de Bourg',
  'Avenue de Rumine',
  'Place de la Palud',
];
const addresses = streets.flatMap((street, i) =>
  [1, 4, 12, 27].map((n) => `${street} ${n}, ${1000 + i * 3} ${cities[(i * 5) % cities.length]}`),
);

function searchAddresses(query: string, signal: AbortSignal) {
  return new Promise<string[]>((resolve, reject) => {
    const timer = setTimeout(() => {
      const q = query.toLocaleLowerCase('fr-CH');
      resolve(addresses.filter((a) => a.toLocaleLowerCase('fr-CH').includes(q)).slice(0, 8));
    }, 600);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

/** Suggestions from an API: `filter={null}`, the value feeds the request, `AutocompleteStatus` shows loading. */
export const AsyncSearch: Story = {
  render: function AsyncSearchStory() {
    const [value, setValue] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [isPending, setIsPending] = useState(false);
    const query = useDebouncedValue(value.trim(), 300);

    useEffect(() => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      const controller = new AbortController();
      setIsPending(true);
      searchAddresses(query, controller.signal)
        .then((found) => {
          setResults(found);
          setIsPending(false);
        })
        .catch(() => {});
      return () => controller.abort();
    }, [query]);

    const searching = value.trim().length >= 2 && (isPending || value.trim() !== query);

    return (
      <Field>
        <FieldLabel>Delivery address</FieldLabel>
        <Autocomplete items={results} filter={null} value={value} onValueChange={setValue}>
          <AutocompleteInput placeholder="Rue du Lac" />
          <AutocompleteContent>
            <AutocompleteStatus loading={searching}>{searching ? 'Searching addresses…' : null}</AutocompleteStatus>
            <AutocompleteEmpty>{!searching && value.trim().length >= 2 ? 'No address found.' : null}</AutocompleteEmpty>
            <AutocompleteList>
              {(address: string) => (
                <AutocompleteItem key={address} value={address}>
                  {address}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
        <FieldDescription>Type at least two characters.</FieldDescription>
      </Field>
    );
  },
};

export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <FieldLabel>City</FieldLabel>
      <Autocomplete items={cities} defaultValue="Lausane">
        <AutocompleteInput placeholder="Lausanne" />
        <AutocompleteContent>
          <AutocompleteList>
            {(city: string) => (
              <AutocompleteItem key={city} value={city}>
                {city}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
      <FieldError match>This city does not match any postcode.</FieldError>
    </Field>
  ),
};
