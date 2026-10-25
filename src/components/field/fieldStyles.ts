/** Frame shared by text controls: input, textarea, input number, select and combobox (see the `field` utility). */
export const fieldControlClassName = 'hx:field hx:text-sm';

/** Box shared by checkboxes and radios: a 16px frame with a gray edge that turns blue once checked. */
export const checkControlClassName = [
  'hx:group hx:inline-flex hx:size-4 hx:shrink-0 hx:items-center hx:justify-center hx:align-middle hx:cursor-pointer',
  'hx:border hx:border-border-strong hx:bg-surface hx:hover:border-fg-muted',
  'hx:transition-[background-color,border-color] hx:duration-100 hx:focus-ring',
  'hx:error:border-danger-text',
  'hx:data-disabled:cursor-not-allowed hx:data-disabled:border-fg-disabled hx:data-disabled:bg-surface-disabled',
].join(' ');
