interface Props {
  offsetKey?: string;
  children?: any;
  decoratedText?: string;
}

export const Bold = ({ children, offsetKey }: Props) => (
  <strong data-offset-key={offsetKey}>{children}</strong>
);

export const Italic = ({ children, offsetKey }: Props) => (
  <em data-offset-key={offsetKey}>{children}</em>
);

export const Underline = ({ children, offsetKey }: Props) => (
  <u data-offset-key={offsetKey}>{children}</u>
);

export const Link = ({ children, offsetKey, decoratedText }: Props) => (
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
