import * as React from 'react';

interface Props {
  offsetKey?: string;
  children?: any;
  decoratedText?: string;
}

const Bold = ({ children, offsetKey }: Props) => (
  <strong data-offset-key={offsetKey}>{children}</strong>
);

const Italic = ({ children, offsetKey }: Props) => (
  <em data-offset-key={offsetKey}>{children}</em>
);

const Underline = ({ children, offsetKey }: Props) => (
  <u data-offset-key={offsetKey}>{children}</u>
);

const Link = ({ children, offsetKey, decoratedText }: Props) => (
  <a
    data-offset-key={offsetKey}
    href={decoratedText}
    rel="noreferrer"
    style={{ cursor: 'pointer' }}
    target="_blank"
  >
    {children}
  </a>
);

export { Bold, Italic, Link, Underline };
