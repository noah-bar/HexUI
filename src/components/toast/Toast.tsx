import { Toast as BaseToast } from '@base-ui/react/toast';
import type { ComponentProps, ReactNode } from 'react';
import { ErrorIcon, InfoIcon, SpinnerIcon, SuccessIcon, WarningIcon, XIcon } from '../../lib/icons';
import { buttonVariants } from '../button/Button';

export const useToast = BaseToast.useToastManager;

export const createToastManager = BaseToast.createToastManager;

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export type ToastProviderProps = ComponentProps<typeof BaseToast.Provider> & {
  closeLabel?: string;
};

export function ToastProvider({ children, closeLabel = 'Close', ...props }: ToastProviderProps) {
  return (
    <BaseToast.Provider {...props}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="hx-toast-viewport">
          <ToastList closeLabel={closeLabel} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}

function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = useToast();
  return toasts.map((toast) => (
    <BaseToast.Root
      key={toast.id}
      toast={toast}
      className="hx-toast hx:rounded-xs hx:border hx:border-transparent hx:bg-surface hx:text-fg hx:shadow-popup hx:dark:border-border"
    >
      <BaseToast.Content className="hx-toast-content hx:flex hx:items-start hx:gap-3 hx:overflow-hidden hx:p-3">
        {toast.type && toastIcons[toast.type as ToastType]}
        <div className="hx:flex hx:min-w-0 hx:flex-1 hx:flex-col hx:gap-0.5">
          <BaseToast.Title className="hx:text-sm hx:font-semibold hx:text-fg" />
          <BaseToast.Description className="hx:text-sm hx:text-fg-muted" />
          <BaseToast.Action
            className={buttonVariants({ variant: 'secondary', size: 'sm', className: 'hx:mt-2 hx:w-fit' })}
          />
        </div>
        <BaseToast.Close
          aria-label={closeLabel}
          className="hx:-m-1 hx:flex hx:size-6 hx:shrink-0 hx:items-center hx:justify-center hx:rounded-xs hx:text-fg-muted hx:cursor-pointer hx:hover:bg-surface-hover hx:hover:text-fg hx:focus-ring"
        >
          <XIcon />
        </BaseToast.Close>
      </BaseToast.Content>
    </BaseToast.Root>
  ));
}

const statusIconClassName = 'hx:mt-0.5';

const toastIcons: Record<ToastType, ReactNode> = {
  success: <SuccessIcon className={`${statusIconClassName} hx:text-success-text`} />,
  error: <ErrorIcon className={`${statusIconClassName} hx:text-danger-text`} />,
  warning: <WarningIcon className={`${statusIconClassName} hx:text-warning-text`} />,
  info: <InfoIcon className={`${statusIconClassName} hx:text-info-text`} />,
  loading: <SpinnerIcon className={statusIconClassName} />,
};
