# @hxtc/hexui

Hex-Tech's React component library — [Base UI](https://base-ui.com) + Tailwind CSS v4, with glassmorphism designed for professional interfaces.

## Installation

```bash
npm install @hxtc/hexui
```

Import the styles once, in the application's main stylesheet:

```css
/* app.css */
@import 'tailwindcss'; /* if the application uses Tailwind */
@import '@hxtc/hexui';
```

```tsx
import { Button, Card, CardHeader, CardTitle } from '@hxtc/hexui';
```

Importing from JavaScript works too: `import '@hxtc/hexui/styles.css';` in the entry point.

Requirements: React 19. **Tailwind is not required** in the application: the CSS is precompiled.

### Coexisting with the application's Tailwind

Every internal class is prefixed with `hx:` and every variable with `--hx-*`: no collision with your own
Tailwind setup. The library ships no global reset (preflight), so it never changes your application's styles.

You can pass your own classes through `className`; they are added to the component's classes.

## Page background

Glass needs something behind it to show. `Backdrop` adds a decorative background, fixed behind the whole
application, that follows the theme colors:

```tsx
<Backdrop />                                     {/* mesh, subtle: the default */}
<Backdrop variant="aurora" intensity="medium" /> {/* login page, welcome screen */}
<Backdrop variant="plain" texture="grid" />      {/* dense screens: tables, back office */}
```

It can also wrap the application at the root, like a provider:

```tsx
createRoot(document.getElementById('root')!).render(
  <Backdrop>
    <App />
  </Backdrop>,
);
```

Children are rendered next to the decorative layer, without an extra DOM wrapper, so `Backdrop` does not change
the application's layout.

- `variant`: `mesh` · `aurora` · `plain` — `intensity`: `subtle` · `medium` — `texture`: `none` · `grain` · `grid`
- `position="absolute"` confines it to a positioned container (add `isolation: isolate` to that container).
- It sits at a negative `z-index`: if one of your application's wrappers already has a background color, it will hide it.
- It is optional: components stay readable without it.
- Colors can be customized with `--hx-backdrop-base` and `--hx-backdrop-accent-1` to `-3`. The first accent follows `--hx-brand`.

An image can replace the colored glows, optionally a different one per theme. Only the current theme's image
is downloaded:

```tsx
<Backdrop image="/background.jpg" />
<Backdrop
  image={{ light: '/day.jpg', dark: '/night.jpg' }}
  imageBlur={12}                      {/* blur in px, 0 by default */}
  overlay={{ light: 0.1, dark: 0.5 }} {/* black veil, from 0 to 1 */}
/>
```

- `image` and `overlay` accept a single value or `{ light, dark }` (without `dark`, the `light` value is used for both themes).
- The black veil and the blur help keep text readable over a busy photo. `texture` is still available on top.
- Framing is set with `--hx-backdrop-image-position` (`center` by default).

## Light / dark theme

Add `class="dark"` (or `data-theme="dark"`) to `<html>`. It must be on `<html>` (not on a wrapper), because
dialogs, selects and tooltips are rendered in a portal at the root of the document.

The `useTheme` hook can manage this attribute, follow the system theme and remember the preference in
`localStorage` under the `hx-theme` key:

```tsx
import { Button, useTheme } from '@hxtc/hexui';

function ThemeButton() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  return (
    <>
      <Button variant="ghost" onClick={toggleTheme}>
        Switch to {resolvedTheme === 'dark' ? 'light' : 'dark'} theme
      </Button>
      <Button variant="ghost" onClick={() => setTheme('system')} disabled={theme === 'system'}>
        Use system theme
      </Button>
    </>
  );
}
```

`theme` is `light`, `dark` or `system`. `resolvedTheme` always holds the theme actually applied, `light` or
`dark`. Changes are kept in sync with the system theme and across open tabs. If storage is unavailable
(private browsing, blocked storage), the preference is kept in memory for the lifetime of the page.

To avoid a flash of the light theme on load, apply the theme before the first paint with `themeScript`,
placed in `<head>`:

