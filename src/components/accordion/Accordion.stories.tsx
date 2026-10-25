import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const faq = [
  {
    question: 'How are payment reminders sent?',
    answer:
      'An email goes to the billing contact 7 days after the due date, then every 14 days until the invoice is paid.',
  },
  {
    question: 'Can I change the VAT rate of a sent invoice?',
    answer: 'No. Cancel it with a credit note, then issue a new invoice with the right rate.',
  },
  {
    question: 'Which banks can be synchronized?',
    answer: 'UBS, PostFinance, Raiffeisen and the cantonal banks that support the ISO 20022 camt.053 format.',
  },
];

/** One section open at a time. */
export const Default: Story = {
  render: () => (
    <Accordion className="hx:max-w-2xl" defaultValue={[0]}>
      {faq.map((item, index) => (
        <AccordionItem key={item.question} value={index}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/** `multiple`: several sections can stay open. */
export const Multiple: Story = {
  render: () => (
    <Accordion className="hx:max-w-2xl" multiple defaultValue={[0, 2]}>
      {faq.map((item, index) => (
        <AccordionItem key={item.question} value={index}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
