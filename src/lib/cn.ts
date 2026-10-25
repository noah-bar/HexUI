import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({ prefix: 'hx' });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ClassNameProp<State> = string | ((state: State) => string | undefined) | undefined;

/** Merges with a Base UI `className`, which may be a function of the component state. */
export function mergeClassName<State>(
  base: string,
  className: ClassNameProp<State>,
): string | ((state: State) => string) {
  if (typeof className === 'function') {
    return (state) => cn(base, className(state));
  }
  return cn(base, className);
}
