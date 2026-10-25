import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../button/Button';
import { MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle } from './MessageBar';

const meta = {
  title: 'Components/MessageBar',
  component: MessageBar,
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'inline-radio', options: ['info', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof MessageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { intent: 'info' },
  render: (args) => (
    <MessageBar {...args} className="hx:max-w-3xl">
      <MessageBarBody>
        <MessageBarTitle>New VAT rates.</MessageBarTitle>
        Invoices issued from 1 January 2027 use the new rates automatically.
      </MessageBarBody>
    </MessageBar>
  ),
};

export const Intents: Story = {
  render: () => (
    <div className="hx:flex hx:max-w-3xl hx:flex-col hx:gap-3">
      <MessageBar intent="info">
        <MessageBarBody>
          <MessageBarTitle>Maintenance.</MessageBarTitle>
          The bank sync will be unavailable on Sunday from 2 to 4 am.
        </MessageBarBody>
      </MessageBar>
      <MessageBar intent="success">
        <MessageBarBody>
          <MessageBarTitle>Import complete.</MessageBarTitle>
          128 clients were imported.
        </MessageBarBody>
      </MessageBar>
      <MessageBar intent="warning">
        <MessageBarBody>
          <MessageBarTitle>4 invoices are overdue.</MessageBarTitle>
          The oldest one is 45 days late.
        </MessageBarBody>
      </MessageBar>
      <MessageBar intent="danger">
        <MessageBarBody>
          <MessageBarTitle>Payment failed.</MessageBarTitle>
          The card on file was declined.
        </MessageBarBody>
      </MessageBar>
    </div>
  ),
};

/** `MessageBarActions` after the text; `onDismiss` adds a close button. */
export const WithActions: Story = {
  render: function Render() {
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <Button variant="secondary" onClick={() => setVisible(true)}>
          Show the message again
        </Button>
      );
    }
    return (
      <MessageBar intent="danger" role="alert" onDismiss={() => setVisible(false)} className="hx:max-w-3xl">
        <MessageBarBody>
          <MessageBarTitle>Bank sync failed.</MessageBarTitle>
          Your credentials for UBS have expired.
        </MessageBarBody>
        <MessageBarActions>
          <Button size="sm" variant="secondary">
            Reconnect
          </Button>
          <Button size="sm" variant="ghost">
            Details
          </Button>
        </MessageBarActions>
      </MessageBar>
    );
  },
};

/** A long text wraps; the actions move below it when space runs out. */
export const LongText: Story = {
  render: () => (
    <MessageBar intent="warning" className="hx:max-w-md">
      <MessageBarBody>
        <MessageBarTitle>Your plan ends in 5 days.</MessageBarTitle>
        After that, you can still view your invoices, but you can no longer create new ones or send reminders.
      </MessageBarBody>
      <MessageBarActions>
        <Button size="sm" variant="secondary">
          Renew
        </Button>
      </MessageBarActions>
    </MessageBar>
  ),
};
