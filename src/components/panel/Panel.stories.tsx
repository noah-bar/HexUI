import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from './Panel';

const meta = {
  title: 'Components/Panel',
  component: Panel,
  tags: ['autodocs'],
  args: { variant: 'default', padding: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['thin', 'default', 'strong'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Panel {...args} className="hx:max-w-md hx:text-sm">
      Une surface en verre sans mise en page imposée : à vous d’y placer ce que vous voulez.
    </Panel>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="hx:grid hx:max-w-3xl hx:grid-cols-1 hx:gap-4 hx:sm:grid-cols-3">
      {(['thin', 'default', 'strong'] as const).map((variant) => (
        <Panel key={variant} {...args} variant={variant} className="hx:text-sm">
          <p className="hx:font-semibold">{variant}</p>
          <p className="hx:mt-1 hx:text-fg-muted">
            {variant === 'thin' && 'Navigation, barres d’outils : peu de texte.'}
            {variant === 'default' && 'Conteneurs, tableaux, listes.'}
            {variant === 'strong' && 'Contenu long ou à lire attentivement.'}
          </p>
        </Panel>
      ))}
    </div>
  ),
};

const rows = [
  { name: 'Portail client', owner: 'Équipe Web', progress: '82 %', due: '15.10.2026' },
  { name: 'Application mobile', owner: 'Équipe Mobile', progress: '46 %', due: '30.11.2026' },
  { name: 'Migration ERP', owner: 'Équipe Data', progress: '23 %', due: '20.01.2027' },
  { name: 'Refonte facturation', owner: 'Équipe Finance', progress: '100 %', due: '01.09.2026' },
];

/** With `padding="none"` the content runs edge to edge and is clipped to the rounded corners. */
export const Table: Story = {
  args: { padding: 'none' },
  render: (args) => (
    <Panel {...args} className="hx:max-w-2xl">
      <table className="hx:w-full hx:border-collapse hx:text-left hx:text-sm hx:tabular-nums">
        <thead className="hx:text-fg-muted">
          <tr>
            {['Projet', 'Responsable', 'Avancement', 'Échéance'].map((h) => (
              <th key={h} className="hx:px-4 hx:py-3 hx:font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="hx:border-t hx:border-glass-border hx:transition-colors hx:hover:bg-tint-hover">
              <td className="hx:px-4 hx:py-3 hx:font-medium">{row.name}</td>
              <td className="hx:px-4 hx:py-3">{row.owner}</td>
              <td className="hx:px-4 hx:py-3">{row.progress}</td>
              <td className="hx:px-4 hx:py-3">{row.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  ),
};

/** `render` changes the element while keeping the styles, here a semantic `<aside>`. */
export const AsAside: Story = {
  args: { variant: 'thin', padding: 'sm' },
  render: (args) => (
    <Panel {...args} render={<aside aria-label="Navigation" />} className="hx:w-56">
      <nav className="hx:flex hx:flex-col hx:gap-1 hx:text-sm">
        {['Tableau de bord', 'Projets', 'Clients', 'Facturation', 'Paramètres'].map((item, i) => (
          <a
            key={item}
            href="#"
            aria-current={i === 0 ? 'page' : undefined}
            className="hx:rounded-md hx:px-3 hx:py-2 hx:text-fg-muted hx:no-underline hx:hover:bg-tint-hover hx:hover:text-fg hx:aria-[current=page]:bg-tint-active hx:aria-[current=page]:font-medium hx:aria-[current=page]:text-fg"
          >
            {item}
          </a>
        ))}
      </nav>
    </Panel>
  ),
};
