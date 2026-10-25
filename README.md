# HexUI

**Hex-Tech's React component library for business applications** — built on [Base UI](https://base-ui.com) and
Tailwind CSS v4, shipped as precompiled CSS, with a sober, professional look.

- **Accessible behavior** from Base UI: keyboard navigation, focus management, ARIA.
- **No Tailwind required**: the stylesheet is precompiled. If you do use Tailwind, nothing collides: every class is
  prefixed with `hx:` and every variable with `--hx-*`, and no global reset is shipped.
- **Light and dark themes**.
- **Typed**: written in TypeScript, ESM only, tree-shakeable, marked `'use client'` for React Server Components.

## Installation

```bash
npm install @hxtc/hexui
```

Requires React 19.

Import the styles once. In an application that uses Tailwind CSS v4, put HexUI **before** Tailwind in the main
stylesheet, so that the classes you pass through `className` win over the component defaults:

```css
/* app.css */
@import '@hxtc/hexui';
@import 'tailwindcss';
```

Without Tailwind, import the stylesheet from your entry point instead:

```tsx
import '@hxtc/hexui/styles.css';
```

## Quick start

```tsx
import { Button } from '@hxtc/hexui';

export function Actions() {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button>Create</Button>
      <Button variant="secondary">Cancel</Button>
    </div>
  );
}
```

## Theme

The light theme applies by default. Add the `dark` class or `data-theme="dark"` to an ancestor (usually `<html>`)
for the dark theme.

`useTheme()` does it for you: it returns `theme` (`light`, `dark` or `system`), `resolvedTheme`, `setTheme` and
`toggleTheme`, saves the choice in the browser and follows the system while the theme is `system`. To avoid a flash
of the light theme on load, run `themeScript` in the `<head>` before the page renders.

The components inherit the font of the page. The library ships a system font stack as `--hx-font-sans` (Segoe UI
on Windows, the system font elsewhere); apply it to your page if you want it:

```css
body {
  font-family: var(--hx-font-sans);
}
```

## Components

On phones (below 768px), the popups of `Select`, `Combobox` and `Menu` can open as a sheet that slides up from the
bottom of the screen, full width, with rows tall enough for a finger: pass `mobile="sheet"` to their content, and
`sheetTitle` for a heading at its top. Above 768px, and without the prop, they float next to their trigger.

- **Accordion** — sections that open one at a time (`multiple` for several): `Accordion` (`defaultValue`, `value`),
  `AccordionItem` (`value`), `AccordionTrigger`, `AccordionContent`. The chevron sits before the heading.
- **AlertDialog** — a confirmation before an action, such as a deletion: same parts as `Dialog` (`AlertDialogContent`,
  `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogClose`…), but a click on the veil
  does not close it.
- **AppHeader** — the dark bar across the top of an application: `AppHeader`,
  `AppHeaderBrand` (the product name, a link: `href` or `render`), `AppHeaderActions` (buttons on the right). Use
  `Button variant="header"` inside. With a sidebar, make it the first child of `SidebarProvider` so a
  `SidebarTrigger variant="header"` can go in it; the sidebar and page headers then stick below the bar. Colors and
  height: `--hx-header`, `--hx-header-fg`, `--hx-header-height` (40px).
- **Autocomplete** — a text input with suggestions; free text is accepted. `AutocompleteInput` (`clearable`),
  `AutocompleteContent`, `AutocompleteList`, `AutocompleteItem`, `AutocompleteEmpty`, `AutocompleteStatus` (`loading`),
  groups and separators; `useAutocompleteFilter`.
- **Avatar** — initials or a picture: `Avatar` (`size`: `xs`, `sm`, `md`, `lg`; `shape`: `circle`, `square`),
  `AvatarImage`, `AvatarFallback` (shown while the picture loads or if it fails); `AvatarGroup` overlaps them.
- **Badge** — a small status label; `variant`: `neutral`, `brand` (blue), `info` (cyan), `success`, `warning`,
  `danger`, `purple`, each a pale fill, a soft edge and strong text from the `--hx-badge-*` tokens; `dot`: a colored dot before
  the text.
- **Breadcrumb** — the path to the current page: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`
  (`render` for a router link), `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`.
- **Button** — `variant`: `primary`, `secondary`, `outline`, `ghost`, `danger`, `outline-danger`, `header` (for the `AppHeader`); `size`: `sm`
  (24px), `md` (32px), `lg` (40px), `icon`; `ring`: a second border 2px around the button, to set an action apart;
  `startIcon`, `endIcon`: an icon before or after the label; `loading`: a spinner, and the button is disabled. `buttonVariants` gives the same classes to another
  element, such as a link.
- **ButtonGroup** — buttons attached in a row: only the outer corners stay rounded, outline borders merge, and
  filled buttons get a thin line between them. For a split button (an action and a menu of others) or related
  actions; `orientation`: `horizontal`, `vertical`. Give it an `aria-label`.
- **Card** — a `Panel` laid out as a card: `CardHeader` with `CardTitle`, `CardDescription` and `CardAction` (a button
  or a menu in the top right corner), `CardContent`, `CardFooter`.
- **Checkbox** — `checked`, `defaultChecked`, `indeterminate`; blue once checked.
- **Collapsible** — a block that opens and closes: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`,
  `CollapsibleChevron` (turns when open).
