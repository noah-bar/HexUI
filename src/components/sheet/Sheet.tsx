import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

export function Sheet(props: ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root {...props} />;
}

export function SheetTrigger(props: ComponentProps<typeof BaseDialog.Trigger>) {
  return <BaseDialog.Trigger {...props} />;
}

export function SheetClose(props: ComponentProps<typeof BaseDialog.Close>) {
  return <BaseDialog.Close {...props} />;
}

export const sheetContentVariants = cva(
  [
    'hx:glass-dialog hx:fixed hx:z-50 hx:flex hx:max-h-dvh hx:max-w-dvw hx:flex-col hx:text-fg',
    'hx:overflow-clip hx:[overflow-clip-margin:1px] hx:outline-none',
    'hx:transition-transform hx:duration-500 hx:ease-in-out hx:motion-reduce:transition-none',
    'hx:data-ending-style:duration-300',
  ],
  {
    variants: {
      side: {
        top: [
          'hx:inset-x-0 hx:top-0 hx:h-full hx:w-full hx:rounded-b-xl',
          'hx:data-starting-style:-translate-y-full hx:data-ending-style:-translate-y-full',
        ],
        right: [
          'hx:inset-y-0 hx:right-0 hx:h-full hx:w-full hx:rounded-l-xl',
          'hx:data-starting-style:translate-x-full hx:data-ending-style:translate-x-full',
        ],
        bottom: [
          'hx:inset-x-0 hx:bottom-0 hx:h-full hx:w-full hx:rounded-t-xl',
          'hx:data-starting-style:translate-y-full hx:data-ending-style:translate-y-full',
        ],
        left: [
          'hx:inset-y-0 hx:left-0 hx:h-full hx:w-full hx:rounded-r-xl',
          'hx:data-starting-style:-translate-x-full hx:data-ending-style:-translate-x-full',
        ],
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        full: '',
      },
    },
    compoundVariants: [
      { side: ['left', 'right'], size: 'sm', className: 'hx:max-w-sm' },
      { side: ['left', 'right'], size: 'md', className: 'hx:max-w-md' },
      { side: ['left', 'right'], size: 'lg', className: 'hx:max-w-xl' },
      { side: ['left', 'right'], size: 'full', className: 'hx:max-w-none' },
      { side: ['top', 'bottom'], size: 'sm', className: 'hx:max-h-64' },
      { side: ['top', 'bottom'], size: 'md', className: 'hx:max-h-96' },
      { side: ['top', 'bottom'], size: 'lg', className: 'hx:max-h-[32rem]' },
      { side: ['top', 'bottom'], size: 'full', className: 'hx:max-h-none' },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  },
);

export type SheetContentProps = Omit<ComponentProps<typeof BaseDialog.Popup>, 'size'> &
  VariantProps<typeof sheetContentVariants> & {
    /** Props forwarded to the Portal (e.g. `container`). */
    portalProps?: ComponentProps<typeof BaseDialog.Portal>;
  };

/** Modal panel attached to a viewport edge. Put scrollable content in `SheetBody`. */
export function SheetContent({ className, side, size, portalProps, ...props }: SheetContentProps) {
  return (
    <BaseDialog.Portal {...portalProps}>
      <BaseDialog.Backdrop
        className={cn(
          'hx:fixed hx:inset-0 hx:z-50 hx:min-h-dvh hx:bg-glass-overlay hx:backdrop-blur-[4px]',
          'hx:transition-opacity hx:duration-200 hx:data-starting-style:opacity-0 hx:data-ending-style:opacity-0',
          'hx:motion-reduce:transition-none hx:supports-[-webkit-touch-callout:none]:absolute',
        )}
      />
      <BaseDialog.Popup className={mergeClassName(sheetContentVariants({ side, size }), className)} {...props} />
    </BaseDialog.Portal>
  );
}

export function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'hx:relative hx:flex hx:shrink-0 hx:flex-col hx:gap-1.5 hx:border-b hx:border-glass-border hx:p-5 hx:pr-14',
        className,
      )}
      {...props}
    />
  );
}

/** The only scroll container in a Sheet, preserving the glass surface's lit edge. */
export function SheetBody({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:min-h-0 hx:flex-1 hx:overflow-y-auto hx:p-5', className)} {...props} />;
}

export function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'hx:flex hx:shrink-0 hx:flex-col-reverse hx:gap-2 hx:border-t hx:border-glass-border hx:p-5',
        'hx:sm:flex-row hx:sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

export function SheetTitle({ className, ...props }: ComponentProps<typeof BaseDialog.Title>) {
  return (
    <BaseDialog.Title
      className={mergeClassName('hx:text-lg hx:leading-tight hx:font-semibold', className)}
      {...props}
    />
  );
}

export function SheetDescription({ className, ...props }: ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={mergeClassName('hx:text-sm hx:text-fg-muted', className)} {...props} />;
}

export function SheetCloseButton({
  className,
  children = <CloseIcon />,
  ...props
}: ComponentProps<typeof BaseDialog.Close>) {
  return (
    <BaseDialog.Close
      aria-label="Close"
      className={mergeClassName(
        [
          'hx:absolute hx:top-4 hx:right-4 hx:inline-flex hx:size-8 hx:items-center hx:justify-center hx:rounded-md',
          'hx:cursor-pointer hx:text-fg-muted hx:transition-colors hx:duration-150 hx:hover:bg-tint-hover hx:hover:text-fg',
          'hx:active:bg-tint-active hx:focus-ring hx:data-disabled:pointer-events-none hx:data-disabled:opacity-50',
          'hx:[&_svg]:size-4',
        ].join(' '),
        className,
      )}
      {...props}
    >
      {children}
    </BaseDialog.Close>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}
