import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../../lib/cn';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  dialogBackdropClassName,
  dialogPopupClassName,
} from '../dialog/Dialog';

/**
 * A dialog that asks for a confirmation before an action, such as a deletion. Unlike `Dialog`, a click on the veil
 * does not close it: the user has to choose. Put the confirm and cancel buttons in `AlertDialogFooter`.
 */
export const AlertDialog = BaseAlertDialog.Root;
export const AlertDialogTrigger = BaseAlertDialog.Trigger;
export const AlertDialogClose = BaseAlertDialog.Close;

export type AlertDialogContentProps = ComponentProps<typeof BaseAlertDialog.Popup> & {
  portalProps?: ComponentProps<typeof BaseAlertDialog.Portal>;
};

export function AlertDialogContent({ className, portalProps, ...props }: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal {...portalProps}>
      <BaseAlertDialog.Backdrop className={dialogBackdropClassName} />
      <BaseAlertDialog.Popup className={mergeClassName(`${dialogPopupClassName} hx:w-md`, className)} {...props} />
    </BaseAlertDialog.Portal>
  );
}

export const AlertDialogHeader = DialogHeader;
export const AlertDialogFooter = DialogFooter;
export const AlertDialogTitle = DialogTitle;
export const AlertDialogDescription = DialogDescription;
