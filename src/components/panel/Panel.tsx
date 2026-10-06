import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import { mergeClassName } from '../../lib/cn';

export const panelVariants = cva(
  // overflow-clip keeps content inside the rounded corners (tables, lists, images);
  // the 1px clip margin leaves room for the lit edge drawn over the border.
  'hx:rounded-2xl hx:text-fg hx:overflow-clip hx:[overflow-clip-margin:1px]',
  {
    variants: {
      variant: {
        thin: 'hx:glass-thin',
        default: 'hx:glass',
        strong: 'hx:glass-strong',
      },
      padding: {
        none: '',
        sm: 'hx:p-3',
        md: 'hx:p-5',
        lg: 'hx:p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'none',
    },
  },
);

export type PanelProps = useRender.ComponentProps<'div'> & VariantProps<typeof panelVariants>;

/**
 * Plain glass surface with no inner layout — the building block for custom
 * containers (tables, lists, sidebars). Use `render` to change the element,
 * e.g. `<Panel render={<section />} />`.
 */
export function Panel({ variant, padding, className, render, ...props }: PanelProps) {
  return useRender({
    defaultTagName: 'div',
    render,
    props: { ...props, className: mergeClassName(panelVariants({ variant, padding }), className) },
  });
}
