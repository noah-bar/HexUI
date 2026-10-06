import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export type BackdropProps = Omit<ComponentProps<'div'>, 'children'> & {
  /** `mesh`: soft glows (default) · `aurora`: more color, for login or landing screens · `plain`: near-solid, for dense screens. */
  variant?: 'mesh' | 'aurora' | 'plain';
  /** How strong the colored glows are. */
  intensity?: 'subtle' | 'medium';
  /** Optional texture layered over the glows. */
  texture?: 'none' | 'grain' | 'grid';
  /**
   * `fixed` covers the viewport behind the whole app.
   * `absolute` fills the nearest positioned parent — give that parent `isolation: isolate`.
   */
  position?: 'fixed' | 'absolute';
};

/**
 * Decorative page background that gives glass surfaces something to blur.
 * Colors follow the theme tokens (`--hx-backdrop-*`, `--hx-brand`).
 */
export function Backdrop({
  variant = 'mesh',
  intensity = 'subtle',
  texture = 'none',
  position = 'fixed',
  className,
  ...props
}: BackdropProps) {
  return (
    <div
      aria-hidden="true"
      data-variant={variant}
      data-intensity={intensity}
      data-position={position}
      className={cn('hx-backdrop', className)}
      {...props}
    >
      <div className="hx-backdrop-glow" />
      {texture !== 'none' && <div className="hx-backdrop-texture" data-texture={texture} />}
    </div>
  );
}
