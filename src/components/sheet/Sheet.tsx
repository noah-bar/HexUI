import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';
import { XIcon } from '../../lib/icons';

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
    // Fluent drawer: a white panel with square edges and the deepest shadow; a border draws the edge in dark.
    'hx:fixed hx:z-50 hx:flex hx:max-h-dvh hx:max-w-dvw hx:flex-col hx:overflow-hidden hx:text-fg hx:outline-none',
    'hx:bg-surface hx:shadow-panel hx:dark:border-border',
    'hx:transition-transform hx:duration-300 hx:ease-[cubic-bezier(0.1,0.9,0.2,1)] hx:motion-reduce:transition-none',
    'hx:data-ending-style:duration-200 hx:data-ending-style:ease-[cubic-bezier(0.9,0.1,1,0.2)]',
  ],
  {
    variants: {
      side: {
        top: [
          'hx:inset-x-0 hx:top-0 hx:h-full hx:w-full hx:dark:border-b',
          'hx:data-starting-style:-translate-y-full hx:data-ending-style:-translate-y-full',
        ],
        right: [
          'hx:inset-y-0 hx:right-0 hx:h-full hx:w-full hx:dark:border-l',
          'hx:data-starting-style:translate-x-full hx:data-ending-style:translate-x-full',
        ],
        bottom: [
          'hx:inset-x-0 hx:bottom-0 hx:h-full hx:w-full hx:dark:border-t',
          'hx:data-starting-style:translate-y-full hx:data-ending-style:translate-y-full',
        ],
        left: [
          'hx:inset-y-0 hx:left-0 hx:h-full hx:w-full hx:dark:border-r',
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
    portalProps?: ComponentProps<typeof BaseDialog.Portal>;
  };

/** Put scrollable content in `SheetBody`. */
export function SheetContent({ className, side, size, portalProps, ...props }: SheetContentProps) {
  return (
    <BaseDialog.Portal {...portalProps}>
      <BaseDialog.Backdrop
        className={cn(
          'hx:fixed hx:inset-0 hx:z-50 hx:min-h-dvh hx:bg-overlay',
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
      className={cn('hx:relative hx:flex hx:shrink-0 hx:flex-col hx:gap-2 hx:p-6 hx:pb-4 hx:pr-14', className)}
      {...props}
    />
  );
}

export function SheetBody({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:min-h-0 hx:flex-1 hx:overflow-y-auto hx:px-6 hx:py-2', className)} {...props} />;
}

export function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'hx:flex hx:shrink-0 hx:flex-col-reverse hx:gap-2 hx:p-6 hx:pt-4',
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
      className={mergeClassName('hx:text-xl hx:leading-tight hx:font-semibold', className)}
      {...props}
    />
  );
}

export function SheetDescription({ className, ...props }: ComponentProps<typeof BaseDialog.Description>) {
  return <BaseDialog.Description className={mergeClassName('hx:text-sm hx:text-fg-muted', className)} {...props} />;
}

export function SheetCloseButton({
  className,
  children = <XIcon />,
  ...props
}: ComponentProps<typeof BaseDialog.Close>) {
  return (
    <BaseDialog.Close
      aria-label="Close"
      className={mergeClassName(
        [
          'hx:absolute hx:top-5 hx:right-5 hx:inline-flex hx:size-8 hx:items-center hx:justify-center hx:rounded-xs',
          'hx:cursor-pointer hx:text-fg-muted hx:transition-colors hx:duration-100 hx:hover:bg-surface-hover hx:hover:text-fg',
          'hx:active:bg-surface-pressed hx:focus-ring hx:data-disabled:pointer-events-none hx:data-disabled:text-fg-disabled',
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
