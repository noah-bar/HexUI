import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Panel } from '../panel/Panel';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: { page: 1, totalPages: 12, maxVisible: 5, onPageChange: () => {} },
  argTypes: {
    page: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 0 } },
    maxVisible: { control: { type: 'number', min: 5, max: 11, step: 2 } },
  },
  decorators: [
    (Story) => (
      <Panel padding="sm" className="hx:max-w-xl">
        <Story />
      </Panel>
    ),
  ],
  // The current page lives in the story args, so clicking a page updates the `page` control too.
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return <Pagination {...args} onPageChange={(page) => updateArgs({ page })} />;
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 12 pages: ellipses appear on the right. */
export const Default: Story = {};

/** Current page in the middle: ellipses on both sides. */
export const MiddlePage: Story = {
  args: { page: 7 },
};

/** Last page: the "next" button is disabled. */
export const LastPage: Story = {
  args: { page: 12 },
};

/** Few pages: every page is shown, no ellipsis. */
export const FewPages: Story = {
  args: { totalPages: 4 },
};

/** More page buttons for wide layouts. */
export const MoreVisiblePages: Story = {
  args: { page: 21, totalPages: 50, maxVisible: 9 },
};

/** English labels for the arrow buttons and page numbers (screen readers). */
export const CustomLabels: Story = {
  args: {
    page: 3,
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
    pageLabel: (page: number) => `Go to page ${page}`,
  },
};
