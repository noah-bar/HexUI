import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

export type DialogContentProps = ComponentProps<typeof BaseDialog.Popup> & {
  /** Props forwarded to the Portal (e.g. `container`). */
  portalProps?: ComponentProps<typeof BaseDialog.Portal>;
};

export function DialogContent({ className, portalProps, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal {...portalProps}>
      <BaseDialog.Backdrop
        className={cn(
          'hx:fixed hx:inset-0 hx:z-50 hx:min-h-dvh hx:bg-glass-overlay hx:backdrop-blur-[4px]',
          'hx:transition-opacity hx:duration-200 hx:data-starting-style:opacity-0 hx:data-ending-style:opacity-0',
          'hx:supports-[-webkit-touch-callout:none]:absolute',
        )}
      />
      <BaseDialog.Popup
        className={mergeClassName(
          [
            'hx:glass-dialog hx:fixed hx:top-1/2 hx:left-1/2 hx:z-50 hx:-translate-x-1/2 hx:-translate-y-1/2',
            'hx:flex hx:w-lg hx:max-w-[calc(100vw-2rem)] hx:flex-col hx:gap-5 hx:rounded-xl hx:p-6 hx:text-fg',
            'hx:outline-none hx:transition-[scale,opacity] hx:duration-200 hx:ease-out',
            'hx:data-starting-style:scale-95 hx:data-starting-style:opacity-0',
            'hx:data-ending-style:scale-95 hx:data-ending-style:opacity-0',
          ].join(' '),
          className,
        )}
        {...props}
      />
    </BaseDialog.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:flex-col hx:gap-1.5', className)} {...props} />;
}

export function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:flex-col-reverse hx:gap-2 hx:sm:flex-row hx:sm:justify-end', className)} {...props} />;
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={mergeClassName('hx:text-lg hx:leading-tight hx:font-semibold', className)} {...props} />;
}

export function DialogDescription({ className, ...props }: ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={mergeClassName('hx:text-sm hx:text-fg-muted', className)} {...props} />;
}
