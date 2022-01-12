import escapeHtml from 'escape-html';
import { Text } from 'slate';

// constants
import { ElementType } from '../constants';

export const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    return string;
  }

  const children = node.children.map((n) => serialize(n)).join('');

  switch (node.type) {
    case ElementType.Paragraph:
      if (children.match(/(ftp|http|https):\/\/\S+/)) {
        return `<a href='${children}'>${children}</a>`;
      }
      if (children.match(/(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g)) {
        return `<p>#${children}</>`;
      }
      return `<p>${children}</p>`;
    case ElementType.Image:
      return `<div>
                <img
                  alt="Content"
                  data-fileKey=${node?.id}
                  src=${escapeHtml(node?.url)}
                  style="display:block;margin:1rem 0;max-width:100%;"
                />
              </div>`;
    case ElementType.Video:
      return `<div style="text-align:center;">
                <iframe
                  src="${node?.embed}"
                  width="560"
                  height="315"
                  style="border:none;"
                ></iframe>
              </div>`;
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
};
