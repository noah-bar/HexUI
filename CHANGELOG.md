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
- `Toast`, stacked notifications with status icons, actions and promise support.
- Status text tokens (`success`, `warning`, `info`) and the dialog `overlay` token.
- `useDebouncedValue` hook.
- `cn` to merge class names.