```tsx
import { themeScript } from '@hxtc/hexui';

export function Head() {
  return (
    <head>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    </head>
  );
}
```

With a static `index.html` (Vite without SSR), paste the contents of `themeScript` into a `<script>` in `<head>`.

## Customization

The default palette is indigo on neutral grays: cool hues stay luminous once blurred, which suits glass.
Three color roles:

| Token          | Value                            | Usage                                                               |
| -------------- | -------------------------------- | ------------------------------------------------------------------- |
| `--hx-brand`   | `#6366f1`                        | Decorative: background glows, list hover.                           |
| `--hx-primary` | `#4f46e5`                        | Filled surfaces with white text (buttons, switch): 6.3:1.           |
| `--hx-accent`  | `#4f46e5` light / `#818cf8` dark | Brand color on top of a surface: icons, focus borders, check marks. |

Override the CSS variables after importing the styles:

```css
:root {
  --hx-glass-blur: 12px;
}
.dark {
  --hx-accent: #a5b4fc;
}
```

If you change `--hx-primary`, check that the `--hx-primary-fg` text keeps a contrast of at least 4.5:1.

The material details can be tuned, and each one is turned off with `none`:

```css
:root {
  --hx-glass-grain: none; /* frosted glass grain */
  --hx-glass-sheen: none; /* highlight at the top of surfaces */
  --hx-glass-edge: none; /* lit edge */
}
```

### Hover and selection

- **Inside a glass surface** (table rows, list items, ghost button): a light veil,
  `hx:bg-tint-hover` / `hx:bg-tint-active`. Never put an opaque gray there: it erases the glass effect.
- **On an element that is itself glass** (secondary button): `hx:bg-glass-hover` / `hx:bg-glass-active`.

### Blurred elements inside a glass surface

Surfaces (`glass-thin`, `glass`, `glass-strong`, `glass-dialog`) do not blur by themselves: their blur is carried
by an `::after` pseudo-element placed behind their content, set by `--hx-glass-filter`. This way, a blurred element
placed inside (sticky header, floating bar, button) does blur the surface's content. In Chrome, an element that has
a `backdrop-filter` itself prevents its children from blurring what it contains.
So do not use `::after` on a glass surface, nor a negative `z-index` inside it: the blur would cover it.

### Scrolling inside a glass surface

Do not put `overflow: auto` directly on a glass surface (Panel, Card…): its lit edge overflows by 1 px and would
make it scroll horizontally and vertically. Scroll an inner container instead:

```tsx
<Panel className="flex max-h-96 flex-col">
  <div className="min-h-0 overflow-y-auto">…</div>
</Panel>
```

### Stained glass (primary and danger buttons)

`glass-stained` is a translucent, frosted colored glass, like a block of stained glass: vertical gradient, fine
grain, no glow, and a lit border in the glass color (main highlight at the top left and a second reflection at the
bottom right). The content behind the button is blurred.

- **Light mode**: a pale indigo (or red) glass through which the page stays visible, with dark colored text
  (`--hx-primary-stain-text`, `--hx-danger-stain-text`, at least 5.4:1 on hover). Danger has a slightly denser glass
  (`--hx-danger-stain-extra`) so it does not turn gray over the cyan glows. The glass also darkens when pressed.
- **Dark mode**: the same principle, with a slightly denser tinted glass and light colored text (pale indigo and
  red, at least 7.2:1 on hover).

- Color: `--hx-stain` (glass) and `--hx-stain-text` (text), as the danger button does with `--hx-danger-stain`
  and `--hx-danger-stain-text`.
- Density: `--hx-stain-top` and `--hx-stain-bottom` (top and bottom of the gradient), `--hx-stain-hover` (added on
  hover), to be set per theme. If you lower the density, check the text contrast again.

### Tinted glass (switch, checkbox, radio)

`glass-tint` is an almost solid colored glass, for checked controls. It uses `--hx-primary` by default.
Change the color with `--hx-tint-fill` and `--hx-tint-fill-hover`. The fill stays at 85% minimum and the color
must keep at least 4.5:1 with white text.

