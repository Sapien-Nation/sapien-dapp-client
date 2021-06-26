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
    case 'paragraph':
      return `<p style="margin:0;">${children}</p>`;
    case 'link':
      return `<a 
          style="margin:0;color:${primary};" 
          target="_blank" href="${escapeHtml(node.url)}"
        >
          ${children}
          </a>`;
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
    case 'block-quote':
      return `<blockquote style="font-style:bold;border:4px solid ${primary}">
            <span style="margin-left:4px;">
              ${children}
            </span>
          </blockquote>`;
    default:
      return children;
  }
};
