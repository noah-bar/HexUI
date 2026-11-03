import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Panel } from '../panel/Panel';

export type StatProps = Omit<ComponentProps<'div'>, 'children'> & {
  label: ReactNode;
  value: ReactNode;
  /** A line under the value, such as a comparison with the previous period. */
  description?: ReactNode;
  icon?: ReactNode;
};

export function Stat({ label, value, description, icon, className, ...props }: StatProps) {
  return (
    <Panel className={cn('hx:flex hx:flex-col hx:gap-1 hx:p-4', className)} {...props}>
      <div className="hx:flex hx:items-center hx:justify-between hx:gap-2 hx:text-sm hx:text-fg-muted hx:[&_svg]:size-4 hx:[&_svg]:shrink-0">
        <span className="hx:min-w-0 hx:truncate">{label}</span>
        {icon}
      </div>
      <div className="hx:text-2xl hx:leading-tight hx:font-semibold hx:tracking-tight hx:tabular-nums">{value}</div>
      {description && <div className="hx:text-xs hx:text-fg-muted">{description}</div>}
    </Panel>
  );
}
