import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef } from 'react';
import { Button } from '../button/Button';
import { Panel } from '../panel/Panel';
import { ToastProvider, useToast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
  parameters: { docs: { story: { inline: false, iframeHeight: 420 } } },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

function TypeButtons() {
  const toast = useToast();
  return (
    <div className="hx:flex hx:flex-wrap hx:gap-3">
      <Button
        variant="secondary"
        onClick={() => toast.add({ type: 'success', title: 'Invoice sent', description: 'F-2026-1045 has been sent to Romandie Santé.' })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ type: 'error', title: 'Export failed', description: 'The server did not respond. Try again in a moment.' })}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.add({ type: 'warning', title: 'Quota almost reached', description: '92% of the storage space is used.' })}
      >
        Warning
      </Button>
      <Button variant="secondary" onClick={() => toast.add({ type: 'info', title: 'New version available' })}>
        Info
      </Button>
    </div>
  );
}

export const Default: Story = {
  args: { children: null },
  render: () => <TypeButtons />,
};

/** `actionProps` adds a button inside the toast, e.g. to undo an action. */
export const WithAction: Story = {
  args: { children: null },
  render: function WithActionStory() {
    const toast = useToast();
    return (
      <Button
        variant="danger"
        onClick={() => {
          const id = toast.add({
            title: 'Project archived',
            description: 'Client portal redesign has been moved to the archive.',
            actionProps: {
              children: 'Undo',
              onClick: () => {
                toast.close(id);
                toast.add({ type: 'success', title: 'Archiving undone' });
              },
            },
          });
        }}
      >
        Archive project
      </Button>
    );
  },
};

/** `toast.promise` shows a loading toast, then turns it into success or error. */
export const Promise: Story = {
  args: { children: null },
  render: function PromiseStory() {
    const toast = useToast();
    return (
      <Button
        onClick={() =>
          toast.promise(new globalThis.Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: { type: 'loading', title: 'Generating report…' },
            success: { type: 'success', title: 'Report ready', description: 'Report_Q3_2026.pdf has been downloaded.' },
            error: { type: 'error', title: 'Generation failed' },
          })
        }
      >
        Generate report
      </Button>
    );
  },
};

function AddOnMount() {
  const toast = useToast();
  const added = useRef(false);
  useEffect(() => {
    if (added.current) return;
    added.current = true;
    toast.add({ type: 'info', title: 'Sync complete', timeout: 0 });
    toast.add({ type: 'warning', title: 'Quota almost reached', description: '92% of the storage space is used.', timeout: 0 });
    toast.add({
      type: 'success',
      title: 'Invoice sent',
      description: 'F-2026-1045 has been sent to Romandie Santé.',
      timeout: 0,
      actionProps: { children: 'View invoice' },
    });
  }, [toast]);
  // Dense content behind the stack: the worst case for a translucent toast.
  return (
    <Panel className="hx:max-w-5xl">
      <table className="hx:w-full hx:border-collapse hx:text-left hx:text-sm hx:tabular-nums">
        <tbody>
          {Array.from({ length: 9 }, (_, i) => (
            <tr key={i} className="hx:border-t hx:border-glass-border hx:first:border-t-0">
              <td className="hx:px-4 hx:py-2.5 hx:font-medium">F-2026-{1042 + i}</td>
              <td className="hx:px-4 hx:py-2.5">{['Banque Cantonale', 'Helvetia Services', 'Alpina Logistique'][i % 3]}</td>
              <td className="hx:px-4 hx:py-2.5">{(1830 + i * 947.35).toFixed(2)} CHF</td>
              <td className="hx:px-4 hx:py-2.5">{['Paid', 'Sent', 'Overdue'][i % 3]}</td>
              <td className="hx:px-4 hx:py-2.5">{`${String((i % 28) + 1).padStart(2, '0')}.09.2026`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

/** A stack of persistent toasts over dense content, rendered on load (hover to fan them out). */
export const Showcase: Story = {
  args: { children: null },
  tags: ['!autodocs'],
  render: () => <AddOnMount />,
};
