import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { cn, mergeClassName } from '../../lib/cn';
import { ChevronRightIcon } from '../../lib/icons';
import { Button } from '../button/Button';
import { Sheet, SheetContent, SheetTitle } from '../sheet/Sheet';
import { Skeleton } from '../skeleton/Skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip/Tooltip';

const MOBILE_QUERY = '(max-width: 767px)';

type SidebarContextValue = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);
// The mobile Sheet portals into the provider, so it inherits the width variables set on it.
const SidebarPortalContext = createContext<HTMLDivElement | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within <SidebarProvider>.');
  return context;
}

export type SidebarProviderProps = ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  ref,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);
  const providerRef = useCallback(
    (node: HTMLDivElement | null) => {
      setPortalContainer(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );
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
      <SidebarPortalContext value={portalContainer}>
        <TooltipProvider delay={0}>
          <div
            ref={providerRef}
            className={cn('hx:flex hx:min-h-svh hx:w-full hx:overflow-x-clip hx:text-fg', className)}
            style={
              {
                '--hx-sidebar-width': '14rem',
                '--hx-sidebar-width-icon': '3rem',
                '--hx-sidebar-width-mobile': 'min(calc(100vw - 3rem), 24rem)',
                ...style,
              } as CSSProperties
            }
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarPortalContext>
    </SidebarContext>
  );
}

export type SidebarProps = ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'floating' | 'sidebar';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  mobileTitle?: string;
};

export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  mobileTitle = 'Navigation',
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  const portalContainer = useContext(SidebarPortalContext);
  const floating = variant === 'floating';

  // Floating: a card beside the page. Sidebar: a flat column against the edge, set apart by a border.
  const panelClassName = cn(
    'hx:flex hx:size-full hx:flex-col hx:bg-surface',
    floating
      ? 'hx:rounded-xs hx:shadow-card'
      : side === 'left'
        ? 'hx:border-r hx:border-border'
        : 'hx:border-l hx:border-border',
    className,
  );

  if (collapsible === 'none') {
    return (
      <div
        data-sidebar="sidebar"
        data-variant={variant}
        className={cn(
          'hx:group/sidebar hx:w-(--hx-sidebar-width) hx:shrink-0',
          floating && (side === 'left' ? 'hx:py-2 hx:pr-1 hx:pl-2' : 'hx:py-2 hx:pr-2 hx:pl-1'),
        )}
        {...props}
      >
        <div className={panelClassName}>{children}</div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={side}
          size="full"
          portalProps={{ container: portalContainer }}
          className="hx:w-(--hx-sidebar-width-mobile)"
        >
          <SheetTitle className="hx:sr-only">{mobileTitle}</SheetTitle>
          <div
            data-sidebar="sidebar"
            data-mobile="true"
            className="hx:group/sidebar hx:flex hx:h-full hx:flex-col"
            {...props}
          >
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
        // Sticky, not fixed: stays in the page flow, so it also works inside a container.
        'hx:group/sidebar hx:sticky hx:top-0 hx:hidden hx:h-svh hx:shrink-0 hx:self-start hx:md:block',
        'hx:transition-[width] hx:duration-200 hx:ease-linear hx:motion-reduce:transition-none',
        hidden
          ? 'hx:w-0'
          : iconOnly
            ? floating
              ? 'hx:w-[calc(var(--hx-sidebar-width-icon)+0.75rem)]'
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
          floating && (side === 'left' ? 'hx:py-2 hx:pr-1 hx:pl-2' : 'hx:py-2 hx:pr-2 hx:pl-1'),
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
  label?: string;
  /** The icon, from any icon library. */
  children: ReactNode;
};

export function SidebarTrigger({ label = 'Toggle navigation', onClick, children, ...props }: SidebarTriggerProps) {
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
      {children}
    </Button>
  );
}

export function SidebarRail({
  className,
  label = 'Toggle navigation',
  ...props
}: ComponentProps<'button'> & { label?: string }) {
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
      <span className="hx:my-3 hx:w-0.5 hx:rounded-full hx:bg-border-strong hx:opacity-0 hx:transition-opacity hx:group-hover/rail:opacity-100" />
    </button>
  );
}

export function SidebarInset({ className, ...props }: ComponentProps<'main'>) {
  return <main className={cn('hx:relative hx:flex hx:min-w-0 hx:flex-1 hx:flex-col', className)} {...props} />;
}

export type SidebarInsetHeaderProps = ComponentProps<'header'> & {
  variant?: 'floating' | 'attached';
};

