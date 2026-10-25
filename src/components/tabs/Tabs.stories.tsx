import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileText, FolderKanban, LayoutDashboard } from 'lucide-react';
import { Panel } from '../panel/Panel';
import { Tabs, TabsList, TabsPanel, TabsTab } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const panels = [
  { value: 'overview', label: 'Overview', text: 'Workspace statistics and recent activity.' },
  { value: 'projects', label: 'Projects', text: 'Milestones, deadlines and owners.' },
  { value: 'billing', label: 'Billing', text: 'Subscription, invoices and payment methods.' },
];

export const Default: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" className="hx:max-w-lg" {...args}>
      <TabsList>
        {panels.map((p) => (
          <TabsTab key={p.value} value={p.value}>
            {p.label}
          </TabsTab>
        ))}
        <TabsTab value="disabled" disabled>
          Disabled
        </TabsTab>
      </TabsList>
      {panels.map((p) => (
        <TabsPanel key={p.value} value={p.value}>
          <Panel className="hx:p-5">
            <h3 className="hx:text-base hx:font-semibold">{p.label}</h3>
            <p className="hx:mt-1 hx:text-sm hx:text-fg-muted">{p.text}</p>
          </Panel>
        </TabsPanel>
      ))}
    </Tabs>
  ),
};

/** Icons before the labels. */
export const WithIcons: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" {...args}>
      <TabsList>
        <TabsTab value="overview">
          <LayoutDashboard /> Overview
        </TabsTab>
        <TabsTab value="projects">
          <FolderKanban /> Projects
        </TabsTab>
        <TabsTab value="billing">
          <FileText /> Billing
        </TabsTab>
      </TabsList>
    </Tabs>
  ),
};
