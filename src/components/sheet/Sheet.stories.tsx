import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../badge/Badge';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetCloseButton,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet';

const meta = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  { id: 'F-2026-1084', date: '04.10.2026', amount: 'CHF 8,420.00', status: 'Paid' },
  { id: 'F-2026-1041', date: '12.09.2026', amount: 'CHF 3,760.00', status: 'Paid' },
  { id: 'F-2026-0998', date: '28.08.2026', amount: 'CHF 6,195.50', status: 'Pending' },
];

export const Default: Story = {
  render: (args) => (
    <Panel className="hx:max-w-2xl hx:p-6">
      <div className="hx:flex hx:items-center hx:justify-between hx:gap-5">
        <div>
          <p className="hx:text-sm hx:font-semibold hx:text-fg">Léman Immobilier SA</p>
          <p className="hx:mt-1 hx:text-sm hx:text-fg-muted">Lausanne · Client since 2022</p>
        </div>
        <Sheet {...args}>
          <SheetTrigger render={<Button variant="secondary" />}>View client</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Léman Immobilier SA</SheetTitle>
              <SheetDescription>Contact details, billing and recent activity.</SheetDescription>
              <SheetCloseButton aria-label="Close panel" />
            </SheetHeader>
            <SheetBody className="hx:flex hx:flex-col hx:gap-5">
              <section>
                <h3 className="hx:text-sm hx:font-semibold hx:text-fg">Main contact</h3>
                <dl className="hx:mt-3 hx:grid hx:grid-cols-[auto_1fr] hx:gap-x-5 hx:gap-y-2 hx:text-sm">
                  <dt className="hx:text-fg-muted">Name</dt>
                  <dd className="hx:text-right hx:text-fg">Sophie Rochat</dd>
                  <dt className="hx:text-fg-muted">Email</dt>
                  <dd className="hx:text-right hx:text-fg">s.rochat@leman-immo.ch</dd>
                  <dt className="hx:text-fg-muted">Phone</dt>
                  <dd className="hx:text-right hx:text-fg">+41 21 555 01 84</dd>
                </dl>
              </section>
              <section>
                <div className="hx:flex hx:items-center hx:justify-between hx:gap-3">
                  <h3 className="hx:text-sm hx:font-semibold hx:text-fg">Latest invoices</h3>
                  <Badge variant="success" dot>
                    Up to date
                  </Badge>
                </div>
                <div className="hx:mt-3 hx:flex hx:flex-col hx:divide-y hx:divide-glass-border">
                  {invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="hx:flex hx:items-center hx:justify-between hx:gap-4 hx:py-3 hx:text-sm"
                    >
                      <div>
                        <p className="hx:font-medium hx:text-fg">{invoice.id}</p>
                        <p className="hx:text-fg-muted">{invoice.date}</p>
                      </div>
                      <div className="hx:text-right">
                        <p className="hx:font-medium hx:text-fg">{invoice.amount}</p>
                        <p className="hx:text-fg-muted">{invoice.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </SheetBody>
            <SheetFooter>
              <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
              <Button>Edit client</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Panel>
  ),
};

export const FromLeft: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="secondary" />}>Open navigation</SheetTrigger>
      <SheetContent side="left" size="sm">
        <SheetHeader>
          <SheetTitle>Hex Finance</SheetTitle>
          <SheetDescription>Workspace navigation.</SheetDescription>
          <SheetCloseButton aria-label="Close navigation" />
        </SheetHeader>
        <SheetBody>
          <nav aria-label="Main navigation" className="hx:flex hx:flex-col hx:gap-1">
            {['Dashboard', 'Clients', 'Quotes', 'Invoices', 'Reports'].map((item, index) => (
              <a
                key={item}
                href="#"
                aria-current={index === 1 ? 'page' : undefined}
                className={
                  index === 1
                    ? 'hx:rounded-md hx:bg-tint-active hx:px-3 hx:py-2 hx:text-sm hx:font-medium hx:text-fg'
                    : 'hx:rounded-md hx:px-3 hx:py-2 hx:text-sm hx:text-fg-muted hx:hover:bg-tint-hover hx:hover:text-fg'
                }
              >
                {item}
              </a>
            ))}
          </nav>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
};

const denseInvoices = Array.from({ length: 18 }, (_, index) => ({
  id: `F-2026-${String(1102 - index).padStart(4, '0')}`,
  client: ['Atelier Nord', 'Alpina Logistique', 'Cabinet du Rhône', 'Montreux Conseil'][index % 4],
  amount: (1250 + index * 684.75).toLocaleString('en-CH', { style: 'currency', currency: 'CHF' }),
}));

/** Worst case: a translucent Sheet over dense, high-contrast content with a long scrolling body. */
export const OverDenseContent: Story = {
  tags: ['!autodocs'],
  render: (args) => (
    <>
      <Panel>
        <table className="hx:w-full hx:border-collapse hx:text-left hx:text-sm hx:tabular-nums">
          <thead className="hx:text-fg-muted">
            <tr>
              {['No.', 'Client', 'Amount'].map((heading) => (
                <th key={heading} className="hx:px-4 hx:py-3 hx:font-medium">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {denseInvoices.map((invoice) => (
              <tr key={invoice.id} className="hx:border-t hx:border-glass-border">
                <td className="hx:px-4 hx:py-2.5 hx:font-medium">{invoice.id}</td>
                <td className="hx:px-4 hx:py-2.5">{invoice.client}</td>
                <td className="hx:px-4 hx:py-2.5 hx:text-right">{invoice.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <Sheet defaultOpen {...args}>
        <SheetContent size="lg">
          <SheetHeader>
            <SheetTitle>Invoices to review</SheetTitle>
            <SheetDescription>18 imported documents need approval before posting.</SheetDescription>
            <SheetCloseButton aria-label="Close panel" />
          </SheetHeader>
          <SheetBody className="hx:flex hx:flex-col hx:gap-3">
            {denseInvoices.map((invoice, index) => (
              <Panel key={invoice.id} className="hx:p-5">
                <div className="hx:flex hx:items-start hx:justify-between hx:gap-4">
                  <div>
                    <p className="hx:text-sm hx:font-medium hx:text-fg">{invoice.id}</p>
                    <p className="hx:mt-1 hx:text-sm hx:text-fg-muted">{invoice.client}</p>
                  </div>
                  <Badge variant={index % 3 === 0 ? 'warning' : 'neutral'}>
                    {index % 3 === 0 ? 'Discrepancy found' : 'To review'}
                  </Badge>
                </div>
                <p className="hx:mt-4 hx:text-right hx:text-sm hx:font-semibold hx:text-fg">{invoice.amount}</p>
              </Panel>
            ))}
          </SheetBody>
          <SheetFooter>
            <SheetClose render={<Button variant="ghost" />}>Later</SheetClose>
            <Button>Approve selection</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  ),
};
