import * as React from 'react';

interface Props {
  offsetKey?: string;
  children?: any;
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

export { Bold, Italic, Underline };
