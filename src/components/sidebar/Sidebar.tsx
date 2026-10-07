import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cn, mergeClassName } from '../../lib/cn';
import { Button } from '../button/Button';
import { Sheet, SheetContent, SheetTitle } from '../sheet/Sheet';
import { Skeleton } from '../skeleton/Skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip/Tooltip';

const MOBILE_QUERY = '(max-width: 767px)';

type SidebarContextValue = {
  /** Desktop state. */
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Mobile state: the sidebar is a Sheet below 768px. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

/** State and actions of the closest SidebarProvider: build a custom trigger, close the mobile sheet after navigation… */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within <SidebarProvider>.');
  return context;
}

export type SidebarProviderProps = ComponentProps<'div'> & {
  /** Initial desktop state when uncontrolled. Defaults to `true` (expanded). */
  defaultOpen?: boolean;
  /** Desktop state when controlled, e.g. restored from localStorage. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Key toggling the sidebar with Ctrl/⌘. `false` turns the shortcut off. Defaults to `"b"`. */
  keyboardShortcut?: string | false;
};

/**
 * Lays out the page: a Sidebar next to a SidebarInset. Holds the open/collapsed state.
 * Widths are set with `--hx-sidebar-width` (16rem), `--hx-sidebar-width-icon` (3rem)
 * and `--hx-sidebar-width-mobile` (18rem).
 */
