import { useRender } from '@base-ui/react/use-render';
import { mergeClassName } from '../../lib/cn';

// overflow-clip keeps content inside the corners (tables, lists, images).
const panelClassName = 'hx:rounded-xs hx:bg-surface hx:p-2 hx:text-fg hx:shadow-card hx:overflow-clip';

export type PanelProps = useRender.ComponentProps<'div'>;

export function Panel({ className, render, ...props }: PanelProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: { ...props, className: mergeClassName(panelClassName, className) },
  });
}
