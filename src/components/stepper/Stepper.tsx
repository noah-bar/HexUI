import { Children, createContext, isValidElement, useContext, type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { CheckIcon, XIcon } from '../../lib/icons';

export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';
type StepValue = string | number;

type StepperContextValue = {
  orientation: 'horizontal' | 'vertical';
  onValueChange?: (value: StepValue) => void;
};

const StepperContext = createContext<StepperContextValue>({ orientation: 'horizontal' });
const StepContext = createContext<{ index: number; status: StepStatus; last: boolean }>({
  index: 0,
  status: 'upcoming',
  last: true,
});

export type StepperProps = Omit<ComponentProps<'ol'>, 'onChange'> & {
  value: StepValue;
  onValueChange?: (value: StepValue) => void;
  orientation?: 'horizontal' | 'vertical';
  complete?: boolean;
};

export function Stepper({
  value,
  onValueChange,
  orientation = 'horizontal',
  complete = false,
  className,
  children,
  ...props
}: StepperProps) {
  const items = Children.toArray(children).filter(isValidElement<StepperItemProps>);
  const currentIndex = items.findIndex((item) => item.props.value === value);

  return (
    <StepperContext value={{ orientation, onValueChange }}>
      <div className={cn(orientation === 'horizontal' && 'hx:@container', 'hx:w-full')}>
        <ol
          aria-orientation={orientation}
          className={cn(
            'hx:m-0 hx:flex hx:list-none hx:p-0 hx:text-sm',
            orientation === 'horizontal' ? 'hx:items-start hx:gap-2' : 'hx:flex-col',
            className,
          )}
          {...props}
        >
          {items.map((item, index) => {
            const status: StepStatus =
              item.props.status ??
              (complete || index < currentIndex ? 'complete' : index === currentIndex ? 'current' : 'upcoming');
            return (
              <StepContext key={item.key ?? index} value={{ index, status, last: index === items.length - 1 }}>
                {item}
              </StepContext>
            );
          })}
        </ol>
      </div>
    </StepperContext>
  );
}

export type StepperItemProps = Omit<ComponentProps<'li'>, 'title'> & {
  value: StepValue;
  title: ReactNode;
  description?: ReactNode;
  status?: StepStatus;
  disabled?: boolean;
  icon?: ReactNode;
};

const indicatorClassNames: Record<StepStatus, string> = {
  complete: 'hx:bg-accent hx:text-white hx:border-accent',
  current: 'hx:border-2 hx:border-accent hx:bg-surface hx:text-accent',
  upcoming: 'hx:border-border-strong hx:bg-surface hx:text-fg-muted',
  error: 'hx:bg-danger hx:text-danger-fg hx:border-danger',
};

export function StepperItem({
  value,
  title,
  description,
  status: statusProp,
  disabled = false,
  icon,
  className,
  ...props
}: StepperItemProps) {
  const { orientation, onValueChange } = useContext(StepperContext);
  const step = useContext(StepContext);
  const { index, last } = step;
  const status = statusProp ?? step.status;
  const horizontal = orientation === 'horizontal';
  const interactive = !!onValueChange && !disabled && status !== 'current';

  const indicator = (
    <span
      className={cn(
        'hx:relative hx:z-[1] hx:flex hx:size-6 hx:shrink-0 hx:items-center hx:justify-center hx:rounded-full hx:border',
        'hx:text-xs hx:font-semibold hx:tabular-nums hx:transition-colors hx:duration-200',
        'hx:[&_svg]:size-3.5 hx:[&_svg]:[stroke-width:24]',
        indicatorClassNames[status],
      )}
    >
      {status === 'complete' ? <CheckIcon /> : status === 'error' ? <XIcon /> : (icon ?? index + 1)}
    </span>
  );

  const text = (
    <span
      className={cn(
        'hx:flex hx:min-w-0 hx:flex-col hx:gap-0.5',
        'hx:pt-0.5',
        !horizontal && !last && 'hx:pb-5',
        horizontal && status !== 'current' && 'hx:@max-xl:sr-only',
      )}
    >
      <span
        className={cn(
          'hx:leading-5',
          horizontal && 'hx:truncate',
          status === 'current'
            ? 'hx:font-semibold hx:text-fg'
            : status === 'error'
              ? 'hx:text-danger-text'
              : 'hx:text-fg',
          status === 'upcoming' && 'hx:text-fg-muted',
        )}
      >
        {title}
      </span>
      {description && (
        <span className={cn('hx:text-xs hx:text-fg-muted', horizontal && 'hx:truncate hx:@max-3xl:hidden')}>
          {description}
        </span>
      )}
    </span>
  );

  const connector = !last && (
    <span
      aria-hidden="true"
      className={cn(
        'hx:shrink-0 hx:rounded-full hx:transition-colors hx:duration-200',
        status === 'complete' ? 'hx:bg-accent' : 'hx:bg-border-medium',
        horizontal ? 'hx:mt-3 hx:h-px hx:min-w-4 hx:flex-1' : 'hx:absolute hx:top-7 hx:bottom-1 hx:left-3 hx:w-px',
      )}
    />
  );

  const content = (
    <>
      {indicator}
      {text}
    </>
  );
  const contentClassName = cn(
    'hx:flex hx:min-w-0 hx:items-start hx:gap-2 hx:rounded-xs hx:text-left',
    interactive && 'hx:-m-1 hx:p-1 hx:cursor-pointer hx:hover:bg-surface-hover hx:focus-ring',
  );

  return (
    <li
      aria-current={status === 'current' ? 'step' : undefined}
      className={cn(
        'hx:relative hx:flex hx:min-w-0',
        horizontal ? cn('hx:items-start hx:gap-2', !last && 'hx:flex-1') : 'hx:flex-col',
        className,
      )}
      {...props}
    >
      {interactive ? (
        <button type="button" onClick={() => onValueChange?.(value)} className={contentClassName}>
          {content}
        </button>
      ) : (
        <span className={contentClassName}>{content}</span>
      )}
      {connector}
    </li>
  );
}