- **Combobox** — pick one or several values from a list by typing. `ComboboxInput` (`clearable`), `ComboboxChips`
  for multiple values, or `ComboboxTrigger` with `ComboboxSearch` inside the popup for a select with a search;
  `ComboboxContent` (`mobile`, `sheetTitle`), `ComboboxList`, `ComboboxItem`, `ComboboxEmpty`, `ComboboxStatus` (`loading`), groups and
  separators; `useComboboxFilter`, `createComboboxItems`.
- **Command** — a command palette with a search: `Command` (inline) or `CommandDialog` (over the page, for ⌘K),
  `CommandInput`, `CommandList`, `CommandItem` (`onClick`, also fired by Enter), `CommandEmpty`, groups, separators and
  `CommandShortcut`.
- **ContextMenu** — the menu of a right click on `ContextMenuTrigger` (`render` to make a table row the trigger):
  `ContextMenuContent` and the same items as `Menu` (`ContextMenuItem`, `ContextMenuSub`…).
- **DataTable** — a table for server data: a sticky header, scrolling inside its parent (give the parent a height),
  sortable columns with a Django-style `ordering` (`"field"`, `"-field"`, `""`) through `DataTableSortableHead`,
  skeleton rows while loading (`DataTableBody` `isPending`), an empty state (`isEmpty`, `emptyText`) and pagination
  from `{ total, skip, limit }` (`pagination`, `onSkipChange`). `showCurrent` marks the row opened last with a blue
  bar, so it stands out when the user comes back from its details: give each `DataTableRow` a `value`; a row counts
  as opened when it is clicked (with an `onClick`) or when a link inside it is followed.
- **Dialog** — a modal window over a dark veil: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`,
  `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`.
- **DropdownMenu** — the shadcn/ui names for `Menu`: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`,
  `DropdownMenuItem`… Same parts, same look.
- **Field** — label, description and error around a control: `Field` (`invalid`, `disabled`, `validationMode`),
  `FieldLabel`, `FieldDescription`, `FieldError` (`match`), `FieldItem`; `FieldRow` lays fields out in columns that
  stack on narrow rows (`columns`, `stackBelow`).
- **FormSection** — groups fields under a heading (`title`, `description`), with a line between sections. Put the
  sections in a plain `<form>`, or the one of your form library such as react-hook-form; a submit button can sit in the
  `PageHeaderActions` of a form that wraps the page, or anywhere with `form="<id>"`.
- **Input** — a text field: a soft gray box with no frame, and on focus a 2px accent underline that grows from the
  center. Flag an invalid value with `aria-invalid` (red underline). `startIcon`, `endIcon`: an icon
  before or after the text.
- **InputNumber** — a number field; arrow keys change the value. `min`, `max`, `step`; `decimalPlaces`: fixed
  digits after the separator; `format` and `locale` (`Intl.NumberFormat` options: currency, percent); `required`:
  restores `0` when cleared; `showSteppers`: − and + buttons on each side; `align`: `left`, `center`, `right`.
- **Label** — a label outside a `Field`: wrapping a checkbox or a switch, or linked with `htmlFor`; `required` adds a
  red asterisk. Inside a `Field`, use `FieldLabel`.
- **MessageBar** — a message across a page or a form: `intent`: `info`, `success`, `warning`,
  `danger`; `MessageBarBody` with `MessageBarTitle`, `MessageBarActions`; `onDismiss` adds a close button.
