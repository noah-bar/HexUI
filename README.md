# @hxtc/hexui

Librairie de composants React de Hex-Tech — [Base UI](https://base-ui.com) + Tailwind CSS v4, avec un glassmorphisme pensé pour des interfaces professionnelles.

## Installation

```bash
npm install @hxtc/hexui
```

```tsx
// Point d'entrée de l'application, une seule fois
import '@hxtc/hexui/styles.css';

import { Button, Card, CardHeader, CardTitle } from '@hxtc/hexui';
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

### Survol et sélection

- **À l'intérieur d'une surface en verre** (lignes de tableau, éléments de liste, bouton ghost) : voile léger
  `hx:bg-tint-hover` / `hx:bg-tint-active`. Ne jamais y poser un gris opaque, qui efface l'effet de verre.
- **Sur un élément qui est lui-même en verre** (bouton secondary) : `hx:bg-glass-hover` / `hx:bg-glass-active`.

### Éléments flous dans une surface en verre

Les surfaces (`glass-thin`, `glass`, `glass-strong`, `glass-dialog`) ne floutent pas elles-mêmes : leur flou est
porté par un pseudo-élément `::after` placé derrière leur contenu, réglé par `--hx-glass-filter`. Ainsi, un élément
flou placé à l'intérieur (en-tête collant, barre flottante, bouton) floute bien le contenu de la surface. Dans
Chrome, un élément qui a lui-même un `backdrop-filter` empêche ses enfants de flouter ce qu'il contient.
N'utilisez donc pas `::after` sur une surface en verre, ni de `z-index` négatif à l'intérieur : le flou le recouvrirait.

### Défilement dans une surface en verre

Ne mettez pas `overflow: auto` directement sur une surface en verre (Panel, Card…) : son bord éclairé dépasse
de 1 px et la ferait défiler en largeur et en hauteur. Faites défiler un conteneur intérieur :

```tsx
<Panel className="flex max-h-96 flex-col">
  <div className="min-h-0 overflow-y-auto">…</div>
</Panel>
```

### Vitrail (boutons primary et danger)

`glass-stained` est un verre coloré translucide et dépoli, comme un bloc de vitrail : dégradé vertical, grain fin,
aucun halo, et une bordure éclairée dans la couleur du verre (éclat principal en haut à gauche et second reflet en bas
à droite). Le contenu derrière le bouton est flouté.

- **Mode clair** : un verre indigo (ou rouge) pâle, à travers lequel la page reste visible, avec un texte coloré foncé
  (`--hx-primary-stain-text`, `--hx-danger-stain-text`, au moins 5,4:1 au survol). Le danger a un verre un peu plus
  dense (`--hx-danger-stain-extra`) pour ne pas tirer vers le gris sur les halos cyan. Le verre fonce aussi à l'appui.
- **Mode sombre** : le même principe, avec un verre teinté un peu plus dense et un texte clair coloré (indigo et rouge
  pâles, au moins 7,2:1 au survol).

- Couleur : `--hx-stain` (verre) et `--hx-stain-text` (texte), comme le fait le bouton danger avec `--hx-danger-stain`
  et `--hx-danger-stain-text`.
- Densité : `--hx-stain-top` et `--hx-stain-bottom` (haut et bas du dégradé), `--hx-stain-hover` (ajouté au survol),
  à régler par thème. Si vous baissez la densité, revérifiez le contraste du texte.

### Verre teinté (switch, checkbox, radio)

`glass-tint` est un verre coloré presque plein, pour les contrôles cochés. Il utilise `--hx-primary` par défaut.
On change la couleur avec `--hx-tint-fill` et `--hx-tint-fill-hover`. Le remplissage reste à 85 % minimum et
la couleur doit garder au moins 4,5:1 avec le texte blanc.

Tokens disponibles : `--hx-fg`, `--hx-fg-muted`, `--hx-fg-subtle`, `--hx-brand`, `--hx-primary(-hover|-fg)`, `--hx-accent`,
`--hx-danger(-hover|-fg)`, `--hx-danger-solid(-hover)`, `--hx-stain-*`, `--hx-primary-stain(-text)`, `--hx-danger-stain(-text)`, `--hx-ring`, `--hx-glass-thin`, `--hx-glass`, `--hx-glass-strong`,
`--hx-glass-raised`, `--hx-glass-dialog`, `--hx-glass-field`, `--hx-glass-border`, `--hx-glass-blur`, `--hx-tint-hover`,
`--hx-tint-active`, `--hx-backdrop-*`… (voir `src/styles/index.css`).

## Composants

| Composant | Exports |
| --- | --- |
| Autocomplete | `Autocomplete`, `AutocompleteInput` (`clearable`), `AutocompleteContent`, `AutocompleteList`, `AutocompleteItem`, `AutocompleteEmpty`, `AutocompleteStatus` (`loading`), `AutocompleteGroup`, `AutocompleteGroupLabel`, `AutocompleteCollection`, `AutocompleteSeparator`, `useAutocompleteFilter` — texte libre avec suggestions, voir ci-dessous |
| Avatar | `Avatar` (`size` : `xs`, `sm`, `md`, `lg` ; `shape` : `circle`, `square`), `AvatarImage`, `AvatarFallback` (initiales ou icône, affichées tant que l'image n'est pas chargée), `AvatarGroup` (avatars superposés), `avatarVariants` |
| Backdrop | `Backdrop` — variantes `mesh`, `aurora`, `plain` ; textures `grain`, `grid` |
| Badge | `Badge`, `badgeVariants` — statuts `neutral`, `info`, `success`, `warning`, `danger` ; `dot` pour une pastille ; icônes acceptées |
| Button | `Button`, `buttonVariants` — variantes `primary`, `secondary`, `outline`, `ghost`, `danger` ; tailles `sm`, `md`, `lg`, `icon` |
| DropdownMenu | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` — les noms de shadcn/ui pour `Menu` (mêmes composants, même rendu) |
| Field | `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldItem` — relie automatiquement libellé, aide et erreur au champ ; `<Field invalid>` ou la validation native (`required`, `validationMode`) passent le champ en rouge |
| FieldRow | `FieldRow` — plusieurs `Field` sur une ligne, en colonne quand la ligne devient trop étroite (container query : marche aussi dans un dialogue ou un panneau latéral) ; `columns` (`3` ou `"1fr 3fr"`), `stackBelow` (`sm`, `md`, `lg` par défaut, `xl`) |
| Input | `Input` — état d'erreur avec `aria-invalid` (ou automatiquement dans un `Field` Base UI invalide) ; même comportement sur `SelectTrigger` |
| InputNumber | `InputNumber` (`min`, `max`, `step`, `decimalPlaces` — `0` par défaut, `required`, `format`, `locale`, `showSteppers`, `align`) — aligné à gauche et sans boutons −/+ par défaut ; un champ `required` vidé revient à `0` au blur ; flèches du clavier, Maj pour `largeStep` ; montants en CHF et pourcentages via `format` |
| Card | `Card` (un `Panel` avec mise en page verticale ; accepte `variant`, `padding` et `render`), `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` |
| Checkbox | `Checkbox` — états coché, `indeterminate`, invalide (`aria-invalid` ou dans un `Field` invalide) |
| Collapsible | `Collapsible`, `CollapsibleTrigger` (à styler avec `render={<Button variant="ghost" />}`), `CollapsibleChevron` (tourne à l'ouverture), `CollapsibleContent` (hauteur animée ; `hiddenUntilFound` pour la recherche du navigateur) — section repliable |
| Combobox | `Combobox`, `ComboboxInput` (`clearable`), `ComboboxChips` (sélection multiple), `ComboboxTrigger` + `ComboboxSearch` (liste déroulante avec recherche), `ComboboxValue`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxEmpty`, `ComboboxStatus` (`loading`), `ComboboxGroup`, `ComboboxGroupLabel`, `ComboboxCollection`, `ComboboxSeparator`, `useComboboxFilter`, `createComboboxItems` — voir ci-dessous |
| Command | `Command` (`items`), `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandGroupLabel`, `CommandCollection`, `CommandItem` (`onClick`), `CommandShortcut`, `CommandSeparator`, `CommandDialog` — palette de commandes filtrable ; voir ci-dessous |
| DataTable | `DataTable`, `DataTableHeader`, `DataTableSortableHead`, `DataTableBody`, `nextOrdering` — voir ci-dessous (pagination intégrée) |
| Dialog | `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose` |
| Toast | `ToastProvider`, `useToast`, `createToastManager` — voir ci-dessous |
| Tooltip | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` |
| Label | `Label` — libellé d'un contrôle hors `Field` (switch, case à cocher dans une ligne) ; s'atténue avec le contrôle désactivé qu'il entoure |
| Menu | `Menu`, `MenuTrigger`, `MenuContent`, `MenuItem` (`variant="danger"`), `MenuShortcut`, `MenuSeparator`, `MenuGroup`, `MenuGroupLabel`, `MenuCheckboxItem`, `MenuRadioGroup`, `MenuRadioItem`, `MenuSub`, `MenuSubTrigger`, `MenuSubContent` |
| Menubar | `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem` (`variant="danger"`), `MenubarShortcut`, `MenubarSeparator`, `MenubarGroup`, `MenubarLabel`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent` — barre de menus (Fichier, Édition…) en verre fin ; les éléments sont ceux de `Menu` |
| Pagination | `Pagination` (`page`, `totalPages`, `onPageChange`, `maxVisible`, libellés), `getVisiblePages` — utilisable seule, hors tableau |
| Panel | `Panel`, `panelVariants` — surface en verre sans mise en page ; variantes `thin`, `default`, `strong` ; marge interne `none`, `sm`, `md`, `lg` ; prop `render` pour changer l'élément (`<aside />`, `<section />`…) |
| Popover | `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverTitle`, `PopoverDescription`, `PopoverClose` — panneau flottant libre (filtres, détails, mini-formulaires) |
| Progress | `Progress` (`value`, `null` pour une durée inconnue ; `label`, `showValue`, `format`, `locale`) — barre d'avancement qui passe au vert une fois terminée |
| Radio | `RadioGroup`, `Radio` |
| Sidebar | `SidebarProvider`, `Sidebar` (`variant`, `collapsible`, `side`), `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarInsetHeader` (`variant`), `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarSeparator`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton` (`isActive`, `tooltip`, `size`), `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarMenuCollapsible`, `SidebarMenuCollapsibleTrigger`, `SidebarMenuCollapsibleContent`, `useSidebar` — voir ci-dessous |
| Separator | `Separator` (`orientation`) — ligne fine entre deux groupes de contenu |
| Skeleton | `Skeleton` — forme de chargement animée |
| Select | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectGroupLabel`, `SelectSeparator` |
| Sheet | `Sheet`, `SheetTrigger`, `SheetContent` (`side`, `size`), `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetCloseButton`, `SheetBody`, `SheetFooter`, `SheetClose` |
| Slider | `Slider` (`label`, `showValue`, `format`, `locale`, `min`, `max`, `step` ; une valeur tableau donne une plage à deux poignées, nommées par `thumbLabels` ; `orientation`) |
| Spinner | `Spinner` (`size` : `xs`, `sm`, `md`, `lg` ; `tone` : `current`, `muted`, `accent` ; `label` pour les lecteurs d'écran quand il est seul), `spinnerVariants` — continue de tourner, plus lentement, si l'utilisateur réduit les animations |
| Switch | `Switch` |
| Table | `Table` (`density`), `TableHeader`, `TableBody`, `TableFooter`, `TableRow` (`selected`), `TableHead` (`align`, `sortDirection`, `onSort`), `TableCell` (`align`), `TableCaption`, `TableEmpty` — à placer dans un `Panel` ; défilement horizontal intégré pour les tableaux larges |
| Tabs | `Tabs`, `TabsList`, `TabsTab`, `TabsPanel` |
| Toggle | `Toggle` (`variant` : `default`, `outline` ; `size` : `sm`, `md`, `lg`), `ToggleGroup` (choix unique, ou `multiple`), `toggleVariants` — bouton à deux états, enfoncé avec le même verre que l'élément actif de la sidebar |
| Textarea | `Textarea` — mêmes états que `Input`, redimensionnable verticalement |

### Tableau de données (DataTable)

`DataTable` gère les listes alimentées par une API paginée : tri, pagination, chargement, état vide, en-tête fixe.
Il remplit la hauteur de son parent et défile à l'intérieur : donnez une hauteur au `Panel` qui le contient.
Il est **contrôlé** et ne dépend d'aucun routeur.

```tsx
<Panel className="h-[600px]">
  <DataTable ordering={ordering} onOrderingChange={setOrdering} pagination={data} onSkipChange={setSkip}>
    <DataTableHeader>
      <TableRow>
        <DataTableSortableHead field="full_name">Nom</DataTableSortableHead>
        <DataTableSortableHead field="total" align="right">Total</DataTableSortableHead>
      </TableRow>
    </DataTableHeader>
    <DataTableBody colSpan={2} isPending={isPending} isEmpty={rows.length === 0} emptyText="Aucun client.">
      {rows.map((row) => (
        <TableRow key={row.id} onClick={() => open(row)}>…</TableRow>
      ))}
    </DataTableBody>
  </DataTable>
</Panel>
```

- `ordering` au format Django : `"field"` croissant, `"-field"` décroissant, `""` aucun. Un clic fait
  croissant → décroissant → aucun (`nextOrdering`).
- `pagination` reçoit directement la réponse de l'API (`{ total, skip, limit }`) ; `onSkipChange` le nouveau `skip`.
- Pensez à remettre `skip` à 0 quand la recherche ou le tri changent.
- `useDebouncedValue(search, 300)` évite une requête à chaque frappe.

**Garder l'état dans l'URL (react-router)** — partage de lien et retour arrière conservent la page et le tri :

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

### Recherche dans une liste (Combobox, Autocomplete)

Trois composants selon le besoin :

| Besoin | Composant |
| --- | --- |
| Peu d'options (moins de 10), pas de saisie | `Select` |
| Choisir parmi une longue liste en tapant pour filtrer (client, collaborateur) | `Combobox` + `ComboboxInput` |
| Plusieurs choix, affichés en puces | `<Combobox multiple>` + `ComboboxChips` |
| Un champ qui ressemble à un Select, avec une recherche dans la liste déroulante | `Combobox` + `ComboboxTrigger` + `ComboboxSearch` |
| Texte libre avec suggestions (localité, désignation, adresse) | `Autocomplete` |

```tsx
<Field>
  <FieldLabel>Client</FieldLabel>
  <Combobox items={clients}>
    <ComboboxInput placeholder="Rechercher un client" />
    <ComboboxContent>
      <ComboboxEmpty>Aucun client trouvé.</ComboboxEmpty>
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

- `items` reçoit la liste complète, que `ComboboxList` affiche une fois filtrée. Les objets sont filtrés
  et affichés via leur propriété `label`. Sinon, passez `itemToStringLabel` au `Combobox`.
- **Plusieurs choix** : `<Combobox multiple>` avec `<ComboboxChips placeholder="…" />`. Retour arrière retire la
  dernière puce. `chipLabel` choisit le texte des puces.
- **Liste déroulante avec recherche** : remplacez `ComboboxInput` par
  `<ComboboxTrigger><ComboboxValue placeholder="Choisir…" /></ComboboxTrigger>` et ajoutez
  `<ComboboxSearch placeholder="Rechercher…" />` en tête de `ComboboxContent`.
- **Groupes** : `items={[{ value: 'Conseil', items: [...] }]}`, puis `ComboboxGroup` + `ComboboxGroupLabel`
  + `ComboboxCollection` dans `ComboboxList`.
- **Stocker des identifiants** plutôt que des objets : `createComboboxItems(clients, { getValue: (c) => c.id, getLabel: (c) => c.name })`.
- `ComboboxEmpty` et `ComboboxStatus` restent montés pour être annoncés aux lecteurs d'écran. Rendez leur
  **contenu** conditionnel, pas le composant.

**Résultats venant d'une API** : désactivez le filtrage local et interrogez l'API à chaque frappe.

```tsx
const [query, setQuery] = useState('');
const debounced = useDebouncedValue(query, 300);
const { data = [], isPending } = useClients(debounced); // gardez le client sélectionné dans la liste

<Combobox items={data} filter={null} onInputValueChange={setQuery} value={client} onValueChange={setClient}>
  <ComboboxInput placeholder="Rechercher un client" />
  <ComboboxContent>
    <ComboboxStatus loading={isPending}>{isPending ? 'Recherche…' : null}</ComboboxStatus>
    <ComboboxEmpty>{!isPending && query ? 'Aucun client trouvé.' : null}</ComboboxEmpty>
    <ComboboxList>{(c: Client) => <ComboboxItem key={c.id} value={c}>{c.label}</ComboboxItem>}</ComboboxList>
  </ComboboxContent>
</Combobox>
```

`Autocomplete` s'utilise de la même façon (`AutocompleteInput`, `AutocompleteContent`, `AutocompleteList`,
`AutocompleteItem`…). Sa valeur est le **texte saisi**, une chaîne qu'on lit avec `value` / `onValueChange` :
une suggestion ne fait que compléter ce texte. `autoHighlight` permet de valider la première suggestion avec Entrée.

Les libellés accessibles des boutons (`clearLabel`, `triggerLabel`, `removeLabel`) sont en français par défaut.

### Barre latérale (Sidebar)

`Sidebar` reprend l'API de la sidebar de shadcn/ui : `SidebarProvider` met la page en page et garde l'état ouvert/replié,
`Sidebar` contient la navigation, `SidebarInset` le contenu principal.

```tsx
<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>…</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Gestion</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link to="/factures" />} isActive tooltip="Factures">
              <ReceiptText />
              <span>Factures</span>
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
      Factures
    </SidebarInsetHeader>
    …
  </SidebarInset>
</SidebarProvider>
```

- `variant` : `floating` (panneau en verre détaché des bords, par défaut) ou `sidebar` (collé au bord de la page).
- `collapsible` : `offcanvas` (glisse hors de l'écran, par défaut), `icon` (ne garde que les icônes, avec les
  libellés en infobulle via `tooltip`) ou `none`. `side` : `left` ou `right`.
- Ctrl/⌘ + B ouvre et replie la barre (`keyboardShortcut`, `false` pour désactiver). Sous 768 px, elle s'ouvre dans
  un `Sheet` ; `useSidebar().setOpenMobile(false)` la referme après une navigation.
- Largeurs : `--hx-sidebar-width` (16rem), `--hx-sidebar-width-icon` (3rem), `--hx-sidebar-width-mobile` (18rem),
  à surcharger via `style` sur `SidebarProvider`.
- Liens : `render={<a href="…" />}` ou le `Link` de votre routeur sur `SidebarMenuButton` ; `SidebarMenuSubButton`
  rend un lien par défaut.
- Sous-menus repliables : `SidebarMenuCollapsible` + `SidebarMenuCollapsibleTrigger` + `SidebarMenuCollapsibleContent`
  (qui contient un `SidebarMenuSub`).
- `SidebarInsetHeader` est l'en-tête en verre du contenu (bouton de la barre, titre, actions). Il reste visible en haut
  de la page et floute ce qui défile dessous. `variant` : `floating` (panneau aligné sur une barre flottante, par
  défaut) ou `attached` (barre collée en haut, à associer à `variant="sidebar"`).
- La barre est collante (`sticky`), pas fixe : elle reste dans le flux de la page, même dans un conteneur.
- Le hook `useMediaQuery('(max-width: 767px)')`, utilisé pour le passage en mobile, est aussi exporté.

**Retenir l'état entre deux visites** : contrôlez `open` et enregistrez-le.

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

### Palette de commandes (Command)

`Command` est une liste d'actions filtrable : on tape pour filtrer, les flèches déplacent la sélection, Entrée lance
l'action en surbrillance. Elle est toujours ouverte : placez-la dans un `CommandDialog`, un `Popover` ou un panneau.

```tsx
const [open, setOpen] = useState(false); // ouvrez-la avec un bouton ou un raccourci ⌘K

<CommandDialog open={open} onOpenChange={setOpen}>
  <Command items={groups}>
    <CommandInput placeholder="Rechercher une action…" />
    <CommandEmpty>Aucune action trouvée.</CommandEmpty>
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

- `items` reçoit toutes les entrées (ou des groupes `{ value, items }`) : c'est ce qui permet le filtrage. Les objets
  sont filtrés sur leur propriété `label`.
- Contrairement à `cmdk` (utilisé par shadcn/ui), les entrées ne sont pas déclarées en JSX statique mais rendues à
  partir de `items`.

### Notifications (Toast)

Placez `ToastProvider` une seule fois autour de l'application, puis utilisez `useToast` n'importe où dessous :

```tsx
<ToastProvider>
  <App />
</ToastProvider>

const toast = useToast();
toast.add({ type: 'success', title: 'Facture envoyée', description: 'F-2026-1045 a été envoyée.' });
toast.add({ title: 'Projet archivé', actionProps: { children: 'Annuler', onClick: undo } });
toast.promise(save(), {
  loading: { type: 'loading', title: 'Enregistrement…' },
  success: { type: 'success', title: 'Enregistré' },
  error: { type: 'error', title: 'Échec de l’enregistrement' },
});
```

`type` : `success`, `error`, `warning`, `info`, `loading` (choisit l'icône). Les toasts disparaissent après 5 s
(`timeout`, `0` pour les garder). Pour en créer hors de React (client API, store), utilisez `createToastManager()`
et passez-le à `<ToastProvider toastManager={manager}>`.

### Panneau latéral (Sheet)

`Sheet` affiche un panneau modal depuis un bord de l'écran. `side` accepte `top`, `right`, `bottom` ou `left`,
et `size` accepte `sm`, `md`, `lg` ou `full`. Placez le contenu susceptible de défiler dans `SheetBody` : la surface
en verre reste fixe et son bord éclairé n'est jamais rogné par un `overflow-auto`.

```tsx
<Sheet>
  <SheetTrigger render={<Button variant="secondary" />}>Voir le client</SheetTrigger>
  <SheetContent side="right" size="md">
    <SheetHeader>
      <SheetTitle>Léman Immobilier SA</SheetTitle>
      <SheetDescription>Coordonnées et activité récente.</SheetDescription>
      <SheetCloseButton aria-label="Fermer le panneau" />
    </SheetHeader>
    <SheetBody>…</SheetBody>
    <SheetFooter>
      <SheetClose render={<Button variant="ghost" />}>Fermer</SheetClose>
      <Button>Modifier</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

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
