import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ChevronsUpDown,
  Ellipsis,
  FileText,
  Folder,
  LayoutDashboard,
  Menu as MenuIcon,
  Package,
  PanelLeft,
  Plus,
  ReceiptText,
  Settings,
  Users,
} from 'lucide-react';
import { AppHeader, AppHeaderActions, AppHeaderBrand } from '../app-header/AppHeader';
import { Avatar, AvatarFallback } from '../avatar/Avatar';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '../menu/Menu';
import { Panel } from '../panel/Panel';
import { DataTable, DataTableHeader } from '../data-table/DataTable';
import { TableBody, TableCell, TableHead, TableRow } from '../table/Table';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInsetHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuCollapsible,
  SidebarMenuCollapsibleContent,
  SidebarMenuCollapsibleTrigger,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from './Sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    // A full page: no stage padding, and an iframe per story in the docs (the sidebar is viewport-high).
    stage: 'bare',
    docs: { story: { inline: false, iframeHeight: 640 } },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const projects = ['Client portal redesign', 'Alpina cloud migration', 'Romandie Santé app'];

const invoiceRows = [
  { id: 'F-2026-1042', client: 'Banque Cantonale du Léman', due: '30.09.2026', total: '1,830.00', status: 'Paid' },
  { id: 'F-2026-1043', client: 'Helvetia Services SA', due: '02.10.2026', total: '2,777.35', status: 'Overdue' },
  { id: 'F-2026-1044', client: 'Alpina Logistique SA', due: '15.10.2026', total: '3,724.70', status: 'Sent' },
  { id: 'F-2026-1045', client: 'Romandie Santé', due: '18.10.2026', total: '4,672.05', status: 'Sent' },
  { id: 'F-2026-1046', client: 'Léman Immobilier SA', due: '21.10.2026', total: '5,619.40', status: 'Draft' },
  { id: 'F-2026-1047', client: 'Jura Énergie SA', due: '28.10.2026', total: '6,566.75', status: 'Draft' },
];

// Enough rows to scroll the table under its sticky header.
const invoices = Array.from({ length: 4 }, (_, round) =>
  invoiceRows.map((invoice, i) => ({ ...invoice, id: `F-2026-${1042 + round * invoiceRows.length + i}` })),
).flat();

const statusVariant = { Paid: 'success', Overdue: 'danger', Sent: 'info', Draft: 'neutral' } as const;

/**
 * A column against the page edge that collapses to icons (`collapsible="icon"`): use the button in the
 * header or the rail along its edge. Labels show as tooltips while collapsed.
 * Under 768px it opens as a sheet.
 */
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Hex-Tech">
                <span className="hx:flex hx:size-8 hx:shrink-0 hx:items-center hx:justify-center hx:rounded-xs hx:bg-accent hx:text-xs hx:font-semibold hx:text-white">
                  HT
                </span>
                <span className="hx:flex hx:flex-col hx:leading-tight">
                  <span className="hx:font-semibold">Hex-Tech</span>
                  <span className="hx:text-xs hx:text-fg-muted">Billing</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuCollapsible defaultOpen>
                  <SidebarMenuCollapsibleTrigger isActive tooltip="Invoices">
                    <ReceiptText />
                    <span>Invoices</span>
                  </SidebarMenuCollapsibleTrigger>
                  <SidebarMenuCollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#" isActive>
                          <span>All invoices</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Drafts</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">
                          <span>Overdue</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuCollapsibleContent>
                </SidebarMenuCollapsible>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Quotes">
                    <FileText />
                    <span>Quotes</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>4</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Clients">
                    <Users />
                    <span>Clients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Products and services">
                    <Package />
                    <span>Products and services</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction aria-label="New project">
              <Plus />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project}>
                    <SidebarMenuButton tooltip={project}>
                      <Folder />
                      <span>{project}</span>
                    </SidebarMenuButton>
                    <Menu>
                      <MenuTrigger render={<SidebarMenuAction showOnHover aria-label={`Actions for ${project}`} />}>
                        <Ellipsis />
                      </MenuTrigger>
                      <MenuContent side="right" align="start">
                        <MenuItem>Open</MenuItem>
                        <MenuItem>Rename</MenuItem>
                        <MenuSeparator />
                        <MenuItem variant="danger">Archive</MenuItem>
                      </MenuContent>
                    </Menu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Camille Martin">
                <Avatar size="sm" shape="square">
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <span className="hx:flex hx:flex-col hx:leading-tight">
                  <span className="hx:font-semibold">Camille Martin</span>
                  <span className="hx:text-xs hx:text-fg-muted">camille@hex-tech.ch</span>
                </span>
                <ChevronsUpDown className="hx:ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Viewport-high page: the table scrolls inside its panel, which stops at the bottom of the screen. */}
      <SidebarInset className="hx:h-svh">
        <SidebarInsetHeader>
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
          <div className="hx:h-4 hx:w-px hx:bg-border" />
          <h1 className="hx:text-sm hx:font-semibold">Invoices</h1>
          <Button className="hx:ml-auto" size="sm">
            <Plus /> New invoice
          </Button>
        </SidebarInsetHeader>
        <div className="hx:flex hx:min-h-0 hx:flex-1 hx:flex-col hx:p-2">
          <Panel className="hx:min-h-0 hx:flex-1">
            <DataTable>
              <DataTableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead align="right">Total CHF</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </DataTableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="hx:font-semibold hx:whitespace-nowrap">{invoice.id}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{invoice.due}</TableCell>
                    <TableCell align="right">{invoice.total}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[invoice.status as keyof typeof statusVariant]}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </DataTable>
          </Panel>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/**
 * Under an `AppHeader` (the layout of the Azure portal): the header is the first child of `SidebarProvider`
 * and holds the `SidebarTrigger`. The sidebar and the page header stick below the dark bar while the page scrolls.
 */
