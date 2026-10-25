# HexUI

**Hex-Tech's React component library for business applications** — built on [Base UI](https://base-ui.com) and
Tailwind CSS v4, shipped as precompiled CSS, with a sober look in the spirit of Microsoft Fluent and the Azure portal.

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

The components inherit the font of the page. The library ships the Fluent font stack as `--hx-font-sans` (Segoe UI
on Windows, the system font elsewhere); apply it to your page if you want it:

```css
body {
  font-family: var(--hx-font-sans);
}
```

## Components

- **Autocomplete** — a text input with suggestions; free text is accepted. `AutocompleteInput` (`clearable`),
  `AutocompleteContent`, `AutocompleteList`, `AutocompleteItem`, `AutocompleteEmpty`, `AutocompleteStatus` (`loading`),
  groups and separators; `useAutocompleteFilter`.
- **Badge** — a small status label; `variant`: `neutral`, `info`, `success`, `warning`, `danger`; `dot`: a colored dot
  before the text.
- **Breadcrumb** — the path to the current page: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`
  (`render` for a router link), `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`.
- **Button** — `variant`: `primary`, `secondary`, `outline`, `ghost`, `danger`, `outline-danger`; `size`: `sm`
  (24px), `md` (32px), `lg` (40px), `icon`; `ring`: a second border 2px around the button, to set an action apart;
  `startIcon`, `endIcon`: an icon before or after the label. `buttonVariants` gives the same classes to another
  element, such as a link.
- **Checkbox** — `checked`, `defaultChecked`, `indeterminate`; blue once checked.
- **Combobox** — pick one or several values from a list by typing. `ComboboxInput` (`clearable`), `ComboboxChips`
  for multiple values, or `ComboboxTrigger` with `ComboboxSearch` inside the popup for a select with a search;
  `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxEmpty`, `ComboboxStatus` (`loading`), groups and
  separators; `useComboboxFilter`, `createComboboxItems`.
- **Dialog** — a modal window over a dark veil: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`,
  `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`.
- **Field** — label, description and error around a control: `Field` (`invalid`, `disabled`, `validationMode`),
  `FieldLabel`, `FieldDescription`, `FieldError` (`match`), `FieldItem`; `FieldRow` lays fields out in columns that
  stack on narrow rows (`columns`, `stackBelow`).
- **Input** — a filled text field: gray background, darker bottom edge, and on focus a 2px accent underline that
  grows from the center. Flag an invalid value with `aria-invalid` (red underline). `startIcon`, `endIcon`: an icon
  before or after the text.
- **InputNumber** — a number field; arrow keys change the value. `min`, `max`, `step`; `decimalPlaces`: fixed
  digits after the separator; `format` and `locale` (`Intl.NumberFormat` options: currency, percent); `required`:
  restores `0` when cleared; `showSteppers`: − and + buttons on each side; `align`: `left`, `center`, `right`.
- **Panel** — a white surface with a card shadow and no imposed layout; `render` changes the element, such as an
  `<aside>`.
- **Popover** — a floating panel opened by a button, for filters or details: `Popover`, `PopoverTrigger`,
  `PopoverContent` (`side`, `align`), `PopoverTitle`, `PopoverDescription`, `PopoverClose`.
- **Radio** — `RadioGroup` (`value`, `defaultValue`) with `Radio` items; a blue ring and dot once checked.
- **Select** — a button that opens a list: `Select` (`items`), `SelectTrigger`, `SelectValue` (`placeholder`),
  `SelectContent`, `SelectItem`, `SelectGroup`, `SelectGroupLabel`, `SelectSeparator`.
- **Switch** — an on/off toggle; a blue track with a white thumb once on.
- **Textarea** — a multiline text field with the same look as `Input`; resizable vertically.
- **Toast** — short notifications stacked at the bottom right. Wrap the app in `ToastProvider`, then call
  `useToast().add({ title, description, type })` with `type`: `success`, `error`, `warning`, `info`, `loading`;
  `createToastManager` sends toasts from outside React.
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
