import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../button/Button';
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';

const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A confirmation before a destructive action. A click on the veil does not close it; Escape does. */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline-danger" />}>Delete invoice</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete invoice F-2026-1045?</AlertDialogTitle>
          <AlertDialogDescription>
            The invoice and its payment history will be deleted. This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="secondary" />}>Cancel</AlertDialogClose>
          <AlertDialogClose render={<Button variant="danger" />}>Delete</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/** Controlled, with an action that takes time: the dialog stays open until it is done. */
export const AsyncConfirm: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const send = () => {
      setSending(true);
      setTimeout(() => {
        setSending(false);
        setOpen(false);
      }, 1500);
    };
    return (
      <AlertDialog open={open} onOpenChange={(next) => !sending && setOpen(next)}>
        <AlertDialogTrigger render={<Button />}>Send 12 reminders</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send 12 payment reminders?</AlertDialogTitle>
            <AlertDialogDescription>Each client with an overdue invoice receives an email.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="secondary" disabled={sending} />}>Cancel</AlertDialogClose>
            <Button loading={sending} onClick={send}>
              Send reminders
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};
