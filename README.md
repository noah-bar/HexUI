# @hex-tech/hexui

Librairie de composants React de Hex-Tech — [Base UI](https://base-ui.com) + Tailwind CSS v4, avec un glassmorphisme pensé pour des interfaces professionnelles.

## Installation

```bash
npm install @hex-tech/hexui
```

```tsx
// Point d'entrée de l'application, une seule fois
import '@hex-tech/hexui/styles.css';

import { Button, Card, CardHeader, CardTitle } from '@hex-tech/hexui';
```

Prérequis : React 19. **Tailwind n'est pas requis** côté application : le CSS est précompilé.

### Cohabitation avec le Tailwind de l'application

Toutes les classes internes sont préfixées `hx:` et toutes les variables `--hx-*` : aucune collision avec
votre propre configuration Tailwind. La librairie n'embarque pas de reset global (preflight) et ne modifie
donc pas les styles de votre application.

Vous pouvez passer vos propres classes via `className`, elles s'ajoutent à celles du composant.

## Thème clair / sombre

Ajoutez `class="dark"` (ou `data-theme="dark"`) sur `<html>`. Il faut que ce soit sur `<html>` (et pas sur un
wrapper), parce que les dialogues, selects et tooltips sont rendus dans un portal à la racine du document.

## Personnalisation

Surchargez les variables CSS après l'import des styles :

```css
:root {
  --hx-primary: oklch(0.55 0.18 150);
  --hx-glass-blur: 12px;
}
.dark {
  --hx-primary: oklch(0.7 0.15 150);
}
```

Tokens disponibles : `--hx-fg`, `--hx-fg-muted`, `--hx-fg-subtle`, `--hx-primary(-hover|-fg)`, `--hx-danger(-hover|-fg)`,
`--hx-ring`, `--hx-glass`, `--hx-glass-strong`, `--hx-glass-field`, `--hx-glass-border`, `--hx-glass-blur`… (voir `src/styles/index.css`).

## Composants

| Composant | Exports |
| --- | --- |
| Button | `Button`, `buttonVariants` — variantes `primary`, `secondary`, `ghost`, `danger` ; tailles `sm`, `md`, `lg`, `icon` |
| Input | `Input` |
| Card | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| Dialog | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` |
| Tooltip | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` |
| Select | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectGroupLabel`, `SelectSeparator` |
| Switch | `Switch` |
| Tabs | `Tabs`, `TabsList`, `TabsTab`, `TabsPanel` |

Pour rendre un trigger avec le style d'un bouton, utilisez la prop `render` de Base UI :

```tsx
<DialogTrigger render={<Button variant="secondary" />}>Ouvrir</DialogTrigger>
```

## Développement

```bash
npm run dev              # Storybook sur http://localhost:6006
npm run build            # Build de la librairie dans dist/ (ESM + .d.ts + hexui.css)
npm run typecheck
npm run build-storybook  # Storybook statique dans storybook-static/
```

### Structure

```
src/
  styles/index.css         # tokens, utilitaires glass, replis d'accessibilité
  lib/cn.ts                # fusion de classes (tailwind-merge configuré pour le préfixe hx)
  components/<nom>/        # composant + stories
  index.ts                 # exports publics
.storybook/                # config Storybook (son propre vite.config, distinct du build lib)
```

### Ajouter un composant

1. Créer `src/components/<nom>/<Nom>.tsx` en enveloppant la primitive Base UI correspondante.
2. Préfixer toutes les classes Tailwind par `hx:` et utiliser `mergeClassName` pour la prop `className`.
3. Ajouter `<Nom>.stories.tsx` à côté, puis exporter depuis `src/index.ts`.
