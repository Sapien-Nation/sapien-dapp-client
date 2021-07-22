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
              data-fileKey=${node.data?.key}
              src=${escapeHtml(node.url)}
              style="display:block;max-width:100%;"
            />
          </div>
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
    case 'emoji':
      return `<span
            {...attributes}
            aria-label=${node.name}
            role="img"
          >
            ${node.emoji}
          </span>`;
    case 'video':
      return `<div>
          <div>
            <div
              style="padding:75% 0 0 0;position:relative;"
            >
              <iframe
                src="${escapeHtml(node.url)}"
                style="position:absolute;top:0;left:0;width:100%;height:100%;"
              />
            </div>
          </div>
          ${children}
        </div>`;
    default:
      return children;
  }
};
