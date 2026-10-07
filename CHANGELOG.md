# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-10-07

### Added

- Glass design system: `--hx-*` design tokens, `hx:`-prefixed Tailwind utilities, layered glass materials (thin, default, strong, dialog, field, tint and stained glass), indigo palette, light and dark themes, and accessible fallbacks for unsupported blur, reduced transparency and high contrast.
- Precompiled stylesheet, importable from CSS (`@import '@hxtc/hexui'`) or from JavaScript (`@hxtc/hexui/styles.css`).
- Layout and surfaces: Panel, Card, Separator, Sheet, Sidebar with inset header, and Backdrop with mesh, aurora and plain variants, grain and grid textures, a themed background image with blur and overlay, and root-level children.
- Actions: Button with primary, secondary, outline, ghost and danger variants, Toggle and ToggleGroup, Menu, DropdownMenu, Menubar, and Command palette with CommandDialog.
- Forms: Field, FieldRow, Label, Input, InputNumber, Textarea, Select, Checkbox, Radio, Switch, Slider with range support, Combobox with multiple selection and searchable dropdown, and Autocomplete.
- Data display: Table with sorting, selection and density, DataTable with server-side sorting and pagination and `DataTable*` aliases for rows, heads and cells, Pagination, Badge, Avatar and AvatarGroup, Tabs, and Collapsible.
- Feedback and overlays: Dialog, Popover, Tooltip, Toast, Progress, Spinner and Skeleton.
- Hooks: `useTheme` with persisted preference and `themeScript` to apply the theme before the first paint, `useMediaQuery` and `useDebouncedValue`.
- `cn` and `mergeClassName` class name helpers.

### Changed

- Reduce the border radius by one step across components.
- Build Card on Panel and DataTable pagination on Pagination.
- Share field control styles across Input, Textarea and Select.
- Replace the Panel `padding` prop with utility classes.
- Use English default accessible labels.
- Remove the Sidebar keyboard shortcut.

### Fixed

- Render the glass blur on a pseudo-element so blurred elements inside glass surfaces display correctly.
- Make the DataTable header sticky as a single blurred surface.
- Align the Slider and Progress indicators with their track.
- Vertically align Checkbox and Radio controls.
- Stabilize Sidebar skeleton widths during hydration.
- Guard theme storage access when localStorage is unavailable.

### Chore

- Library build with Vite, TypeScript and Tailwind CSS: ES modules, type declarations and `'use client'` directives.
- ESLint and Prettier, with TypeScript 6.
- Storybook with docs, accessibility and theme addons, and a background toolbar including image backgrounds.
- MIT license and `@hxtc` npm scope.
- English README and stories.
