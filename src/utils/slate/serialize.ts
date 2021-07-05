import escapeHtml from 'escape-html';
import { Text } from 'slate';

// styles
import { primary } from 'styles/colors';

export const serialize = (node) => {
  const children = node?.children?.map((n) => serialize(n)).join('');

  if (Text.isText(node)) {
    const string = escapeHtml(node.text);
    return string;
  }

  switch (node.type) {
    case 'block-quote':
      return `<blockquote style="font-style:bold;border:4px solid ${primary[800]}">
            <span style="margin-left:4px;">
              ${children}
            </span>
          </blockquote>`;
    case 'heading':
      return `<h1>${children}</h1>`;
    case 'image':
      return `<div>
          <div>
            <img
              src=${escapeHtml(node.url)}
              style="display:block;max-width:100%;"
            />
          </div>
          ${children}
        </div>`;
    case 'link':
      return `<a 
          style="margin:0;color:${primary[800]};" 
          target="_blank" href="${escapeHtml(node.url)}"
        >
          ${children}
          </a>`;
    case 'paragraph':
      return `<p style="margin:0;">${children}</p>`;
    default:
      return children;
  }
};
