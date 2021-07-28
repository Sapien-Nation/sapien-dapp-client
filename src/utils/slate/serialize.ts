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
                <img
                  alt="Content"
                  data-fileKey=${node.key}
                  src=${escapeHtml(node.original)}
                  style="display:block;margin:1rem 0;max-width:100%;"
                />
              </div>`;
    case 'link':
      return `<a 
                target="_blank" 
                href="${escapeHtml(node.url)}"
                style="margin:0;color:${primary[800]};" 
              >
                ${node.url}
              </a>`;
    case 'paragraph':
      return `<p style="margin-top:2rem;">
                ${children}
              </p>`;
    case 'emoji':
      return `<span
                aria-label=${node.emoji}
                role="img"
              >
                ${children}
              </span>`;
    case 'video':
      return `<div>
                <div
                  style="padding:75% 0 0 0;position:relative;"
                >
                  <iframe
                    src="${escapeHtml(node.url)}"
                    style="position:absolute;top:0;left:0;width:100%;height:100%;"
                  />
                </div>
              ${children}
            </div>`;
    default:
      return children;
  }
};