export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  keyboardShortcut = 'b',
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [openMobile, setOpenMobile] = useState(false);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [openProp, onOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) setOpenMobile((value) => !value);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  useEffect(() => {
    if (!keyboardShortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === keyboardShortcut && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [keyboardShortcut, toggleSidebar]);

  const value = useMemo<SidebarContextValue>(
    () => ({
      state: open ? 'expanded' : 'collapsed',
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, setOpen, openMobile, isMobile, toggleSidebar],
  );

  return (
    <SidebarContext value={value}>
      <TooltipProvider delay={0}>
        <div
          className={cn('hx:flex hx:min-h-svh hx:w-full hx:overflow-x-clip hx:text-fg', className)}
          style={
            {
              '--hx-sidebar-width': '16rem',
              '--hx-sidebar-width-icon': '3rem',
              '--hx-sidebar-width-mobile': '18rem',
              ...style,
            } as CSSProperties
          }
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext>
  );
}

export type SidebarProps = ComponentProps<'div'> & {
  side?: 'left' | 'right';
  /** `floating`: a rounded glass panel set off the edges (default). `sidebar`: attached to the page edge. */
  variant?: 'floating' | 'sidebar';
  /** How it collapses: slides out (`offcanvas`), shrinks to icons (`icon`), or never (`none`). */
  collapsible?: 'offcanvas' | 'icon' | 'none';
  /** Accessible title of the mobile sheet. */
  mobileTitle?: string;
};

/** Navigation panel. On screens under 768px it opens as a Sheet. */
export function Sidebar({
  side = 'left',
  variant = 'floating',
  collapsible = 'offcanvas',
  mobileTitle = 'Navigation',
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const floating = variant === 'floating';

  const panelClassName = cn(
    'hx:glass-thin hx:flex hx:size-full hx:flex-col',
    floating
      ? 'hx:rounded-xl'
      : cn('hx:rounded-none hx:border-y-0', side === 'left' ? 'hx:border-l-0' : 'hx:border-r-0'),
    className,
  );

  if (collapsible === 'none') {
    return (
      <div
        data-sidebar="sidebar"
        data-variant={variant}
        className={cn('hx:group/sidebar hx:w-(--hx-sidebar-width) hx:shrink-0', floating && 'hx:p-2')}
        {...props}
      >
        <div className={panelClassName}>{children}</div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side={side} className="hx:w-(--hx-sidebar-width-mobile)">
          <SheetTitle className="hx:sr-only">{mobileTitle}</SheetTitle>
          <div data-sidebar="sidebar" data-mobile="true" className="hx:group/sidebar hx:flex hx:h-full hx:flex-col" {...props}>
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  const collapsed = state === 'collapsed';
  const hidden = collapsed && collapsible === 'offcanvas';
  const iconOnly = collapsed && collapsible === 'icon';

  return (
    <div
      data-state={state}
      data-collapsible={collapsed ? collapsible : undefined}
      data-variant={variant}
      data-side={side}
      className={cn(
        // Sticky rather than fixed: the sidebar stays in the page flow, so it also works inside
        // a container (or a docs page). The inner panel slides; this box reserves its width.
        'hx:group/sidebar hx:sticky hx:top-0 hx:hidden hx:h-svh hx:shrink-0 hx:self-start hx:md:block',
        'hx:transition-[width] hx:duration-200 hx:ease-linear hx:motion-reduce:transition-none',
        hidden
          ? 'hx:w-0'
          : iconOnly
            ? floating
              ? 'hx:w-[calc(var(--hx-sidebar-width-icon)+1rem)]'
              : 'hx:w-(--hx-sidebar-width-icon)'
            : 'hx:w-(--hx-sidebar-width)',
      )}
    >
      <div
        inert={hidden}
        className={cn(
          'hx:absolute hx:inset-y-0 hx:flex',
          'hx:transition-[translate,width] hx:duration-200 hx:ease-linear hx:motion-reduce:transition-none',
          side === 'left' ? 'hx:left-0' : 'hx:right-0',
          iconOnly ? 'hx:w-full' : 'hx:w-(--hx-sidebar-width)',
          hidden && (side === 'left' ? 'hx:-translate-x-full' : 'hx:translate-x-full'),
          floating && 'hx:p-2',
        )}
      >
        <div data-sidebar="sidebar" className={panelClassName} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
}

export type SidebarTriggerProps = ComponentProps<typeof Button> & {
  /** Accessible label. */
  label?: string;
};

/** Button that opens or collapses the sidebar (and opens the mobile sheet). */
export function SidebarTrigger({ label = 'Afficher ou masquer la navigation', onClick, children, ...props }: SidebarTriggerProps) {
  const { toggleSidebar, open, openMobile, isMobile } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      aria-expanded={isMobile ? openMobile : open}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children ?? <PanelIcon />}
    </Button>
  );
}

/** Thin hit area along the sidebar's inner edge: click to collapse or expand. Place it inside Sidebar. */
export function SidebarRail({ className, label = 'Afficher ou masquer la navigation', ...props }: ComponentProps<'button'> & { label?: string }) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      type="button"
      aria-label={label}
      tabIndex={-1}
      onClick={toggleSidebar}
      title={label}
      className={cn(
        'hx:group/rail hx:absolute hx:inset-y-0 hx:z-20 hx:hidden hx:w-4 hx:cursor-ew-resize hx:sm:flex hx:justify-center',
        'hx:group-data-[side=left]/sidebar:-right-3 hx:group-data-[side=right]/sidebar:-left-3',
        'hx:group-data-[collapsible=offcanvas]/sidebar:hidden',
        className,
      )}
      {...props}
    >
      <span className="hx:my-3 hx:w-0.5 hx:rounded-full hx:bg-accent/60 hx:opacity-0 hx:transition-opacity hx:group-hover/rail:opacity-100" />
    </button>
  );
}

/** Main area next to the sidebar. */
export function SidebarInset({ className, ...props }: ComponentProps<'main'>) {
  return <main className={cn('hx:relative hx:flex hx:min-w-0 hx:flex-1 hx:flex-col', className)} {...props} />;
}

export type SidebarInsetHeaderProps = ComponentProps<'header'> & {
  /** `floating`: a rounded glass panel lined up with a floating sidebar (default). `attached`: a bar across the top. */
  variant?: 'floating' | 'attached';
};

/**
 * Glass header at the top of SidebarInset, holding the SidebarTrigger, the page title and actions.
 * It stays visible while the page scrolls; content passing underneath is blurred.
 */
export function SidebarInsetHeader({ variant = 'floating', className, children, ...props }: SidebarInsetHeaderProps) {
  const floating = variant === 'floating';
  return (
    <header
      className={cn(
        'hx:sticky hx:top-0 hx:z-10 hx:shrink-0',
        floating && [
          'hx:p-2 hx:pb-0',
          // Content scrolling through the gaps around the floating panel is blurred too, fading out below it.
          'hx:before:absolute hx:before:inset-x-0 hx:before:top-0 hx:before:-bottom-3 hx:before:-z-1',
          'hx:before:backdrop-blur-md hx:before:[mask-image:linear-gradient(to_bottom,#000_70%,transparent)]',
        ],
      )}
      {...props}
    >
      <div
        className={cn(
          'hx:glass-thin hx:flex hx:h-12 hx:items-center hx:gap-2 hx:px-2',
          floating ? 'hx:rounded-xl' : 'hx:rounded-none hx:border-x-0 hx:border-t-0',
          className,
        )}
      >
        {children}
      </div>
    </header>
  );
}

/** Top of the sidebar: app name, workspace switcher. */
export function SidebarHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-sidebar="header" className={cn('hx:flex hx:flex-col hx:gap-2 hx:p-2', className)} {...props} />;
}

/** Bottom of the sidebar: user menu, settings. */
export function SidebarFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-sidebar="footer" className={cn('hx:flex hx:flex-col hx:gap-2 hx:p-2', className)} {...props} />;
}

