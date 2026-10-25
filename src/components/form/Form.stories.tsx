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
import { Field, FieldDescription, FieldError, FieldItem, FieldLabel, FieldRow } from '../field/Field';
import { Input } from '../input/Input';
import { InputNumber } from '../input-number/InputNumber';
import {
  PageHeader,
  PageHeaderActionLabel,
  PageHeaderActions,
  PageHeaderActionSeparator,
  PageHeaderTitle,
} from '../page-header/PageHeader';
import { Textarea } from '../textarea/Textarea';
import { Form, FormSection } from './Form';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

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
            <FieldDescription>Type “taken@example.com” to see an error returned by the server.</FieldDescription>
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
 * An edit page: the form wraps the whole page, so the Save button of the sticky command bar submits it.
 * Errors from the server go to `errors`, keyed by the `name` of each `Field`.
 */
export const EditPage: Story = {
  render: function Render() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);
    const [savedAt, setSavedAt] = useState<string>();

    return (
      <Form
        className="hx:max-w-3xl"
        errors={errors}
        onFormSubmit={async (values) => {
          setSaving(true);
          await wait(1000);
          setSaving(false);
          if (values.email === 'taken@example.com') {
            setErrors({ email: 'Another client already uses this email.' });
            return;
          }
          setErrors({});
          setSavedAt(new Date().toLocaleTimeString());
        }}
      >
        <PageHeader>
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
          <PageHeaderActions sticky>
            <Button type="submit" variant="ghost" startIcon={<Save />} loading={saving}>
              <PageHeaderActionLabel>Save</PageHeaderActionLabel>
            </Button>
            <PageHeaderActionSeparator />
            <Button type="reset" variant="ghost" startIcon={<Undo2 />} onClick={() => setErrors({})}>
              <PageHeaderActionLabel>Discard changes</PageHeaderActionLabel>
            </Button>
            {savedAt && (
              <span role="status" className="hx:ms-auto hx:px-2 hx:text-xs hx:text-fg-muted">
                Saved at {savedAt}
              </span>
            )}
          </PageHeaderActions>
        </PageHeader>
        <ClientFields />
      </Form>
    );
  },
};

/** The submit button outside the form, linked by `form="<id>"`: for a form that covers only part of the page. */
export const SubmitOutside: Story = {
  render: function Render() {
    const [values, setValues] = useState<string>();
    return (
      <div className="hx:flex hx:max-w-3xl hx:flex-col hx:gap-6">
        <PageHeader>
          <PageHeaderTitle>New client</PageHeaderTitle>
          <PageHeaderActions>
            <Button type="submit" form="new-client" variant="ghost" startIcon={<Save />}>
              <PageHeaderActionLabel>Create</PageHeaderActionLabel>
            </Button>
          </PageHeaderActions>
        </PageHeader>
        <Form id="new-client" onFormSubmit={(formValues) => setValues(JSON.stringify(formValues))}>
          <FormSection title="Company">
            <Field name="name">
              <FieldLabel>Company name</FieldLabel>
              <Input required />
              <FieldError />
            </Field>
          </FormSection>
        </Form>
        {values && <pre className="hx:m-0 hx:text-xs hx:text-fg-muted">{values}</pre>}
      </div>
    );
  },
};