Available tokens: `--hx-fg`, `--hx-fg-muted`, `--hx-fg-subtle`, `--hx-brand`, `--hx-primary(-hover|-fg)`, `--hx-accent`,
`--hx-danger(-hover|-fg)`, `--hx-danger-solid(-hover)`, `--hx-stain-*`, `--hx-primary-stain(-text)`, `--hx-danger-stain(-text)`, `--hx-ring`, `--hx-glass-thin`, `--hx-glass`, `--hx-glass-strong`,
`--hx-glass-raised`, `--hx-glass-dialog`, `--hx-glass-field`, `--hx-glass-border`, `--hx-glass-blur`, `--hx-tint-hover`,
`--hx-tint-active`, `--hx-backdrop-*`… (see `src/styles/index.css`).

## Components

| Component    | Exports                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Autocomplete | `Autocomplete`, `AutocompleteInput` (`clearable`), `AutocompleteContent`, `AutocompleteList`, `AutocompleteItem`, `AutocompleteEmpty`, `AutocompleteStatus` (`loading`), `AutocompleteGroup`, `AutocompleteGroupLabel`, `AutocompleteCollection`, `AutocompleteSeparator`, `useAutocompleteFilter` — free text with suggestions, see below                                                                                                                                                                                                                                                                                                                |
| Avatar       | `Avatar` (`size`: `xs`, `sm`, `md`, `lg`; `shape`: `circle`, `square`), `AvatarImage`, `AvatarFallback` (initials or icon, shown until the image has loaded), `AvatarGroup` (overlapping avatars), `avatarVariants`                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Backdrop     | `Backdrop` — variants `mesh`, `aurora`, `plain`; textures `grain`, `grid`; `image`, `imageBlur`, `overlay`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Badge        | `Badge`, `badgeVariants` — statuses `neutral`, `info`, `success`, `warning`, `danger`; `dot` for a status dot; icons accepted                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Button       | `Button`, `buttonVariants` — variants `primary`, `secondary`, `outline`, `ghost`, `danger`; sizes `sm`, `md`, `lg`, `icon`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| DropdownMenu | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` — the shadcn/ui names for `Menu` (same components, same rendering)                                                                                                                                                                                                                                                      |
| Field        | `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldItem` — automatically links label, help text and error to the control; `<Field invalid>` or native validation (`required`, `validationMode`) turns the field red                                                                                                                                                                                                                                                                                                                                                                                                                           |
| FieldRow     | `FieldRow` — several `Field`s on one row, stacked when the row gets too narrow (container query: also works in a dialog or a side panel); `columns` (`3` or `"1fr 3fr"`), `stackBelow` (`sm`, `md`, `lg` by default, `xl`)                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Input        | `Input` — error state with `aria-invalid` (or automatically inside an invalid Base UI `Field`); same behavior on `SelectTrigger`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| InputNumber  | `InputNumber` (`min`, `max`, `step`, `decimalPlaces` — `0` by default, `required`, `format`, `locale`, `showSteppers`, `align`) — left-aligned and without −/+ buttons by default; an emptied `required` field goes back to `0` on blur; arrow keys, Shift for `largeStep`; CHF amounts and percentages via `format`                                                                                                                                                                                                                                                                                                                                      |
| Card         | `Card` (a `Panel` with a vertical layout and `p-6` by default; accepts `variant` and `render`, use Tailwind classes to change the padding), `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Checkbox     | `Checkbox` — checked, `indeterminate` and invalid states (`aria-invalid` or inside an invalid `Field`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Collapsible  | `Collapsible`, `CollapsibleTrigger` (style it with `render={<Button variant="ghost" />}`), `CollapsibleChevron` (rotates when open), `CollapsibleContent` (animated height; `hiddenUntilFound` for the browser's find-in-page) — collapsible section                                                                                                                                                                                                                                                                                                                                                                                                      |
| Combobox     | `Combobox`, `ComboboxInput` (`clearable`), `ComboboxChips` (multiple selection), `ComboboxTrigger` + `ComboboxSearch` (dropdown with search), `ComboboxValue`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxEmpty`, `ComboboxStatus` (`loading`), `ComboboxGroup`, `ComboboxGroupLabel`, `ComboboxCollection`, `ComboboxSeparator`, `useComboboxFilter`, `createComboboxItems` — see below                                                                                                                                                                                                                                                 |
| Command      | `Command` (`items`), `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandGroupLabel`, `CommandCollection`, `CommandItem` (`onClick`), `CommandShortcut`, `CommandSeparator`, `CommandDialog` — filterable command palette; see below                                                                                                                                                                                                                                                                                                                                                                                                   |
| DataTable    | `DataTable`, `DataTableHeader`, `DataTableSortableHead`, `DataTableBody`, `nextOrdering` — see below (built-in pagination); `DataTableRow`, `DataTableHead`, `DataTableCell`, `DataTableFooter`, `DataTableCaption`, `DataTableEmpty` (same as their `Table*` counterparts)                                                                                                                                                                                                                                                                                                                                                                               |
| Dialog       | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Toast        | `ToastProvider`, `useToast`, `createToastManager` — see below                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Tooltip      | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Label        | `Label` — label for a control outside a `Field` (switch, inline checkbox); dims with the disabled control it wraps                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Menu         | `Menu`, `MenuTrigger`, `MenuContent`, `MenuItem` (`variant="danger"`), `MenuShortcut`, `MenuSeparator`, `MenuGroup`, `MenuGroupLabel`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`, `MenuSub`, `MenuSubTrigger`, `MenuSubContent`                                                                                                                                                                                                                                                                                                                                                                                                               |
| Menubar      | `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem` (`variant="danger"`), `MenubarShortcut`, `MenubarSeparator`, `MenubarGroup`, `MenubarLabel`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent` — menu bar (File, Edit…) in thin glass, or without background with `variant="ghost"` (inside a glass header); its items are those of `Menu`; `menubarVariants`                                                                                                                                                                                            |
| Pagination   | `Pagination` (`page`, `totalPages`, `onPageChange`, `maxVisible`, labels), `getVisiblePages` — usable on its own, outside a table                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Panel        | `Panel`, `panelVariants` — glass surface with `p-2` by default; variants `thin`, `default`, `strong`; use Tailwind classes to change the padding; `render` prop to change the element (`<aside />`, `<section />`…)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Popover      | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverTitle`, `PopoverDescription`, `PopoverClose` — free-form floating panel (filters, details, small forms)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Progress     | `Progress` (`value`, `null` for an unknown duration; `label`, `showValue`, `format`, `locale`) — progress bar that turns green once complete                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Radio        | `RadioGroup`, `Radio`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Sidebar      | `SidebarProvider`, `Sidebar` (`variant`, `collapsible`, `side`), `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarInsetHeader` (`variant`), `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarSeparator`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton` (`isActive`, `tooltip`, `size`), `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarMenuCollapsible`, `SidebarMenuCollapsibleTrigger`, `SidebarMenuCollapsibleContent`, `useSidebar` — see below |
| Separator    | `Separator` (`orientation`) — thin line between two groups of content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Skeleton     | `Skeleton` — animated loading placeholder                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Select       | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectGroupLabel`, `SelectSeparator`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Sheet        | `Sheet`, `SheetTrigger`, `SheetContent` (`side`, `size`), `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetCloseButton`, `SheetBody`, `SheetFooter`, `SheetClose`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Slider       | `Slider` (`label`, `showValue`, `format`, `locale`, `min`, `max`, `step`; an array value gives a two-thumb range, named by `thumbLabels`; `orientation`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Spinner      | `Spinner` (`size`: `xs`, `sm`, `md`, `lg`; `tone`: `current`, `muted`, `accent`; `label` for screen readers when it stands alone), `spinnerVariants` — keeps spinning, more slowly, when the user reduces motion                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Switch       | `Switch`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Table        | `Table` (`density`), `TableHeader`, `TableBody`, `TableFooter`, `TableRow` (`selected`), `TableHead` (`align`, `sortDirection`, `onSort`), `TableCell` (`align`), `TableCaption`, `TableEmpty` — place it in a `Panel`; built-in horizontal scrolling for wide tables                                                                                                                                                                                                                                                                                                                                                                                     |
| Tabs         | `Tabs`, `TabsList`, `TabsTab`, `TabsPanel`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Toggle       | `Toggle` (`variant`: `default`, `outline`; `size`: `sm`, `md`, `lg`), `ToggleGroup` (single choice, or `multiple`), `toggleVariants` — two-state button, pressed with the same glass as the sidebar's active item                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Textarea     | `Textarea` — same states as `Input`, vertically resizable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### Data table (DataTable)

`DataTable` handles lists fed by a paginated API: sorting, pagination, loading, empty state, sticky header.
It fills its parent's height and scrolls inside: give the `Panel` that contains it a height.
It is **controlled** and does not depend on any router.

```tsx
<Panel className="h-[600px] p-0">
  <DataTable ordering={ordering} onOrderingChange={setOrdering} pagination={data} onSkipChange={setSkip}>
    <DataTableHeader>
      <DataTableRow>
        <DataTableSortableHead field="full_name">Name</DataTableSortableHead>
        <DataTableSortableHead field="total" align="right">
          Total
        </DataTableSortableHead>
      </DataTableRow>
    </DataTableHeader>
    <DataTableBody colSpan={2} isPending={isPending} isEmpty={rows.length === 0} emptyText="No clients.">
      {rows.map((row) => (
        <DataTableRow key={row.id} onClick={() => open(row)}>
          …
        </DataTableRow>
      ))}
    </DataTableBody>
  </DataTable>
</Panel>
```

- `ordering` uses the Django format: `"field"` ascending, `"-field"` descending, `""` none. A click cycles
  ascending → descending → none (`nextOrdering`).
- `pagination` takes the API response directly (`{ total, skip, limit }`); `onSkipChange` receives the new `skip`.
- Remember to reset `skip` to 0 when the search or the sort changes.
- `useDebouncedValue(search, 300)` avoids a request on every keystroke.

**Keeping the state in the URL (react-router)** — shared links and the back button keep the page and the sort:

```tsx
const [params, setParams] = useSearchParams();
const ordering = params.get('ordering') ?? '';
const skip = Number(params.get('skip') ?? 0);

const update = (key: string, value: string | number) =>
  setParams((p) => {
    value ? p.set(key, String(value)) : p.delete(key);
    if (key !== 'skip') p.delete('skip');
    return p;
  }, { replace: true });

<DataTable ordering={ordering} onOrderingChange={(o) => update('ordering', o)}
  pagination={data} onSkipChange={(s) => update('skip', s)}>
```

### Searching a list (Combobox, Autocomplete)

Pick the component that fits the need:

| Need                                                                | Component                                         |
| ------------------------------------------------------------------- | ------------------------------------------------- |
| Few options (fewer than 10), no typing                              | `Select`                                          |
| Pick from a long list by typing to filter (client, employee)        | `Combobox` + `ComboboxInput`                      |
| Several choices, shown as chips                                     | `<Combobox multiple>` + `ComboboxChips`           |
| A field that looks like a Select, with a search inside the dropdown | `Combobox` + `ComboboxTrigger` + `ComboboxSearch` |
| Free text with suggestions (city, description, address)             | `Autocomplete`                                    |

```tsx
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
</Field>
```

- `items` takes the full list, which `ComboboxList` renders once filtered. Objects are filtered and displayed
  through their `label` property. Otherwise, pass `itemToStringLabel` to the `Combobox`.
- **Several choices**: `<Combobox multiple>` with `<ComboboxChips placeholder="…" />`. Backspace removes the
  last chip. `chipLabel` sets the chips' text.
- **Dropdown with search**: replace `ComboboxInput` with
  `<ComboboxTrigger><ComboboxValue placeholder="Choose…" /></ComboboxTrigger>` and add
  `<ComboboxSearch placeholder="Search…" />` at the top of `ComboboxContent`.
- **Groups**: `items={[{ value: 'Consulting', items: [...] }]}`, then `ComboboxGroup`, `ComboboxGroupLabel` and
  `ComboboxCollection` inside `ComboboxList`.
- **Store IDs** rather than objects: `createComboboxItems(clients, { getValue: (c) => c.id, getLabel: (c) => c.name })`.
- `ComboboxEmpty` and `ComboboxStatus` stay mounted so screen readers announce them. Make their **content**
  conditional, not the component.

**Results from an API**: turn off local filtering and query the API on each keystroke.

<!-- prettier-ignore -->
```tsx
const [query, setQuery] = useState('');
const debounced = useDebouncedValue(query, 300);
const { data = [], isPending } = useClients(debounced); // keep the selected client in the list

<Combobox items={data} filter={null} onInputValueChange={setQuery} value={client} onValueChange={setClient}>
  <ComboboxInput placeholder="Search for a client" />
  <ComboboxContent>
    <ComboboxStatus loading={isPending}>{isPending ? 'Searching…' : null}</ComboboxStatus>
    <ComboboxEmpty>{!isPending && query ? 'No client found.' : null}</ComboboxEmpty>
    <ComboboxList>
      {(c: Client) => (
        <ComboboxItem key={c.id} value={c}>
          {c.label}
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

`Autocomplete` is used the same way (`AutocompleteInput`, `AutocompleteContent`, `AutocompleteList`,
`AutocompleteItem`…). Its value is the **typed text**, a string read with `value` / `onValueChange`:
a suggestion only completes that text. `autoHighlight` lets Enter accept the first suggestion.

The buttons' accessible labels (`clearLabel`, `triggerLabel`, `removeLabel`) are in English by default.

### Sidebar

`Sidebar` follows the API of the shadcn/ui sidebar: `SidebarProvider` lays out the page and holds the
open/collapsed state, `Sidebar` contains the navigation, `SidebarInset` the main content.

```tsx
<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>…</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Management</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link to="/invoices" />} isActive tooltip="Invoices">
              <ReceiptText />
              <span>Invoices</span>
            </SidebarMenuButton>
            <SidebarMenuBadge>3</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>…</SidebarFooter>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <SidebarInsetHeader>
      <SidebarTrigger />
      Invoices
    </SidebarInsetHeader>
    …
  </SidebarInset>
</SidebarProvider>
```

- `variant`: `floating` (glass panel set off the edges, default) or `sidebar` (attached to the page edge).
- `collapsible`: `offcanvas` (slides off screen, default), `icon` (keeps only the icons, with labels shown as
  tooltips via `tooltip`) or `none`. `side`: `left` or `right`.
- Below 768 px, it opens in a `Sheet`; `useSidebar().setOpenMobile(false)` closes it after navigating.
- Widths: `--hx-sidebar-width` (16rem), `--hx-sidebar-width-icon` (3rem), `--hx-sidebar-width-mobile` (18rem),
  to override through `style` on `SidebarProvider`.
- Links: `render={<a href="…" />}` or your router's `Link` on `SidebarMenuButton`; `SidebarMenuSubButton`
  renders a link by default.
- Collapsible submenus: `SidebarMenuCollapsible` + `SidebarMenuCollapsibleTrigger` + `SidebarMenuCollapsibleContent`
  (which contains a `SidebarMenuSub`).
- `SidebarInsetHeader` is the content's glass header (sidebar button, title, actions). It stays visible at the top
  of the page and blurs what scrolls underneath. `variant`: `floating` (panel aligned with a floating sidebar,
  default) or `attached` (bar attached to the top, to pair with `variant="sidebar"`).
- The bar is `sticky`, not fixed: it stays in the page flow, even inside a container.
- The `useMediaQuery('(max-width: 767px)')` hook, used for the switch to mobile, is exported too.

**Remembering the state between visits**: control `open` and save it.

```tsx
const [open, setOpen] = useState(() => localStorage.getItem('sidebar') !== 'closed');

<SidebarProvider
  open={open}
  onOpenChange={(value) => {
    setOpen(value);
    localStorage.setItem('sidebar', value ? 'open' : 'closed');
  }}
>
```

### Command palette (Command)

`Command` is a filterable list of actions: type to filter, the arrow keys move the selection, Enter runs the
highlighted action. It is always open: place it in a `CommandDialog`, a `Popover` or a panel.

<!-- prettier-ignore -->
```tsx
const [open, setOpen] = useState(false); // open it with a button or a ⌘K shortcut

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command items={groups}>
    <CommandInput placeholder="Search for an action…" />
    <CommandEmpty>No action found.</CommandEmpty>
    <CommandList>
      {(group: Group) => (
        <CommandGroup key={group.value} items={group.items}>
          <CommandGroupLabel>{group.value}</CommandGroupLabel>
          <CommandCollection>
            {(action: Action) => (
              <CommandItem key={action.value} value={action} onClick={() => run(action)}>
                {action.label}
              </CommandItem>
            )}
          </CommandCollection>
        </CommandGroup>
      )}
    </CommandList>
  </Command>
</CommandDialog>
```

- `items` takes every entry (or groups `{ value, items }`): this is what enables filtering. Objects are
  filtered on their `label` property.
- Unlike `cmdk` (used by shadcn/ui), entries are not declared as static JSX but rendered from `items`.

### Notifications (Toast)

Place `ToastProvider` once around the application, then use `useToast` anywhere below it:

<!-- prettier-ignore -->
```tsx
<ToastProvider>
  <App />
</ToastProvider>

const toast = useToast();
toast.add({ type: 'success', title: 'Invoice sent', description: 'F-2026-1045 has been sent.' });
toast.add({ title: 'Project archived', actionProps: { children: 'Undo', onClick: undo } });
toast.promise(save(), {
  loading: { type: 'loading', title: 'Saving…' },
  success: { type: 'success', title: 'Saved' },
  error: { type: 'error', title: 'Could not save' },
});
```

`type`: `success`, `error`, `warning`, `info`, `loading` (picks the icon). Toasts disappear after 5 s
(`timeout`, `0` to keep them). To create them outside React (API client, store), use `createToastManager()`
and pass it to `<ToastProvider toastManager={manager}>`.

### Side panel (Sheet)

`Sheet` shows a modal panel from an edge of the screen. `side` accepts `top`, `right`, `bottom` or `left`,
and `size` accepts `sm`, `md`, `lg` or `full`. Put content that may scroll in `SheetBody`: the glass surface
stays fixed and its lit edge is never clipped by an `overflow-auto`.

```tsx
<Sheet>
  <SheetTrigger render={<Button variant="secondary" />}>View client</SheetTrigger>
  <SheetContent side="right" size="md">
    <SheetHeader>
      <SheetTitle>Léman Immobilier SA</SheetTitle>
      <SheetDescription>Contact details and recent activity.</SheetDescription>
      <SheetCloseButton aria-label="Close panel" />
    </SheetHeader>
    <SheetBody>…</SheetBody>
    <SheetFooter>
      <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
      <Button>Edit</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

To render a trigger with a button's style, use Base UI's `render` prop:

```tsx
<DialogTrigger render={<Button variant="secondary" />}>Open</DialogTrigger>
```

## Development

```bash
npm run dev              # Storybook at http://localhost:6006
npm run build            # Library build in dist/ (ESM + .d.ts + hexui.css)
npm run typecheck
npm run lint             # ESLint (typescript-eslint, React hooks, Storybook)
npm run format           # Prettier: format every file (format:check only checks)
npm run build-storybook  # Static Storybook in storybook-static/
```

### Structure

```
src/
  styles/index.css         # tokens, glass utilities, accessibility fallbacks
  lib/cn.ts                # class merging (tailwind-merge configured for the hx prefix)
  components/<name>/       # component + stories
  index.ts                 # public exports
.storybook/                # Storybook config (its own vite.config, separate from the library build)
```

### Adding a component

1. Create `src/components/<name>/<Name>.tsx` by wrapping the matching Base UI primitive.
2. Prefix every Tailwind class with `hx:` and use `mergeClassName` for the `className` prop.
3. Add `<Name>.stories.tsx` next to it, then export it from `src/index.ts`.

## License

[MIT](./LICENSE)
