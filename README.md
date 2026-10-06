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

## Fond de page

Le verre a besoin de quelque chose derrière lui pour se voir. `Backdrop` pose un fond décoratif,
fixé derrière toute l'application, qui suit les couleurs du thème :

```tsx
<Backdrop />                                   {/* mesh, subtil : le réglage par défaut */}
<Backdrop variant="aurora" intensity="medium" /> {/* page de connexion, écran d'accueil */}
<Backdrop variant="plain" texture="grid" />      {/* écrans denses : tableaux, back-office */}
```

- `variant` : `mesh` · `aurora` · `plain` — `intensity` : `subtle` · `medium` — `texture` : `none` · `grain` · `grid`
- `position="absolute"` le limite à un conteneur positionné (ajoutez `isolation: isolate` sur ce conteneur).
- Placé avec un `z-index` négatif : si un wrapper de votre application a déjà une couleur de fond, il le masquera.
- Il est optionnel : les composants restent lisibles sans lui.
- Couleurs personnalisables avec `--hx-backdrop-base` et `--hx-backdrop-accent-1` à `-3`. Le premier accent suit `--hx-brand`.

## Thème clair / sombre

Ajoutez `class="dark"` (ou `data-theme="dark"`) sur `<html>`. Il faut que ce soit sur `<html>` (et pas sur un
wrapper), parce que les dialogues, selects et tooltips sont rendus dans un portal à la racine du document.

## Personnalisation

La palette par défaut est un indigo sur des gris neutres : les teintes froides restent lumineuses
une fois floutées, ce qui convient au verre. Trois rôles de couleur :

| Token | Valeur | Usage |
| --- | --- | --- |
| `--hx-brand` | `#6366f1` | Décoratif : halos du fond, survol des listes. |
| `--hx-primary` | `#4f46e5` | Fonds pleins avec texte blanc (boutons, switch) : 6,3:1. |
| `--hx-accent` | `#4f46e5` clair / `#818cf8` sombre | Couleur de marque posée sur une surface : icônes, bordures de focus, coches. |

Surchargez les variables CSS après l'import des styles :

```css
:root {
  --hx-glass-blur: 12px;
}
.dark {
  --hx-accent: #a5b4fc;
}
```

Si vous changez `--hx-primary`, vérifiez que le texte `--hx-primary-fg` garde un contraste d'au moins 4,5:1.

Les détails du matériau sont réglables, et chacun se désactive avec `none` :

```css
:root {
  --hx-glass-grain: none; /* grain de verre dépoli */
  --hx-glass-sheen: none; /* reflet en haut des surfaces */
  --hx-glass-edge: none;  /* bord éclairé */
}
```

Tokens disponibles : `--hx-fg`, `--hx-fg-muted`, `--hx-fg-subtle`, `--hx-brand`, `--hx-primary(-hover|-fg)`, `--hx-accent`,
`--hx-danger(-hover|-fg)`, `--hx-ring`, `--hx-glass`, `--hx-glass-strong`, `--hx-glass-field`, `--hx-glass-border`,
`--hx-glass-blur`, `--hx-backdrop-*`… (voir `src/styles/index.css`).

## Composants

| Composant | Exports |
| --- | --- |
| Backdrop | `Backdrop` — variantes `mesh`, `aurora`, `plain` ; textures `grain`, `grid` |
| Button | `Button`, `buttonVariants` — variantes `primary`, `secondary`, `ghost`, `danger` ; tailles `sm`, `md`, `lg`, `icon` |
| Input | `Input` |
| Card | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| Dialog | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` |
| Tooltip | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` |
| Panel | `Panel`, `panelVariants` — surface en verre sans mise en page ; variantes `thin`, `default`, `strong` ; marge interne `none`, `sm`, `md`, `lg` ; prop `render` pour changer l'élément (`<aside />`, `<section />`…) |
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
