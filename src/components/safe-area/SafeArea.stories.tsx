import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu as MenuIcon } from 'lucide-react';
import { AppHeader, AppHeaderBrand } from '../app-header/AppHeader';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import { SafeArea } from './SafeArea';

const meta = {
  title: 'Components/SafeArea',
  component: SafeArea,
  tags: ['autodocs'],
  parameters: { stage: 'bare' },
} satisfies Meta<typeof SafeArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Wrap the application root. Insets are 0 on desktop: open this story on an iPhone (or in the
 * device toolbar of the browser's developer tools) to see the bands. The page needs
 * `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
 * Here the top band takes the color of the `AppHeader`, so the dark bar runs up under the status bar.
 */
export const Default: Story = {
  render: (args) => (
    <SafeArea
      {...args}
      className="hx:h-dvh hx:w-full hx:bg-bg"
      topClassName="hx:bg-header"
      bottomClassName="hx:bg-surface"
    >
      <div className="hx:flex hx:h-full hx:flex-col">
        <AppHeader>
          <Button variant="header" size="icon" aria-label="Open navigation">
            <MenuIcon />
          </Button>
          <AppHeaderBrand href="#" className="hx:ps-1">
            Hex-Tech Invoicing
          </AppHeaderBrand>
        </AppHeader>
        <div className="hx:flex hx:flex-1 hx:flex-col hx:gap-3 hx:p-4">
          <Panel className="hx:flex-1 hx:p-4 hx:text-sm hx:text-fg-muted">
            Content stays clear of the notch, the status bar and the home indicator.
          </Panel>
        </div>
      </div>
    </SafeArea>
  ),
};
