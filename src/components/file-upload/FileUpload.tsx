import { useRef, useState, type ChangeEvent, type ComponentProps, type DragEvent, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FileIcon, UploadIcon, XIcon } from '../../lib/icons';
import { Progress } from '../progress/Progress';

export type FileRejection = {
  file: File;
  reason: 'type' | 'size' | 'count';
};

export function matchesAccept(file: File, accept: string | undefined) {
  if (!accept) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept
    .split(',')
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) =>
      rule.startsWith('.')
        ? name.endsWith(rule)
        : rule.endsWith('/*')
          ? type.startsWith(rule.slice(0, -1))
          : type === rule,
    );
}

export function formatFileSize(bytes: number, locale?: string) {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte'] as const;
  let size = bytes;
  let unit = 0;
  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }
  return new Intl.NumberFormat(locale, {
    style: 'unit',
    unit: units[unit],
    unitDisplay: unit === 0 ? 'long' : 'short',
    maximumFractionDigits: unit < 2 ? 0 : 1,
  }).format(size);
}

export type FileDropzoneProps = Omit<ComponentProps<'label'>, 'title' | 'onDrop'> & {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  onFilesSelected?: (files: File[], rejected: FileRejection[]) => void;
  title?: ReactNode;
  browseLabel?: ReactNode;
  description?: ReactNode;
  compact?: boolean;
  id?: string;
  name?: string;
};

export function FileDropzone({
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  onFilesSelected,
  title = 'Drop files here or',
  browseLabel = 'browse',
  description,
  compact = false,
  id,
  name,
  className,
  ...props
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  // dragenter and dragleave also fire on the children: a depth counter tells when the pointer really leaves.
  const depth = useRef(0);

  function select(list: FileList | null) {
    const files = Array.from(list ?? []);
    if (!files.length) return;
    const accepted: File[] = [];
    const rejected: FileRejection[] = [];
    for (const file of multiple ? files : files.slice(0, 1)) {
      if (!matchesAccept(file, accept)) rejected.push({ file, reason: 'type' });
      else if (maxSize !== undefined && file.size > maxSize) rejected.push({ file, reason: 'size' });
      else if (maxFiles !== undefined && accepted.length >= maxFiles) rejected.push({ file, reason: 'count' });
      else accepted.push(file);
    }
    onFilesSelected?.(accepted, rejected);
  }

  function handleDrag(event: DragEvent<HTMLLabelElement>, change: 1 | -1 | 0) {
    if (disabled || !event.dataTransfer.types.includes('Files')) return;
    event.preventDefault();
    depth.current = Math.max(0, depth.current + change);
    setDragging(depth.current > 0);
  }

  return (
    <label
      data-dragging={dragging || undefined}
      data-disabled={disabled || undefined}
      onDragEnter={(event) => handleDrag(event, 1)}
      onDragLeave={(event) => handleDrag(event, -1)}
      onDragOver={(event) => handleDrag(event, 0)}
      onDrop={(event) => {
        if (disabled) return;
        event.preventDefault();
        depth.current = 0;
        setDragging(false);
        select(event.dataTransfer.files);
      }}
      className={cn(
        'hx:flex hx:w-full hx:cursor-pointer hx:rounded-xs hx:border hx:border-dashed hx:border-border-medium hx:text-sm hx:text-fg',
        'hx:transition-colors hx:duration-100 hx:hover:border-border-strong hx:hover:bg-surface-hover',
        'hx:outline-2 hx:outline-offset-2 hx:outline-transparent hx:has-focus-visible:outline-ring',
        'hx:data-dragging:border-solid hx:data-dragging:border-accent hx:data-dragging:bg-primary-subtle',
        'hx:data-disabled:cursor-not-allowed hx:data-disabled:border-border hx:data-disabled:bg-transparent hx:data-disabled:text-fg-disabled',
        compact
          ? 'hx:items-center hx:gap-3 hx:px-3 hx:py-2'
          : 'hx:flex-col hx:items-center hx:gap-2 hx:px-4 hx:py-6 hx:text-center',
        className,
      )}
      {...props}
    >
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hx:sr-only"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          select(event.target.files);
          // Lets the same file be picked again after it was removed.
          event.target.value = '';
        }}
      />
      <span
        className={cn(
          'hx:flex hx:shrink-0 hx:items-center hx:justify-center hx:rounded-full hx:bg-surface-pressed hx:text-fg-muted',
          'hx:in-data-dragging:bg-accent hx:in-data-dragging:text-white hx:in-data-disabled:text-fg-disabled',
          compact ? 'hx:size-8 hx:[&_svg]:size-4' : 'hx:size-10 hx:[&_svg]:size-5',
        )}
      >
        <UploadIcon />
      </span>
      <span className="hx:flex hx:min-w-0 hx:flex-col hx:gap-0.5">
        <span>
          {title}{' '}
          <span className="hx:font-semibold hx:text-accent hx:in-data-disabled:text-fg-disabled">{browseLabel}</span>
        </span>
        {description && <span className="hx:text-xs hx:text-fg-muted">{description}</span>}
      </span>
    </label>
  );
}

