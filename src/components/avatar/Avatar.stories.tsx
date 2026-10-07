import type { Meta, StoryObj } from '@storybook/react-vite';
import { Building2 } from 'lucide-react';
import { Panel } from '../panel/Panel';
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from './Avatar';

// Generated portrait placeholders: the stories work offline.
const portrait = (hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 70% 72%)"/><stop offset="1" stop-color="hsl(${hue + 40} 60% 52%)"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="rgba(255,255,255,.85)"/><path d="M12 60c2-12 10-18 20-18s18 6 20 18z" fill="rgba(255,255,255,.85)"/></svg>`,
  )}`;

const team = [
  { name: 'Camille Martin', initials: 'CM', src: portrait(235) },
  { name: 'Luca Bianchi', initials: 'LB', src: portrait(190) },
  { name: 'Sophie Rey', initials: 'SR' },
  { name: 'Nicolas Girard', initials: 'NG', src: portrait(280) },
];

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
  },
  decorators: [
    (Story) => (
      <Panel className="hx:max-w-md hx:p-6">
        <Story />
      </Panel>
    ),
  ],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Picture with initials as fallback (shown while loading or if the picture fails). */
export const Default: Story = {
  render: (args) => (
    <div className="hx:flex hx:items-center hx:gap-3">
      <Avatar {...args}>
        <AvatarImage src={team[0].src} alt={team[0].name} />
        <AvatarFallback>CM</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarFallback>SR</AvatarFallback>
      </Avatar>
      <Avatar {...args}>
        <AvatarImage src="/missing.png" alt="Broken link" />
        <AvatarFallback>LB</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="hx:flex hx:items-center hx:gap-3">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={team[1].src} alt={team[1].name} />
          <AvatarFallback>LB</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** `shape="square"` for organizations (clients, workspaces). */
export const Organization: Story = {
  render: () => (
    <div className="hx:flex hx:items-center hx:gap-3 hx:text-sm">
      <Avatar shape="square">
        <AvatarFallback>
          <Building2 />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="hx:font-medium">Léman Immobilier SA</p>
        <p className="hx:text-fg-muted">Nyon · 12 invoices</p>
      </div>
    </div>
  ),
};

/** Team of a project, with a counter for the people not shown. */
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {team.map((person) => (
        <Avatar key={person.name} size="sm">
          {person.src && <AvatarImage src={person.src} alt={person.name} />}
          <AvatarFallback>{person.initials}</AvatarFallback>
        </Avatar>
      ))}
      <Avatar size="sm" aria-label="3 more people">
        <AvatarFallback className="hx:bg-tint-active hx:text-fg-muted">+3</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};
