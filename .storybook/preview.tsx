import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { Backdrop, type BackdropProps } from '../src/components/backdrop/Backdrop';
import './preview.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    a11y: { test: 'todo' },
  },
  globalTypes: {
    backdrop: {
      description: 'Background behind the components',
      toolbar: {
        title: 'Background',
        icon: 'photo',
        items: [
          { value: 'mesh', title: 'Mesh' },
          { value: 'aurora', title: 'Aurora' },
          { value: 'plain', title: 'Plain' },
          { value: 'none', title: 'None (solid color)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    backdrop: 'mesh',
  },
  decorators: [
    (Story, { globals, parameters, viewMode }) => {
      const variant = globals.backdrop as BackdropProps['variant'] | 'none';
      return (
        <div className="sb-stage" data-view={viewMode} data-stage={parameters.stage}>
          {parameters.backdrop !== false && variant !== 'none' && <Backdrop position="absolute" variant={variant} />}
          <Story />
        </div>
      );
    },
    withThemeByClassName({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