- **Menubar** — a row of menus, as in a desktop app: `Menubar` (`variant`: `default`, a white strip; `ghost`, for a
  bar inside a header), `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, and the same items as `Menu`. Arrow keys
  move between the menus.
- **Menu** — a list of actions opened by a button: `Menu`, `MenuTrigger`, `MenuContent` (`mobile`, `sheetTitle`), `MenuItem` (`variant`:
  `danger`), `MenuCheckboxItem`, `MenuRadioGroup` and `MenuRadioItem`, `MenuGroup` and `MenuGroupLabel`,
  `MenuSeparator`, `MenuShortcut`, and submenus with `MenuSub`, `MenuSubTrigger`, `MenuSubContent`.
- **PageHeader** — the top of a page (`sticky`: the whole header stays at the top while the
  page scrolls): a `Breadcrumb`, `PageHeaderHeading` with
  `PageHeaderTitle` and `PageHeaderDescription`, then `PageHeaderActions`, a command bar of `ghost` buttons above a light
  line (`sticky`: stays at the top while the page scrolls). `PageHeaderActionSeparator` splits it into groups;
  `PageHeaderActionLabel` hides a button's text on narrow screens.
- **Pagination** — `page` (1-based), `totalPages`, `onPageChange`; `maxVisible` page buttons, ellipses included.
- **Panel** — a white surface with a card shadow and no imposed layout; `render` changes the element, such as an
  `<aside>`.
- **Popover** — a floating panel opened by a button, for filters or details: `Popover`, `PopoverTrigger`,
  `PopoverContent` (`side`, `align`), `PopoverTitle`, `PopoverDescription`, `PopoverClose`.
- **Progress** — a progress bar: `value` (0–100, `null` for an unknown duration), `label`, `showValue`; `size`: `md`
  (2px), `lg` (4px); `intent`: `brand`, `success`, `warning`, `danger`.
- **Radio** — `RadioGroup` (`value`, `defaultValue`) with `Radio` items; a blue ring and dot once checked.
- **SafeArea** — keeps content clear of the notch, the status bar and the home indicator on phones: wrap the app root;
  `topClassName` and `bottomClassName` style the two bands (e.g. `hx:bg-header` under an `AppHeader`). The page needs
  `viewport-fit=cover` in its viewport meta tag, otherwise the insets are 0.
- **Select** — a button that opens a list: `Select` (`items`), `SelectTrigger`, `SelectValue` (`placeholder`),
  `SelectContent` (`mobile`, `sheetTitle`), `SelectItem`, `SelectGroup`, `SelectGroupLabel`, `SelectSeparator`.
- **Separator** — a 1px line between groups of content; `orientation`: `horizontal`, `vertical`.
- **Sheet** — a panel that slides in from an edge of the screen, over a dark veil: `Sheet`, `SheetTrigger`,
  `SheetContent` (`side`: `top`, `right`, `bottom`, `left`; `size`: `sm`, `md`, `lg`, `full`), `SheetHeader`,
  `SheetTitle`, `SheetDescription`, `SheetBody` (scrolls), `SheetFooter`, `SheetClose`, `SheetCloseButton`.
- **Sidebar** — the navigation column of an application: `SidebarProvider` around the page, `Sidebar` (`variant`:
  `sidebar`, a column against the edge, `floating`, a card beside the page, or `inset`, a gray column with the page as
  a white card beside it; `collapsible`: `offcanvas`, `icon`, `none`; `side`), `SidebarInset` for the page (its
  `--hx-inset-height` is the height a full-height page can fill), `SidebarTrigger` and `SidebarRail` to toggle it. Inside:
  `SidebarHeader`, `SidebarContent`, `SidebarFooter`, groups with `SidebarGroupLabel`, and menus with
  `SidebarMenuButton` (`isActive`: gray fill, semibold text and a blue bar; `tooltip` when collapsed to icons), badges, actions,
  sub-menus and collapsible sections. Below 768px it opens as a `Sheet`. Under an `AppHeader`, it sticks below the bar. `useSidebar` reads and changes its state.
- **Skeleton** — a gray block with a shimmer, in place of content that is loading; size it with classes.
- **Slider** — one value or a range (an array): `label`, `showValue`, `min`, `max`, `step`, `format`; `thumbLabels`
  names the thumbs of a range for screen readers.
- **Spinner** — a turning arc for a wait of unknown length: `size` (`xs` 12px to `xl` 40px), `tone`: `accent` (blue,
  the default), `muted`, `current` (the text color); `label`: announced by screen readers when no visible text says
  what is loading.
- **Switch** — an on/off toggle; a blue track with a white thumb once on.
- **Table** — `Table` (`density`: `comfortable`, `compact`), `TableHeader`, `TableBody`, `TableFooter`, `TableRow`
  (`selected`; `current`: a blue bar on the left of the row opened last), `TableHead` (`align`, `sortDirection` and `onSort` for a sortable column), `TableCell` (`align`),
  `TableCaption`, `TableEmpty`. Put it in a `Panel`.
- **Tabs** — `Tabs`, `TabsList`, `TabsTab`, `TabsPanel`; the active tab is marked by a blue bar that slides under it.
- **Textarea** — a multiline text field with the same look as `Input`; resizable vertically.
- **Toast** — short notifications stacked at the bottom right. Wrap the app in `ToastProvider`, then call
  `useToast().add({ title, description, type })` with `type`: `success`, `error`, `warning`, `info`, `loading`;
  `createToastManager` sends toasts from outside React.
- **Toggle** — a button that stays pressed (`pressed`, `onPressedChange`); `variant`: `outline`, `subtle`.
  `ToggleGroup` attaches toggles for a choice among several (`multiple` for several at once).
- **Tooltip** — a short label on hover or focus: `Tooltip`, `TooltipTrigger`, `TooltipContent` (`side`, default
  `top`). `TooltipProvider` shares the open delay, so moving between triggers shows the next tooltip at once.

## Contributing

```bash
git clone https://github.com/noah-bar/HexUI.git
cd HexUI
npm install
npm run dev              # Storybook at http://localhost:6006
npm run build            # Library build in dist/ (ESM + .d.ts + hexui.css)
npm run typecheck
npm run lint             # ESLint (typescript-eslint, React hooks, Storybook)
npm run format           # Prettier
```

## License

[MIT](https://github.com/noah-bar/HexUI/blob/main/LICENSE) © Hex-Tech