export function SidebarInsetHeader({ variant = 'attached', className, children, ...props }: SidebarInsetHeaderProps) {
  const floating = variant === 'floating';
  return (
    <header
      className={cn(
        'hx:sticky hx:top-0 hx:z-10 hx:shrink-0',
        // Floating: the page color fills the gap above the card, so content does not show through while scrolling.
        floating && 'hx:bg-bg hx:p-2 hx:pb-0',
      )}
      {...props}
    >
      <div
        className={cn(
          'hx:flex hx:h-12 hx:items-center hx:gap-2 hx:bg-surface hx:px-2',
          floating ? 'hx:rounded-xs hx:shadow-card' : 'hx:border-b hx:border-border',
          className,
        )}
      >
        {children}
      </div>
    </header>
  );
}

export function SidebarHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-sidebar="header" className={cn('hx:flex hx:flex-col hx:gap-2 hx:p-2', className)} {...props} />;
}

export function SidebarFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-sidebar="footer" className={cn('hx:flex hx:flex-col hx:gap-2 hx:p-2', className)} {...props} />;
}

export function SidebarSeparator({ className, ...props }: ComponentProps<'div'>) {
  return <div role="separator" className={cn('hx:mx-2 hx:h-px hx:shrink-0 hx:bg-border', className)} {...props} />;
}

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
  return (
    <div
      data-sidebar="group"
      className={cn('hx:relative hx:flex hx:w-full hx:min-w-0 hx:flex-col hx:p-2', className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({ className, render, ...props }: useRender.ComponentProps<'div'>) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: {
      'data-sidebar': 'group-label',
      ...props,
      className: cn(
        // Azure-style section heading: small uppercase text above the items.
        'hx:flex hx:h-7 hx:shrink-0 hx:items-center hx:rounded-xs hx:px-3 hx:text-xs hx:font-semibold hx:tracking-wide hx:text-fg-muted hx:uppercase hx:outline-none',
        'hx:transition-[margin,opacity] hx:duration-200 hx:ease-linear hx:focus-ring',
        'hx:[&>svg]:size-4 hx:[&>svg]:shrink-0',
        'hx:group-data-[collapsible=icon]/sidebar:-mt-7 hx:group-data-[collapsible=icon]/sidebar:opacity-0',
        className,
      ),
    },
  });
}

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
  return (
    <ul
      data-sidebar="menu"
      className={cn('hx:flex hx:w-full hx:min-w-0 hx:list-none hx:flex-col hx:gap-0.5', className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({ className, ...props }: ComponentProps<'li'>) {
  return <li data-sidebar="menu-item" className={cn('hx:group/menu-item hx:relative', className)} {...props} />;
}

export const sidebarMenuButtonVariants = cva(
  [
    'hx:relative hx:flex hx:w-full hx:items-center hx:gap-3 hx:overflow-hidden hx:rounded-xs hx:px-3 hx:text-left hx:text-fg',
    'hx:no-underline hx:outline-none hx:cursor-pointer hx:select-none',
    'hx:transition-[width,height,padding,background-color] hx:duration-100 hx:ease-linear',
    'hx:hover:bg-surface-hover hx:active:bg-surface-pressed hx:focus-ring hx:focus-visible:-outline-offset-2',
    'hx:disabled:pointer-events-none hx:disabled:text-fg-disabled hx:aria-disabled:pointer-events-none hx:aria-disabled:text-fg-disabled',
    // Active item: a darker gray fill, semibold text and a short blue bar on its left edge.
    'hx:data-active:bg-surface-pressed hx:data-active:font-semibold',
    'hx:before:absolute hx:before:inset-y-2 hx:before:left-0 hx:before:w-[3px] hx:before:rounded-full',
    'hx:data-active:before:bg-accent',
    'hx:[&>svg]:size-[18px] hx:[&>svg]:shrink-0 hx:[&>span]:min-w-0 hx:[&>span]:truncate',
    'hx:group-has-data-[sidebar=menu-action]/menu-item:pr-8 hx:group-has-data-[sidebar=menu-badge]/menu-item:pr-10',
    // Collapsed to icons: a 32px wide cell, the 18px icon centered in it.
    'hx:group-data-[collapsible=icon]/sidebar:w-8! hx:group-data-[collapsible=icon]/sidebar:px-[7px]!',
  ],
  {
    variants: {
      size: {
        sm: 'hx:h-8 hx:text-xs',
        md: 'hx:h-9 hx:text-sm',
        lg: 'hx:h-12 hx:text-sm hx:group-data-[collapsible=icon]/sidebar:px-0!',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type SidebarMenuButtonProps = useRender.ComponentProps<'button'> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    isActive?: boolean;
    /** Label shown in a tooltip while the sidebar is collapsed to icons. */
    tooltip?: ReactNode;
  };

export function SidebarMenuButton({
  isActive = false,
  tooltip,
  size,
  className,
  render,
  ...props
}: SidebarMenuButtonProps) {
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
  'hx:absolute hx:flex hx:size-6 hx:items-center hx:justify-center hx:rounded-xs hx:text-fg-muted hx:cursor-pointer hx:outline-none',
  'hx:transition-[opacity,background-color] hx:hover:bg-surface-pressed hx:hover:text-fg hx:focus-ring',
  'hx:[&>svg]:size-4 hx:[&>svg]:shrink-0',
  'hx:after:absolute hx:after:-inset-2 hx:md:after:hidden',
  'hx:group-data-[collapsible=icon]/sidebar:hidden',
].join(' ');

export type SidebarMenuActionProps = useRender.ComponentProps<'button'> & {
  /** Only show the action while the item is hovered or focused (always visible on touch screens). */
  showOnHover?: boolean;
};

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
        'hx:top-1.5 hx:right-1.5',
        showOnHover &&
          'hx:md:opacity-0 hx:group-hover/menu-item:opacity-100 hx:group-focus-within/menu-item:opacity-100 hx:data-popup-open:opacity-100',
        className,
      ),
    },
  });
}

export function SidebarMenuBadge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-sidebar="menu-badge"
      className={cn(
        'hx:pointer-events-none hx:absolute hx:top-2 hx:right-1.5 hx:flex hx:h-5 hx:min-w-5 hx:items-center hx:justify-center',
        'hx:rounded-xs hx:px-1.5 hx:text-xs hx:font-semibold hx:tabular-nums hx:text-fg-muted hx:select-none',
        'hx:group-data-[collapsible=icon]/sidebar:hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuSkeleton({
  showIcon = false,
  className,
  ...props
}: ComponentProps<'div'> & { showIcon?: boolean }) {
  // Stable across server and client rendering while still varying between sibling placeholders.
  const width = skeletonWidth(useId());
  return (
    <div
      data-sidebar="menu-skeleton"
      className={cn('hx:flex hx:h-8 hx:items-center hx:gap-2 hx:rounded-xs hx:px-2', className)}
      {...props}
    >
      {showIcon && <Skeleton className="hx:size-4" />}
      <Skeleton className="hx:h-4 hx:flex-1" style={{ maxWidth: width }} />
    </div>
  );
}

function skeletonWidth(id: string): string {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) hash = (hash * 31 + id.charCodeAt(index)) >>> 0;
  return `${50 + (hash % 41)}%`;
}

