import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge<'glass'>({
  prefix: 'hx',
  extend: {
    classGroups: {
      glass: ['glass', 'glass-strong', 'glass-field'],
    },
  },
});

/** Merge class names, letting later Tailwind classes override earlier ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClassNameProp<State> = string | ((state: State) => string | undefined) | undefined;

/**
 * Merge a base class string with a Base UI `className` prop, which may be a
 * function of the component state.
 */
export function mergeClassName<State>(
  base: string,
  className: ClassNameProp<State>,
): string | ((state: State) => string) {
  if (typeof className === 'function') {
    return (state) => cn(base, className(state));
  }
  return cn(base, className);
}