export function SidebarSeparator({ className, ...props }: ComponentProps<'div'>) {
  return <div role="separator" className={cn('hx:mx-2 hx:h-px hx:shrink-0 hx:bg-glass-border', className)} {...props} />;
}

/** Scrollable middle part holding the groups. The glass panel itself never scrolls. */
export function SidebarContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="content"
      className={cn(
        'hx:flex hx:min-h-0 hx:flex-1 hx:flex-col hx:gap-2 hx:overflow-y-auto hx:overscroll-contain',
        'hx:group-data-[collapsible=icon]/sidebar:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div data-sidebar="group" className={cn('hx:relative hx:flex hx:w-full hx:min-w-0 hx:flex-col hx:p-2', className)} {...props} />;
}

export function SidebarGroupLabel({ className, render, ...props }: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      'data-sidebar': 'group-label',
      ...props,
      className: cn(
        'hx:flex hx:h-8 hx:shrink-0 hx:items-center hx:rounded-md hx:px-2 hx:text-xs hx:font-medium hx:text-fg-muted hx:outline-none',
        'hx:transition-[margin,opacity] hx:duration-200 hx:ease-linear hx:focus-visible:ring-2 hx:focus-visible:ring-ring',
        'hx:[&>svg]:size-4 hx:[&>svg]:shrink-0',
        'hx:group-data-[collapsible=icon]/sidebar:-mt-8 hx:group-data-[collapsible=icon]/sidebar:opacity-0',
        className,
      ),
    },
  });
}

/** Small button at the right of a group label (e.g. "add a project"). */
export function SidebarGroupAction({ className, render, ...props }: useRender.ComponentProps<'button'>) {
  return useRender({
    defaultTagName: 'button',
    render,
    props: {
      type: render ? undefined : 'button',
      'data-sidebar': 'group-action',
      ...props,
      className: cn(actionClassName, 'hx:top-3.5 hx:right-3', className),
    },
  });
}

export function SidebarGroupContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-sidebar="group-content" className={cn('hx:w-full hx:text-sm', className)} {...props} />;
}

export function SidebarMenu({ className, ...props }: ComponentProps<'ul'>) {
  return <ul data-sidebar="menu" className={cn('hx:flex hx:w-full hx:min-w-0 hx:list-none hx:flex-col hx:gap-1', className)} {...props} />;
}

export function SidebarMenuItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-sidebar="menu-item" className={cn('hx:group/menu-item hx:relative', className)} {...props} />;
}

