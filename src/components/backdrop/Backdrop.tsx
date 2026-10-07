import type { ComponentProps, CSSProperties } from 'react';
import { cn } from '../../lib/cn';

/** A value used in both themes, or one per theme (a missing `dark` falls back to `light`). */
export type BackdropThemed<T> = T | { light: T; dark?: T };

export type BackdropProps = ComponentProps<'div'> & {
  variant?: 'mesh' | 'aurora' | 'plain';
  intensity?: 'subtle' | 'medium';
  texture?: 'none' | 'grain' | 'grid';
  /** `absolute` fills the nearest positioned parent: give that parent `isolation: isolate`. */
  position?: 'fixed' | 'absolute';
  /** Replaces the colored glows. */
  image?: BackdropThemed<string>;
  /** In pixels. */
  imageBlur?: number;
  /** Opacity of a black veil over the image, from `0` to `1`. */
  overlay?: BackdropThemed<number>;
};

function themed<T>(value: BackdropThemed<T>): { light: T; dark: T } {
  if (typeof value === 'object' && value !== null && 'light' in value) {
    return { light: value.light, dark: value.dark ?? value.light };
  }
  return { light: value, dark: value };
}

function cssUrl(src: string) {
  return `url(${JSON.stringify(src)})`;
}

export function Backdrop({
  variant = 'mesh',
  intensity = 'subtle',
  texture = 'none',
  position = 'fixed',
  image,
  imageBlur = 0,
  overlay = 0,
  className,
  style,
  children,
  ...props
}: BackdropProps) {
  const images = image === undefined ? undefined : themed(image);
  const overlays = themed(overlay);
  const hasOverlay = overlays.light > 0 || overlays.dark > 0;
  const vars = {
    ...(images && {
      '--hx-backdrop-image': cssUrl(images.light),
      '--hx-backdrop-image-dark': cssUrl(images.dark),
      '--hx-backdrop-image-blur': `${imageBlur}px`,
    }),
    ...(hasOverlay && {
      '--hx-backdrop-overlay': overlays.light,
      '--hx-backdrop-overlay-dark': overlays.dark,
    }),
    ...style,
  } as CSSProperties;

  return (
    <>
      <div
        aria-hidden="true"
        data-variant={variant}
        data-intensity={intensity}
        data-position={position}
        className={cn('hx-backdrop', className)}
        style={vars}
        {...props}
      >
        {images ? <div className="hx-backdrop-image" /> : <div className="hx-backdrop-glow" />}
        {hasOverlay && <div className="hx-backdrop-overlay" />}
        {texture !== 'none' && <div className="hx-backdrop-texture" data-texture={texture} />}
      </div>
      {children}
    </>
  );
}
