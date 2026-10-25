import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon, XIcon } from '../../lib/icons';

export const messageBarVariants = cva(
  'hx:flex hx:min-h-10 hx:w-full hx:items-start hx:gap-2 hx:rounded-xs hx:border hx:px-3 hx:py-2.5 hx:text-sm hx:text-fg',
  {
    variants: {
      // Fluent: a pale fill and a soft edge in the status color; the icon in the strong color, the text stays dark.
      intent: {
        info: 'hx:border-info-text/30 hx:bg-info-text/8',
        success: 'hx:border-success-text/30 hx:bg-success-text/8',
        warning: 'hx:border-warning-text/30 hx:bg-warning-text/8',
        danger: 'hx:border-danger-text/30 hx:bg-danger-text/8',
      },
    },
    defaultVariants: { intent: 'info' },
  },
);

const intentIcons = {
  info: <InfoIcon className="hx:text-info-text" />,
  success: <SuccessIcon className="hx:text-success-text" />,
  warning: <WarningIcon className="hx:text-warning-text" />,
  danger: <ErrorIcon className="hx:text-danger-text" />,
};

export type MessageBarProps = ComponentProps<'div'> &
  VariantProps<typeof messageBarVariants> & {
    /** Replaces the icon of the intent; `null` removes it. */
    icon?: ReactNode;
    /** Shows a close button that calls it. */
    onDismiss?: () => void;
    dismissLabel?: string;
  };

/**
 * A message across a page, a form or a panel, as in the Azure portal: information, success, warning or error.
 * For a message that appears after an action, add `role="status"` (or `role="alert"` for an error) so screen
 * readers announce it.
 */
export function MessageBar({
  intent,
  icon,
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
  children,
  ...props
}: MessageBarProps) {
  return (
    <div className={cn(messageBarVariants({ intent }), className)} {...props}>
      {icon !== null && (
        <span className="hx:flex hx:h-5 hx:items-center hx:[&_svg]:size-4 hx:[&_svg]:shrink-0">
          {icon ?? intentIcons[intent ?? 'info']}
        </span>
      )}
      <div className="hx:flex hx:min-w-0 hx:flex-1 hx:flex-wrap hx:items-center hx:gap-x-3 hx:gap-y-2">{children}</div>
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className={cn(
            'hx:-my-0.5 hx:-me-1 hx:flex hx:size-6 hx:shrink-0 hx:items-center hx:justify-center hx:rounded-xs hx:text-fg-muted',
            'hx:cursor-pointer hx:transition-colors hx:duration-100 hx:hover:bg-fg/10 hx:hover:text-fg hx:active:bg-fg/15',
            'hx:focus-ring hx:focus-visible:outline-offset-0',
          )}
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}

/** The text of the message; a `MessageBarTitle` inside it reads as its first words, in bold. */
export function MessageBarBody({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:min-w-0 hx:flex-1 hx:leading-5', className)} {...props} />;
}

export function MessageBarTitle({ className, ...props }: ComponentProps<'span'>) {
  return <span className={cn('hx:me-1 hx:font-semibold', className)} {...props} />;
}

/** Buttons or links after the text, such as “Retry” or “View details”. */
export function MessageBarActions({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:shrink-0 hx:items-center hx:gap-2', className)} {...props} />;
}
