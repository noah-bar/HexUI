import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from '../panel/Panel';
import { SafeArea } from './SafeArea';

const meta = {
  title: 'Components/SafeArea',
  component: SafeArea,
  tags: ['autodocs'],
} satisfies Meta<typeof SafeArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Wrap the application root. Insets are 0 on desktop: open this story on an iPhone (or in the
 * device toolbar of the browser's developer tools) to see the bands. The page needs
 * `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
 */
export const Default: Story = {
  render: (args) => (
    <SafeArea
      {...args}
      className="hx:h-dvh hx:w-full"
      topClassName="hx:bg-tint-active"
      bottomClassName="hx:bg-tint-active"
    >
      <div className="hx:flex hx:h-full hx:flex-col hx:gap-3 hx:p-4">
        <Panel variant="thin" className="hx:px-4 hx:py-3 hx:text-sm hx:font-medium">
          Header
        </Panel>
        <Panel className="hx:flex-1 hx:p-4 hx:text-sm hx:text-fg-muted">
          Content stays clear of the notch, the status bar and the home indicator.
        </Panel>
      </div>
    </SafeArea>
  ),
};
