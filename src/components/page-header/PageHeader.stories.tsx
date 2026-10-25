import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Pencil, Plus, RefreshCw, Save, Trash2 } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../breadcrumb/Breadcrumb';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import {
  PageHeader,
  PageHeaderActionSeparator,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
} from './PageHeader';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

function Crumbs({ current }: { current: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Invoices</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/** Breadcrumb, title, description and a command bar of `ghost` buttons, in groups split by `PageHeaderActionSeparator`. */
export const Default: Story = {
  render: () => (
    <PageHeader className="hx:max-w-5xl">
      <Crumbs current="F-2026-1045" />
      <PageHeaderHeading>
        <PageHeaderTitle>F-2026-1045</PageHeaderTitle>
        <PageHeaderDescription>Romandie Santé · due 18.10.2026</PageHeaderDescription>
      </PageHeaderHeading>
      <PageHeaderActions>
        <Button variant="ghost" startIcon={<Pencil />} iconOnly="mobile">
          Edit
        </Button>
        <Button variant="ghost" startIcon={<Download />} iconOnly="mobile">
          Download PDF
        </Button>
        <PageHeaderActionSeparator />
        <Button variant="ghost" startIcon={<RefreshCw />} iconOnly="mobile">
          Refresh
        </Button>
        <PageHeaderActionSeparator />
        <Button variant="ghost" startIcon={<Trash2 />} iconOnly="mobile">
          Delete
        </Button>
      </PageHeaderActions>
    </PageHeader>
  ),
};

/** Only a title: the breadcrumb, description and command bar are all optional. */
export const TitleOnly: Story = {
  render: () => (
    <PageHeader>
      <PageHeaderTitle>Dashboard</PageHeaderTitle>
    </PageHeader>
  ),
};

/** A main action on the right of the title, without a command bar. */
export const WithPrimaryAction: Story = {
  render: () => (
    <PageHeader className="hx:max-w-5xl">
      <Crumbs current="All invoices" />
      <div className="hx:flex hx:flex-wrap hx:items-end hx:justify-between hx:gap-3">
        <PageHeaderHeading>
          <PageHeaderTitle>Invoices</PageHeaderTitle>
          <PageHeaderDescription>128 invoices, 4 overdue.</PageHeaderDescription>
        </PageHeaderHeading>
        <Button startIcon={<Plus />}>New invoice</Button>
      </div>
    </PageHeader>
  ),
};

/**
 * `sticky` keeps the command bar at the top while the page scrolls, for a form whose Save button must stay
 * in reach. Scroll the story.
 */
export const StickyActions: Story = {
  render: () => (
    <div className="hx:flex hx:max-w-5xl hx:flex-col hx:gap-4">
      <PageHeader>
        <Crumbs current="Edit" />
        <PageHeaderTitle>Edit F-2026-1045</PageHeaderTitle>
      </PageHeader>
      <PageHeaderActions sticky>
        <Button variant="ghost" startIcon={<Save />} iconOnly="mobile">
          Save
        </Button>
        <PageHeaderActionSeparator />
        <Button variant="ghost" startIcon={<Trash2 />} iconOnly="mobile">
          Discard changes
        </Button>
      </PageHeaderActions>
      {Array.from({ length: 10 }, (_, i) => (
        <Panel key={i} className="hx:p-4 hx:text-sm">
          Section {i + 1}
        </Panel>
      ))}
    </div>
  ),
};