export const WithAppHeader: Story = {
  render: () => (
    <SidebarProvider>
      <AppHeader>
        <SidebarTrigger variant="header">
          <MenuIcon />
        </SidebarTrigger>
        <AppHeaderBrand href="#" className="hx:ps-1">
          Hex-Tech Billing
        </AppHeaderBrand>
        <AppHeaderActions>
          <Button variant="header" size="icon" aria-label="Settings">
            <Settings />
          </Button>
          <Button variant="header" aria-label="Account">
            <Avatar size="xs">
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
          </Button>
        </AppHeaderActions>
      </AppHeader>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Billing</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />} tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />} isActive tooltip="Invoices">
                  <ReceiptText />
                  <span>Invoices</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>4</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />} tooltip="Clients">
                  <Users />
                  <span>Clients</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />} tooltip="Products">
                  <Package />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <SidebarInsetHeader>
          <h1 className="hx:px-2 hx:text-sm hx:font-semibold">Invoices</h1>
          <Button className="hx:ml-auto" size="sm" startIcon={<Plus />}>
            New invoice
          </Button>
        </SidebarInsetHeader>
        <div className="hx:flex hx:flex-col hx:gap-3 hx:p-4">
          {invoices.map((invoice) => (
            <Panel key={invoice.id} className="hx:flex hx:justify-between hx:p-4 hx:text-sm">
              <span className="hx:font-semibold">{invoice.id}</span>
              <span className="hx:text-fg-muted">{invoice.client}</span>
            </Panel>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/**
 * `variant="inset"`: the sidebar is gray with no edge, and the page is a white card on the same gray, as in MBG.
 * A full-height page inside can use `--hx-inset-height`.
 */
export const Inset: Story = {
  render: () => (
    <SidebarProvider>
      <AppHeader>
        <SidebarTrigger variant="header">
          <MenuIcon />
        </SidebarTrigger>
        <AppHeaderBrand href="#" className="hx:ps-1">
          Hex-Tech Billing
        </AppHeaderBrand>
        <AppHeaderActions>
          <Button variant="header" size="icon" aria-label="Settings">
            <Settings />
          </Button>
          <Button variant="header" aria-label="Account">
            <Avatar size="xs">
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
          </Button>
        </AppHeaderActions>
      </AppHeader>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Billing</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />} tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />} isActive tooltip="Invoices">
                  <ReceiptText />
                  <span>Invoices</span>
                </SidebarMenuButton>
                <SidebarMenuBadge>4</SidebarMenuBadge>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />} tooltip="Clients">
                  <Users />
                  <span>Clients</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />} tooltip="Products">
                  <Package />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="hx:flex hx:flex-col hx:gap-4 hx:p-6">
          <h1 className="hx:m-0 hx:text-2xl hx:font-semibold">Invoices</h1>
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="hx:flex hx:justify-between hx:border-b hx:border-border hx:py-3 hx:text-sm"
            >
              <span className="hx:font-semibold">{invoice.id}</span>
              <span className="hx:text-fg-muted">{invoice.client}</span>
            </div>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/** `variant="floating"` sets it apart as a card beside the page; `collapsible="offcanvas"` slides it out completely. */
export const FloatingOffcanvas: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar variant="floating" collapsible="offcanvas">
        <SidebarHeader>
          <div className="hx:flex hx:h-10 hx:items-center hx:px-2 hx:text-sm hx:font-semibold">Hex-Tech Billing</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />}>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />} isActive>
                    <Users />
                    <span>Clients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton render={<a href="#" />}>
                    <ReceiptText />
                    <span>Invoices</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarInsetHeader variant="floating">
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
          <h1 className="hx:text-sm hx:font-semibold">Clients</h1>
        </SidebarInsetHeader>
        <div className="hx:grid hx:gap-4 hx:p-4 hx:sm:grid-cols-3">
          {['Active clients', 'New this month', 'Revenue'].map((title, i) => (
            <Panel key={title} className="hx:p-5">
              <p className="hx:text-sm hx:text-fg-muted">{title}</p>
              <p className="hx:mt-1 hx:text-2xl hx:font-semibold">{['128', '7', 'CHF 84,210'][i]}</p>
            </Panel>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/** Placeholders while the navigation loads (e.g. projects fetched from an API). */
export const Loading: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {Array.from({ length: 5 }, (_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SidebarInsetHeader>
          <SidebarTrigger>
            <PanelLeft />
          </SidebarTrigger>
        </SidebarInsetHeader>
      </SidebarInset>
    </SidebarProvider>
  ),
};
