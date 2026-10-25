import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Button } from '../button/Button';
import { Field, FieldDescription, FieldLabel } from '../field/Field';
import { FileDropzone, FileList, FileListItem, type FileRejection } from './FileUpload';

const meta = {
  title: 'Components/FileUpload',
  component: FileDropzone,
  tags: ['autodocs'],
} satisfies Meta<typeof FileDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

type Upload = { id: number; file: File; progress: number; status: 'uploading' | 'complete' | 'error'; error?: string };

const reasons: Record<FileRejection['reason'], string> = {
  type: 'This type of file is not accepted.',
  size: 'The file is larger than 5 MB.',
  count: 'At most 5 files at once.',
};

export const Default: Story = {
  render: () => {
    const [uploads, setUploads] = useState<Upload[]>([]);

    useEffect(() => {
      if (!uploads.some((upload) => upload.status === 'uploading')) return;
      const timer = setTimeout(
        () =>
          setUploads((current) =>
            current.map((upload) =>
              upload.status !== 'uploading'
                ? upload
                : upload.progress >= 100
                  ? { ...upload, status: 'complete' }
                  : { ...upload, progress: Math.min(100, upload.progress + 20) },
            ),
          ),
        300,
      );
      return () => clearTimeout(timer);
    }, [uploads]);

    return (
      <div className="hx:flex hx:max-w-lg hx:flex-col hx:gap-3">
        <FileDropzone
          multiple
          accept="image/*,.pdf"
          maxSize={5 * 1024 * 1024}
          maxFiles={5}
          description="PDF or images, up to 5 MB"
          onFilesSelected={(files, rejected) =>
            setUploads((current) => [
              ...current,
              ...files.map((file) => ({ id: Math.random(), file, progress: 0, status: 'uploading' as const })),
              ...rejected.map(({ file, reason }) => ({
                id: Math.random(),
                file,
                progress: 0,
                status: 'error' as const,
                error: reasons[reason],
              })),
            ])
          }
        />
        {uploads.length > 0 && (
          <FileList>
            {uploads.map((upload) => (
              <FileListItem
                key={upload.id}
                name={upload.file.name}
                size={upload.file.size}
                status={upload.status}
                progress={upload.progress}
                error={upload.error}
                preview={upload.file.type.startsWith('image/') ? URL.createObjectURL(upload.file) : undefined}
                onRemove={() => setUploads((current) => current.filter((item) => item.id !== upload.id))}
              />
            ))}
          </FileList>
        )}
      </div>
    );
  },
};

export const Compact: Story = {
  render: () => (
    <div className="hx:max-w-md">
      <Field>
        <FieldLabel htmlFor="order-file">Order confirmation</FieldLabel>
        <FileDropzone id="order-file" compact accept=".pdf" description="A PDF, up to 10 MB" />
        <FieldDescription>Signed by the client.</FieldDescription>
      </Field>
    </div>
  ),
};

export const Files: Story = {
  render: () => (
    <FileList className="hx:max-w-lg">
      <FileListItem name="Offer 2026-014.pdf" size={248_000} status="uploading" progress={60} onRemove={() => {}} />
      <FileListItem name="Order confirmation.pdf" size={1_230_000} href="#" onRemove={() => {}} />
      <FileListItem
        name="Plan B-204.dwg"
        size={18_400_000}
        status="error"
        error="The file is larger than 5 MB."
        actions={
          <Button variant="ghost" size="sm">
            Retry
          </Button>
        }
        onRemove={() => {}}
      />
    </FileList>
  ),
};
