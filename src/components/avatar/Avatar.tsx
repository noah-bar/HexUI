import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn, mergeClassName } from '../../lib/cn';

export const avatarVariants = cva(
  [
    'hx:relative hx:inline-flex hx:shrink-0 hx:items-center hx:justify-center hx:overflow-hidden hx:align-middle hx:select-none',
    'hx:bg-brand/15 hx:font-semibold hx:text-accent',
    // Thin ring in the surface color: separates stacked avatars and lifts photos off the glass.
    'hx:ring-2 hx:ring-(--hx-avatar-ring)',
  ],
  {
    variants: {
      size: {
        xs: 'hx:size-6 hx:text-[0.625rem]',
        sm: 'hx:size-8 hx:text-xs',
        md: 'hx:size-10 hx:text-sm',
        lg: 'hx:size-14 hx:text-lg',
      },
      shape: {
        circle: 'hx:rounded-full',
        square: 'hx:rounded-md',
      },
    },
    defaultVariants: { size: 'md', shape: 'circle' },
  },
);

export type AvatarProps = ComponentProps<typeof BaseAvatar.Root> & VariantProps<typeof avatarVariants>;

/** Picture of a person or an organization. Put an AvatarImage and an AvatarFallback (initials) inside. */
export function Avatar({ size, shape, className, ...props }: AvatarProps) {
  return <BaseAvatar.Root className={mergeClassName(avatarVariants({ size, shape }), className)} {...props} />;
}

/** The picture; hidden until it has loaded, so the fallback shows meanwhile or if it fails. */
export function AvatarImage({ className, alt = '', ...props }: ComponentProps<typeof BaseAvatar.Image>) {
  return (
    <BaseAvatar.Image alt={alt} className={mergeClassName('hx:size-full hx:object-cover', className)} {...props} />
  );
}

/** Initials or an icon, shown when there is no picture. `delay` avoids a flash while a fast image loads. */
export function AvatarFallback({ className, ...props }: ComponentProps<typeof BaseAvatar.Fallback>) {
  return (
    <BaseAvatar.Fallback
      className={mergeClassName(
        'hx:flex hx:size-full hx:items-center hx:justify-center hx:leading-none hx:[&_svg]:size-1/2',
        className,
      )}
      {...props}
    />
  );
}

/** Overlapping row of avatars (team of a project, people on a quote). */
export function AvatarGroup({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('hx:flex hx:items-center hx:-space-x-2', className)} {...props} />;
}
