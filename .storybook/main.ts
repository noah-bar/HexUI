import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      // The root vite.config.ts is the library build; Storybook gets a plain app config.
      builder: { viteConfigPath: '.storybook/vite.config.ts' },
    },
  },
};

export default config;
