import type { Meta, StoryObj } from '@storybook/react-vite';
import { Save, Undo2 } from 'lucide-react';
import { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../breadcrumb/Breadcrumb';
import { Button } from '../button/Button';
import { Checkbox } from '../checkbox/Checkbox';
import { Field, FieldError, FieldItem, FieldLabel, FieldRow } from '../field/Field';
import { Input } from '../input/Input';
import { InputNumber } from '../input-number/InputNumber';
import { PageHeader, PageHeaderActions, PageHeaderActionSeparator, PageHeaderTitle } from '../page-header/PageHeader';
import { Textarea } from '../textarea/Textarea';
import { FormSection } from './FormSection';

const meta = {
  title: 'Components/FormSection',
  component: FormSection,
  tags: ['autodocs'],
} satisfies Meta<typeof FormSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function ClientFields() {
  return (
    <>
      <FormSection title="Company" description="As it appears on invoices.">
        <Field name="name">
          <FieldLabel>Company name</FieldLabel>
          <Input required defaultValue="Romandie Santé" />
          <FieldError />
        </Field>
        <FieldRow columns="1fr 1fr">
          <Field name="email">
            <FieldLabel>Billing email</FieldLabel>
            <Input type="email" required defaultValue="factures@romandie-sante.ch" />
            <FieldError />
          </Field>
          <Field name="vat">
            <FieldLabel>VAT number</FieldLabel>
            <Input defaultValue="CHE-123.456.789" />
            <FieldError />
          </Field>
        </FieldRow>
      </FormSection>
      <FormSection title="Address">
        <Field name="street">
          <FieldLabel>Street</FieldLabel>
          <Input defaultValue="Avenue de la Gare 12" />
        </Field>
        <FieldRow columns="1fr 3fr">
          <Field name="zip">
            <FieldLabel>ZIP</FieldLabel>
            <Input defaultValue="1003" />
          </Field>
          <Field name="city">
            <FieldLabel>City</FieldLabel>
            <Input defaultValue="Lausanne" />
          </Field>
        </FieldRow>
      </FormSection>
      <FormSection title="Payment" description="Applied to new invoices only.">
        <Field name="terms">
          <FieldLabel>Payment terms (days)</FieldLabel>
          <InputNumber defaultValue={30} min={0} max={120} className="hx:max-w-40" />
        </Field>
        <Field name="reminders">
          <FieldItem>
            <Checkbox defaultChecked />
            <FieldLabel>Send payment reminders</FieldLabel>
          </FieldItem>
        </Field>
        <Field name="notes">
          <FieldLabel>Internal notes</FieldLabel>
          <Textarea rows={3} />
        </Field>
      </FormSection>
    </>
  );
}

/**
 * An edit page: a plain `<form>` wraps the whole page, so the Save button of the sticky header submits it. With a form
 * library such as react-hook-form, its `handleSubmit` goes in `onSubmit` and its errors in each `Field`'s `invalid`.
 */
export const EditPage: Story = {
  args: { children: null },
  render: function Render() {
    const [saving, setSaving] = useState(false);
    const [savedAt, setSavedAt] = useState<string>();

    return (
      <form
        className="hx:flex hx:max-w-3xl hx:flex-col hx:gap-6"
        onSubmit={async (event) => {
          event.preventDefault();
          setSaving(true);
          await wait(1000);
          setSaving(false);
          setSavedAt(new Date().toLocaleTimeString());
        }}
      >
        <PageHeader sticky>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Clients</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Romandie Santé</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <PageHeaderTitle>Edit client</PageHeaderTitle>
          <PageHeaderActions>
            <Button type="submit" variant="ghost" startIcon={<Save />} loading={saving} iconOnly="mobile">
              Save
            </Button>
            <PageHeaderActionSeparator />
            <Button type="reset" variant="ghost" startIcon={<Undo2 />} iconOnly="mobile">
              Discard changes
            </Button>
            {savedAt && (
              <span role="status" className="hx:ms-auto hx:px-2 hx:text-xs hx:text-fg-muted">
                Saved at {savedAt}
              </span>
            )}
          </PageHeaderActions>
        </PageHeader>
        <ClientFields />
      </form>
    );
  },
};
