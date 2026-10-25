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

- **Button** — `variant`: `primary`, `secondary`, `outline`, `ghost`, `danger`, `outline-danger`; `size`: `sm`
  (24px), `md` (32px), `lg` (40px), `icon`; `ring`: a second border 2px around the button, to set an action apart;
  `startIcon`, `endIcon`: an icon before or after the label. `buttonVariants` gives the same classes to another
  element, such as a link.

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