export function FileList({ className, ...props }: ComponentProps<'ul'>) {
  return <ul className={cn('hx:m-0 hx:flex hx:list-none hx:flex-col hx:gap-1.5 hx:p-0', className)} {...props} />;
}

export type FileListItemProps = Omit<ComponentProps<'li'>, 'title'> & {
  name: ReactNode;
  size?: number;
  status?: 'uploading' | 'complete' | 'error';
  progress?: number | null;
  error?: ReactNode;
  preview?: string;
  href?: string;
  onRemove?: () => void;
  removeLabel?: string;
  actions?: ReactNode;
  locale?: string;
};

export function FileListItem({
  name,
  size,
  status = 'complete',
  progress = null,
  error,
  preview,
  href,
  onRemove,
  removeLabel = 'Remove',
  actions,
  locale,
  className,
  ...props
}: FileListItemProps) {
  const failed = status === 'error';
  return (
    <li
      data-status={status}
      className={cn(
        'hx:flex hx:items-center hx:gap-3 hx:rounded-xs hx:border hx:border-border hx:bg-surface hx:px-3 hx:py-2 hx:text-sm',
        failed && 'hx:border-danger-text/40',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'hx:flex hx:size-8 hx:shrink-0 hx:items-center hx:justify-center hx:overflow-clip hx:rounded-xs hx:bg-surface-hover',
          failed ? 'hx:text-danger-text' : 'hx:text-fg-muted',
        )}
      >
        {preview ? <img src={preview} alt="" className="hx:size-full hx:object-cover" /> : <FileIcon />}
      </span>
      <span className="hx:flex hx:min-w-0 hx:flex-1 hx:flex-col hx:gap-1">
        <span className="hx:flex hx:min-w-0 hx:items-baseline hx:gap-2">
          {href ? (
            <a href={href} className="hx:truncate hx:text-fg hx:underline-offset-2 hx:hover:underline hx:focus-ring">
              {name}
            </a>
          ) : (
            <span className="hx:truncate">{name}</span>
          )}
          {size !== undefined && (
            <span className="hx:shrink-0 hx:text-xs hx:text-fg-muted hx:tabular-nums">
              {formatFileSize(size, locale)}
            </span>
          )}
        </span>
        {status === 'uploading' && (
          <Progress value={progress} aria-label={typeof name === 'string' ? name : undefined} />
        )}
        {failed && error && <span className="hx:text-xs hx:text-danger-text">{error}</span>}
      </span>
      {actions}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className="hx:inline-flex hx:size-7 hx:shrink-0 hx:items-center hx:justify-center hx:rounded-xs hx:text-fg-muted hx:cursor-pointer hx:hover:bg-surface-hover hx:hover:text-fg hx:focus-ring"
        >
          <XIcon className="hx:size-3.5" />
        </button>
      )}
    </li>
  );
}