export function SidebarMenuSub({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-sidebar="menu-sub"
      className={cn(
        'hx:ml-5 hx:flex hx:min-w-0 hx:list-none hx:flex-col hx:gap-0.5 hx:border-l hx:border-border hx:py-0.5 hx:pl-2',
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

/** Renders a link by default: pass `href`, or `render` for a router Link. */
export function SidebarMenuSubButton({
  isActive = false,
  size = 'md',
  className,
  render,
  ...props
}: SidebarMenuSubButtonProps) {
  return useRender({
    defaultTagName: 'a',
    render,
    props: {
      'data-sidebar': 'menu-sub-button',
      'data-active': isActive || undefined,
      'aria-current': isActive ? ('page' as const) : undefined,
      ...props,
      className: cn(
        'hx:relative hx:flex hx:h-8 hx:min-w-0 hx:items-center hx:gap-2 hx:overflow-hidden hx:rounded-xs hx:px-3 hx:text-fg-muted hx:no-underline hx:outline-none',
        'hx:cursor-pointer hx:transition-colors hx:duration-100 hx:hover:bg-surface-hover hx:hover:text-fg hx:active:bg-surface-pressed',
        'hx:focus-ring hx:focus-visible:-outline-offset-2 hx:aria-disabled:pointer-events-none hx:aria-disabled:text-fg-disabled',
        'hx:data-active:bg-surface-pressed hx:data-active:font-semibold hx:data-active:text-fg',
        'hx:[&>svg]:size-4 hx:[&>svg]:shrink-0 hx:[&>span]:truncate',
        size === 'sm' ? 'hx:text-xs' : 'hx:text-sm',
        className,
      ),
    },
  });
}

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

export function SidebarMenuCollapsibleTrigger({ children, className, ...props }: SidebarMenuButtonProps) {
  return (
    <BaseCollapsible.Trigger
      render={
        <SidebarMenuButton className={cn('hx:group/collapsible-trigger', className as string | undefined)} {...props}>
          {children}
          <ChevronRightIcon className="hx:ml-auto hx:transition-transform hx:duration-200 hx:group-data-panel-open/collapsible-trigger:rotate-90" />
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
