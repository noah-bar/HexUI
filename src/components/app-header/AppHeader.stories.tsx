import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, Hexagon, LayoutDashboard, Menu as MenuIcon, ReceiptText, Search, Settings, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '../avatar/Avatar';
import { Button } from '../button/Button';
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from '../menu/Menu';
import { Panel } from '../panel/Panel';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '../sidebar/Sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip/Tooltip';
import { AppHeader, AppHeaderActions, AppHeaderBrand } from './AppHeader';

const meta = {
  title: 'Components/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    stage: 'bare',
    docs: { story: { inline: false, iframeHeight: 560 } },
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

function Actions() {
  return (
    <AppHeaderActions>
      <Tooltip>
        <TooltipTrigger render={<Button variant="header" size="icon" aria-label="Search" />}>
          <Search />
        </TooltipTrigger>
        <TooltipContent side="bottom">Search</TooltipContent>
      </Tooltip>
      <Button variant="header" size="icon" aria-label="Notifications">
        <Bell />
      </Button>
      <Button variant="header" size="icon" aria-label="Settings">
        <Settings />
      </Button>
      <Menu>
        <MenuTrigger render={<Button variant="header" className="hx:gap-2 hx:px-2" />}>
          <span className="hx:hidden hx:sm:inline">Camille Martin</span>
          <Avatar size="xs">
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
        </MenuTrigger>
        <MenuContent align="end">
          <MenuItem>Profile</MenuItem>
          <MenuItem>Preferences</MenuItem>
          <MenuSeparator />
          <MenuItem>Sign out</MenuItem>
        </MenuContent>
      </Menu>
    </AppHeaderActions>
  );
}

/** The bar alone: the product name on the left, buttons on the right (`Button variant="header"`). */
export const Default: Story = {
  render: () => (
    <AppHeader>
      <AppHeaderBrand href="#">
        <Hexagon />
        Hex-Tech Invoicing
      </AppHeaderBrand>
      <Actions />
    </AppHeader>
  ),
};

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Invoices', icon: ReceiptText, active: true },
  { label: 'Clients', icon: Users },
];

/**
 * A full page: the header is the first child of `SidebarProvider`. The sidebar sticks below it, and the
 * `SidebarTrigger` in the header collapses it to icons (or opens it as a sheet under 768px).
 */
export const WithSidebar: Story = {
  render: () => (
    <SidebarProvider>
      <AppHeader>
        <SidebarTrigger variant="header">
          <MenuIcon />
        </SidebarTrigger>
        <AppHeaderBrand href="#" className="hx:ps-1">
          Hex-Tech Invoicing
        </AppHeaderBrand>
        <Actions />
      </AppHeader>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Billing</SidebarGroupLabel>
            <SidebarMenu>
              {nav.map(({ label, icon: Icon, active }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton isActive={active} tooltip={label}>
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="hx:bg-bg hx:p-6">
        <h1 className="hx:mb-4 hx:text-xl hx:font-semibold">Invoices</h1>
        <div className="hx:flex hx:flex-col hx:gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <Panel key={i} className="hx:p-4 hx:text-sm">
              Invoice F-2026-{1042 + i}
            </Panel>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};
