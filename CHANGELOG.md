# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.1] - 2026-10-07

### Fixed

- Publish the compiled 0.4.0 changes: the 0.4.0 package shipped the 0.3.1 build, without `SafeArea` or the new glass styles.

### Chore

- Compile the library automatically before publishing (`prepublishOnly`).

## [0.4.0] - 2026-10-07

### Added

- `SafeArea`: keeps content clear of the notch, status bar and home indicator, with styleable top and bottom bands.

### Changed

- Light theme primary and danger buttons: deeper stained glass gradient, firmer colored frame and a shadow tinted with the pane color.
- Dark theme active navigation items (Sidebar, Tabs, Menubar, Toggle): clear glass chip with a lit border and top rim instead of an opaque gray fill.
- Active Sidebar sub-items use the same glass chip as top-level items.

### Fixed

- Remove the saturating backdrop blur from the Tabs indicator, which tinted the active tab with the backdrop color.

### Chore

- Document the `SafeArea` component and its `viewport-fit=cover` requirement.

## [0.3.1] - 2026-10-07

### Changed

- Wider default mobile Sidebar: the screen width minus 3rem, up to 24rem (was 18rem).

### Fixed

- Apply `--hx-sidebar-width-mobile` to the mobile Sidebar sheet, which ignored it and shrank to its content.

### Chore

- Document the default mobile Sidebar width.

## [0.3.0] - 2026-10-07

### Added

- Menubar `ghost` variant, without its own glass strip, for menu bars inside a glass header; `menubarVariants` export.
- DataTable cell text no longer wraps: wide tables scroll horizontally, and `whitespace-normal` opts a cell out.

### Changed

- **Breaking:** `SidebarTrigger` takes its icon as required children, from any icon library; the built-in icon is removed.

### Chore

- Document the Menubar `ghost` variant, non-wrapping DataTable cells and `SidebarTrigger` icons.

## [0.2.0] - 2026-10-07

### Added

- `useTheme` hook: persisted light, dark or system preference, synchronized across tabs, with `themeScript` to apply the theme before the first paint.
- Backdrop: root-level children, and a themed background image with `image`, `imageBlur` and `overlay`.
- Stylesheet importable from CSS with `@import '@hxtc/hexui'` (`style` export condition).
- `DataTableRow`, `DataTableHead`, `DataTableCell`, `DataTableFooter`, `DataTableCaption` and `DataTableEmpty` aliases.

### Changed

- **Breaking:** default accessible labels are now in English.
- **Breaking:** remove the Sidebar keyboard shortcut and the `keyboardShortcut` prop.
- **Breaking:** replace the Panel `padding` prop with utility classes.
- License the package under MIT.
- Remove redundant code comments.

### Fixed

- Tighten the gap around the floating Sidebar content.

### Chore

- ESLint and Prettier, with TypeScript 6.
- English README, stories and Storybook introduction.
- Storybook background toolbar with sharp and blurred image backgrounds.

## [0.1.0] - 2026-10-07

### Added

- Glass design system: `--hx-*` design tokens, `hx:`-prefixed Tailwind utilities, layered glass materials (thin, default, strong, dialog, field, tint and stained glass), indigo palette, light and dark themes, and accessible fallbacks for unsupported blur, reduced transparency and high contrast.
- Precompiled stylesheet (`@hxtc/hexui/styles.css`).
- Layout and surfaces: Panel, Card, Separator, Sheet, Sidebar with inset header, and Backdrop with mesh, aurora and plain variants and grain and grid textures.
- Actions: Button with primary, secondary, outline, ghost and danger variants, Toggle and ToggleGroup, Menu, DropdownMenu, Menubar, and Command palette with CommandDialog.
- Forms: Field, FieldRow, Label, Input, InputNumber, Textarea, Select, Checkbox, Radio, Switch, Slider with range support, Combobox with multiple selection and searchable dropdown, and Autocomplete.
- Data display: Table with sorting, selection and density, DataTable with server-side sorting and pagination, Pagination, Badge, Avatar and AvatarGroup, Tabs, and Collapsible.
- Feedback and overlays: Dialog, Popover, Tooltip, Toast, Progress, Spinner and Skeleton.
- Hooks: `useMediaQuery` and `useDebouncedValue`.
- `cn` and `mergeClassName` class name helpers.

### Changed

- Reduce the border radius by one step across components.
- Build Card on Panel and DataTable pagination on Pagination.
- Share field control styles across Input, Textarea and Select.

### Fixed

- Render the glass blur on a pseudo-element so blurred elements inside glass surfaces display correctly.
- Make the DataTable header sticky as a single blurred surface.
- Align the Slider and Progress indicators with their track.
- Vertically align Checkbox and Radio controls.
- Stabilize Sidebar skeleton widths during hydration.

### Chore

- Library build with Vite, TypeScript and Tailwind CSS: ES modules, type declarations and `'use client'` directives.
- Storybook with docs, accessibility and theme addons, and a background toolbar.