export const sidebarMenuButtonVariants = cva(
  [
    'hx:flex hx:w-full hx:items-center hx:gap-2 hx:rounded-md hx:border hx:border-transparent hx:p-2 hx:text-left hx:text-fg',
    'hx:overflow-hidden hx:no-underline hx:outline-none hx:cursor-pointer hx:select-none',
    'hx:transition-[width,height,padding,background-color] hx:duration-150 hx:ease-linear',
    'hx:hover:bg-tint-hover hx:active:bg-tint-active hx:focus-visible:ring-2 hx:focus-visible:ring-ring',
    'hx:disabled:pointer-events-none hx:disabled:opacity-50 hx:aria-disabled:pointer-events-none hx:aria-disabled:opacity-50',
    // Selected item: raised glass in dark, clear glass in light (--hx-nav-active), icon in the brand color.
    'hx:data-active:border-(--hx-nav-active-border) hx:data-active:bg-(--hx-nav-active) hx:data-active:hover:bg-(--hx-nav-active) hx:data-active:font-medium',
    'hx:data-active:shadow-[inset_0_1px_0_0_var(--hx-glass-highlight),var(--hx-glass-shadow)] hx:data-active:[&>svg]:text-accent',
    'hx:[&>svg]:size-4 hx:[&>svg]:shrink-0 hx:[&>svg]:text-fg-muted hx:[&>span]:min-w-0 hx:[&>span]:truncate',
    // Room for a SidebarMenuAction or SidebarMenuBadge on the right.
    'hx:group-has-data-[sidebar=menu-action]/menu-item:pr-8 hx:group-has-data-[sidebar=menu-badge]/menu-item:pr-10',
    'hx:group-data-[collapsible=icon]/sidebar:size-8! hx:group-data-[collapsible=icon]/sidebar:p-2!',
  ],
  {
    variants: {
      size: {
        sm: 'hx:h-7 hx:text-xs',
        md: 'hx:h-8 hx:text-sm',
        // App name or user, with a 2rem logo/avatar: the logo alone shows when collapsed.
        lg: 'hx:h-12 hx:text-sm hx:group-data-[collapsible=icon]/sidebar:p-0!',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type SidebarMenuButtonProps = useRender.ComponentProps<'button'> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    /** Marks the current page: raised glass and `aria-current="page"`. */
    isActive?: boolean;
    /** Label shown in a tooltip while the sidebar is collapsed to icons. */
    tooltip?: ReactNode;
  };

/**
 * Navigation entry: an icon and a label. Use `render` for links:
 * `<SidebarMenuButton render={<a href="/factures" />}>` or your router's Link.
 */
export function SidebarMenuButton({ isActive = false, tooltip, size, className, render, ...props }: SidebarMenuButtonProps) {
  const { state, isMobile } = useSidebar();
  const button = useRender({
    defaultTagName: 'button',
    render,
    props: {
      type: render ? undefined : 'button',
      'data-sidebar': 'menu-button',
      'data-size': size ?? 'md',
      'data-active': isActive || undefined,
      'aria-current': isActive ? ('page' as const) : undefined,
      ...props,
      className: cn(sidebarMenuButtonVariants({ size }), className as string | undefined),
    },
  });

  if (!tooltip || state !== 'collapsed' || isMobile) return button;

  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipContent side="right" sideOffset={10}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}

const actionClassName = [
  'hx:absolute hx:flex hx:size-6 hx:items-center hx:justify-center hx:rounded-md hx:text-fg-muted hx:cursor-pointer hx:outline-none',
  'hx:transition-[opacity,background-color] hx:hover:bg-tint-hover hx:hover:text-fg hx:focus-visible:ring-2 hx:focus-visible:ring-ring',
  'hx:[&>svg]:size-4 hx:[&>svg]:shrink-0',
  // Bigger hit area on touch screens.
  'hx:after:absolute hx:after:-inset-2 hx:md:after:hidden',
  'hx:group-data-[collapsible=icon]/sidebar:hidden',
].join(' ');

export type SidebarMenuActionProps = useRender.ComponentProps<'button'> & {
  /** Only show the action while the item is hovered or focused (always visible on touch screens). */
  showOnHover?: boolean;
};

/** Secondary button inside a menu item (e.g. "…" opening a Menu). */
export function SidebarMenuAction({ showOnHover = false, className, render, ...props }: SidebarMenuActionProps) {
  return useRender({
    defaultTagName: 'button',
    render,
    props: {
      type: render ? undefined : 'button',
      'data-sidebar': 'menu-action',
      ...props,
      className: cn(
        actionClassName,
        'hx:top-1 hx:right-1',
        showOnHover &&
          'hx:md:opacity-0 hx:group-hover/menu-item:opacity-100 hx:group-focus-within/menu-item:opacity-100 hx:data-popup-open:opacity-100',
        className,
      ),
    },
  });
}

/** Counter at the right of a menu item (unread, overdue…). */
export function SidebarMenuBadge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-sidebar="menu-badge"
      className={cn(
        'hx:pointer-events-none hx:absolute hx:top-1.5 hx:right-1.5 hx:flex hx:h-5 hx:min-w-5 hx:items-center hx:justify-center',
        'hx:rounded-md hx:px-1.5 hx:text-xs hx:font-medium hx:tabular-nums hx:text-fg-muted hx:select-none',
        'hx:group-data-[collapsible=icon]/sidebar:hidden',
        className,
      )}
      {...props}
    />
  );
}

/** Loading placeholder for a menu item. */
export function SidebarMenuSkeleton({ showIcon = false, className, ...props }: ComponentProps<'div'> & { showIcon?: boolean }) {
  // Random width between 50 and 90%, fixed for the lifetime of the placeholder.
  const [width] = useState(() => `${Math.floor(Math.random() * 40) + 50}%`);
  return (
    <div data-sidebar="menu-skeleton" className={cn('hx:flex hx:h-8 hx:items-center hx:gap-2 hx:rounded-md hx:px-2', className)} {...props}>
      {showIcon && <Skeleton className="hx:size-4 hx:rounded-md" />}
      <Skeleton className="hx:h-4 hx:flex-1" style={{ maxWidth: width }} />
    </div>
  );
}

/** Nested list under a menu item. Hidden while collapsed to icons. */
export function SidebarMenuSub({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-sidebar="menu-sub"
      className={cn(
        'hx:mx-3.5 hx:flex hx:min-w-0 hx:list-none hx:flex-col hx:gap-1 hx:border-l hx:border-glass-border hx:px-2.5 hx:py-0.5',
        'hx:group-data-[collapsible=icon]/sidebar:hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuSubItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-sidebar="menu-sub-item" className={cn('hx:relative', className)} {...props} />;
}

export type SidebarMenuSubButtonProps = useRender.ComponentProps<'a'> & {
  isActive?: boolean;
  size?: 'sm' | 'md';
};

/** Entry of a nested list. Renders a link by default: pass `href`, or `render` for a router Link. */
export function SidebarMenuSubButton({ isActive = false, size = 'md', className, render, ...props }: SidebarMenuSubButtonProps) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: {
      'data-sidebar': 'menu-sub-button',
      'data-active': isActive || undefined,
      'aria-current': isActive ? ('page' as const) : undefined,
      ...props,
      className: cn(
        'hx:flex hx:h-7 hx:min-w-0 hx:items-center hx:gap-2 hx:overflow-hidden hx:rounded-md hx:px-2 hx:text-fg-muted hx:no-underline hx:outline-none',
        'hx:cursor-pointer hx:transition-colors hx:hover:bg-tint-hover hx:hover:text-fg hx:active:bg-tint-active',
        'hx:focus-visible:ring-2 hx:focus-visible:ring-ring hx:aria-disabled:pointer-events-none hx:aria-disabled:opacity-50',
        'hx:data-active:bg-tint-active hx:data-active:font-medium hx:data-active:text-fg',
        'hx:[&>svg]:size-4 hx:[&>svg]:shrink-0 hx:[&>span]:truncate',
        size === 'sm' ? 'hx:text-xs' : 'hx:text-sm',
        className,
      ),
    },
  });
}

/** Menu item whose sub list folds and unfolds. Put a SidebarMenuCollapsibleTrigger and a SidebarMenuCollapsibleContent inside. */
export function SidebarMenuCollapsible({ className, ...props }: ComponentProps<typeof BaseCollapsible.Root>) {
  return (
    <BaseCollapsible.Root
      data-sidebar="menu-item"
      render={<li />}
      className={mergeClassName('hx:group/menu-item hx:relative', className)}
      {...props}
    />
  );
}

/** SidebarMenuButton that folds its SidebarMenuCollapsible, with a chevron. */
export function SidebarMenuCollapsibleTrigger({ children, className, ...props }: SidebarMenuButtonProps) {
  return (
    <BaseCollapsible.Trigger
      render={
        <SidebarMenuButton className={cn('hx:group/collapsible-trigger', className as string | undefined)} {...props}>
          {children}
          <ChevronIcon />
        </SidebarMenuButton>
      }
    />
  );
}

export function SidebarMenuCollapsibleContent({ className, ...props }: ComponentProps<typeof BaseCollapsible.Panel>) {
  return (
    <BaseCollapsible.Panel
      className={mergeClassName(
        [
          'hx:h-(--collapsible-panel-height) hx:overflow-hidden hx:pt-1',
          'hx:transition-[height] hx:duration-200 hx:ease-out hx:motion-reduce:transition-none',
          'hx:data-starting-style:h-0 hx:data-ending-style:h-0',
        ].join(' '),
        className,
      )}
      {...props}
    />
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="hx:ml-auto hx:transition-transform hx:duration-200 hx:group-data-panel-open/collapsible-trigger:rotate-90"
    >
      <path d="m6 4 4 4-4 4" />
    </svg>
  );
}

function PanelIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2.5" width="12" height="11" rx="2" />
      <path d="M6 2.5v11" />
    </svg>
  );
}
