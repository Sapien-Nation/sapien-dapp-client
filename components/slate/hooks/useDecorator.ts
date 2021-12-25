import { useCallback } from 'react';
import { Text } from 'slate';

// constants
import { LeafType } from 'components/slate/constants';

export const isNodeAHashtag = (node, path) => {
  const match = node.text.match(/^#[^ !@#$%^&*(),.?":{}|<>]*$/);
  if (match) {
    const offset = node.text.indexOf(match[0]);

    return {
      type: LeafType.Hashtag,
      anchor: {
        path,
        offset,
      },
      focus: {
        path,
        offset: offset + match[0].length,
      },
    };
  }

  null;
};

export const isNodeALink = (node, path) => {
  const match = node.text.match(/(ftp|http|https):\/\/\S+/);
  if (match) {
    const offset = node.text.indexOf(match[0]);

    return {
      type: LeafType.Link,
      anchor: {
        path,
        offset,
      },
      focus: {
        path,
        offset: offset + match[0].length,
      },
    };
  }

  null;
};

const useDecorator = () => {
  const handler = useCallback(([node, path]) => {
    const ranges = [];
    if (Text.isText(node)) {
      const hashtagDecorator = isNodeAHashtag(node, path);
      const linkDecorator = isNodeALink(node, path);

      if (hashtagDecorator) {
        ranges.push(hashtagDecorator);
      }

      if (linkDecorator) {
        ranges.push(linkDecorator);
      }
    }

    return ranges;
  }, []);

  return handler;
};

export default useDecorator;
