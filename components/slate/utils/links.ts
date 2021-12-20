import {
  Descendant,
  Editor,
  Element as SlateElement,
  Range,
  Transforms,
} from 'slate';

// constants
import { ElementType } from '../constants';

// types
import type { CustomElement } from '../types';

export const insertLink = (editor, url) => {
  const link: CustomElement = {
    type: ElementType.Link,
    url,
    children: [{ text: url }],
  };

  Transforms.insertNodes(editor, link);
};
