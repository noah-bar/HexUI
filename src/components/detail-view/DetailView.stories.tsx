import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, MoreHorizontal, Pencil } from 'lucide-react';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { TabsTab } from '../tabs/Tabs';
import {
  DetailItem,
  DetailList,
  DetailSection,
  DetailView,
  DetailViewActions,
  DetailViewContent,
  DetailViewDescription,
  DetailViewHeader,
  DetailViewHeading,
  DetailViewImage,
  DetailViewMeta,
  DetailViewTabs,
  DetailViewTabsList,
  DetailViewTabsPanel,
  DetailViewTitle,
} from './DetailView';

const meta = {
  title: 'Components/DetailView',
  component: DetailView,
  tags: ['autodocs'],
} satisfies Meta<typeof DetailView>;

export default meta;
type Story = StoryObj<typeof meta>;

// A drawn picture, so the stories work offline.
const picture =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#c7e0f4"/>' +
      '<rect x="18" y="14" width="28" height="40" rx="6" fill="#0f6cbd"/><rect x="24" y="8" width="16" height="8" rx="2" fill="#115ea3"/>' +
      '<circle cx="32" cy="34" r="7" fill="#eff6fc"/></svg>',
  );

function Header() {
  return (
    <DetailViewHeader>
      <DetailViewImage src={picture} alt="Pressure vessel B-204" onClick={() => alert('Open the image')} />
      <DetailViewHeading>
        <DetailViewTitle>Pressure vessel B-204</DetailViewTitle>
        <DetailViewDescription>Hex-Tech Chemicals · Building 12</DetailViewDescription>
        <DetailViewMeta>Updated 14.07.2026 by Claire Martin</DetailViewMeta>
      </DetailViewHeading>
      <DetailViewActions>
        <Button variant="ghost" startIcon={<Pencil />} iconOnly="mobile">
          Edit
        </Button>
        <Button variant="ghost" size="icon" aria-label="More actions">
          <MoreHorizontal />
        </Button>
      </DetailViewActions>
    </DetailViewHeader>
  );
}

function GeneralItems() {
  return (
    <>
      <DetailItem label="Company" value="Hex-Tech Chemicals" />
      <DetailItem label="Device type" value="Pressure vessel" />
      <DetailItem label="Folder number" value="DS-2041" />
      <DetailItem label="Fabrication number" value="FAB-88213" />
      <DetailItem label="Year" value="2014" />
      <DetailItem label="Risk" value={<Badge variant="warning">Medium</Badge>} />
    </>
  );
}

function LocationItems() {
  return (
    <>
      <DetailItem label="Building" value="12" />
      <DetailItem label="Floor" value="Ground floor" />
      <DetailItem label="Zone" value="B" />
      <DetailItem label="Pit" value={null} />
    </>
  );
}

function TechnicalItems() {
  return (
    <>
      <DetailItem label="Volume" value="250" unit="L" />
      <DetailItem label="Max. pressure" value="16" unit="bar" />
      <DetailItem label="Min. temperature" value="-10" unit="°C" />
      <DetailItem label="Max. temperature" value="120" unit="°C" />
      <DetailItem label="Material" value="Stainless steel 1.4404" />
      <DetailItem label="Construction code" value="AD 2000" />
    </>
  );
}

/** One list of fields under the header: the most compact way to show a record. */
export const Default: Story = {
  render: () => (
    <DetailView className="hx:max-w-4xl">
      <Header />
      <DetailViewContent>
        <DetailList>
          <GeneralItems />
          <LocationItems />
          <TechnicalItems />
          <DetailItem
            span="full"
            label="Remark"
            value={'Inspected after the valve replacement.\nNext external inspection in 2027.'}
          />
        </DetailList>
      </DetailViewContent>
    </DetailView>
  ),
};

/** `DetailSection` titles groups of fields and draws a line between them. */
export const Sections: Story = {
  render: () => (
    <DetailView className="hx:max-w-4xl">
      <Header />
      <DetailViewContent>
        <DetailSection title="General">
          <DetailList>
            <GeneralItems />
          </DetailList>
        </DetailSection>
        <DetailSection title="Location">
          <DetailList>
            <LocationItems />
          </DetailList>
        </DetailSection>
        <DetailSection title="Technical data">
          <DetailList>
            <TechnicalItems />
          </DetailList>
        </DetailSection>
      </DetailViewContent>
    </DetailView>
  ),
};

/** Optional tabs between the header and the fields. With a height, the fields scroll and the header stays. */
export const Tabs: Story = {
  render: () => (
    <DetailView className="hx:h-96 hx:max-w-4xl">
      <Header />
      <DetailViewTabs defaultValue="general">
        <DetailViewTabsList>
          <TabsTab value="general">General</TabsTab>
          <TabsTab value="location">Location</TabsTab>
          <TabsTab value="technical">Technical data</TabsTab>
        </DetailViewTabsList>
        <DetailViewTabsPanel value="general">
          <DetailList>
            <GeneralItems />
          </DetailList>
        </DetailViewTabsPanel>
        <DetailViewTabsPanel value="location">
          <DetailList>
            <LocationItems />
          </DetailList>
        </DetailViewTabsPanel>
        <DetailViewTabsPanel value="technical">
          <DetailList>
            <TechnicalItems />
          </DetailList>
        </DetailViewTabsPanel>
      </DetailViewTabs>
    </DetailView>
  ),
};

/** Without a picture, the image shows its children, such as an icon; or leave the image out. */
export const IconInsteadOfImage: Story = {
  render: () => (
    <DetailView className="hx:max-w-xl">
      <DetailViewHeader>
        <DetailViewImage>
          <Box />
        </DetailViewImage>
        <DetailViewHeading>
          <DetailViewTitle>Spare valve kit</DetailViewTitle>
          <DetailViewDescription>Stock item · Warehouse 2</DetailViewDescription>
        </DetailViewHeading>
      </DetailViewHeader>
      <DetailViewContent>
        <DetailList columns={2}>
          <DetailItem label="Reference" value="VK-310" />
          <DetailItem label="Quantity" value="12" unit="pcs" />
          <DetailItem label="Supplier" value="Valvex AG" />
          <DetailItem label="Last order" value="" />
        </DetailList>
      </DetailViewContent>
    </DetailView>
  ),
};
