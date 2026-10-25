# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Design tokens for the light and dark themes: Fluent neutral grays, Azure blue, depth shadows.
- `Button` with `primary`, `secondary`, `outline`, `ghost`, `danger` and `outline-danger` variants and `sm`, `md`, `lg` and `icon` sizes, an optional `ring` around the button, and `startIcon` and `endIcon` props.
- `InputNumber`, a number field with bounds, fixed decimals, number formatting, optional steppers and alignment.
- `Panel`, a surface with a card shadow.
- `Textarea`, a multiline text field.
- `Input`, a text field with focus, invalid and disabled states, and `startIcon` and `endIcon` props.
- `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldItem` and `FieldRow` for form layout and validation.
- `Select`, a list behind a button.
- `Combobox`, a searchable list with single or multiple values, as an input, chips, or a button with a search inside.
- `Autocomplete`, a text input with suggestions.
- `Dialog`, a modal window with header, title, description and footer.
- `Checkbox`, `Radio` and `RadioGroup`, and `Switch`.
- `Badge` with `neutral`, `info`, `success`, `warning` and `danger` variants.
- `Breadcrumb` with links, separators and an ellipsis.
- `Tabs` with a sliding active bar.
- `Table` with sortable columns, selected rows, compact density and an empty state.
- `Menu` and its `DropdownMenu` aliases, with checkbox and radio items, groups, shortcuts and submenus.
- `Pagination` with previous and next buttons and ellipses.
- `DataTable` with a sticky header, Django-style ordering, loading skeletons, an empty state and pagination.
- `Skeleton`, a loading placeholder with a shimmer.
- `Spinner`, a loading indicator in five sizes; `Button` `loading` uses it.
- `Form` with server errors by field name, and `FormSection` to group fields under a heading.
- `loading` prop on `Button`.
- `PageHeader` with a title, a description and a command bar that can stick to the top.
- `AppHeader`, a dark bar across the top of the page, and the `header` button variant.
- `Sidebar` with collapsing to icons, a mobile drawer, groups, badges, actions and collapsible sections.
- `Menubar`, a row of menus with keyboard navigation between them.
- `Sheet`, a panel that slides in from an edge of the screen.
- `Avatar` and `Separator`.
- `useMediaQuery` hook.
- `Popover`, a floating panel with title and description.
- `Tooltip`, a short label on hover or focus.
- `Toast`, stacked notifications with status icons, actions and promise support.
- Status text tokens (`success`, `warning`, `info`) and the dialog `overlay` token.
- `useDebouncedValue` hook.
- `cn` to merge class names.
