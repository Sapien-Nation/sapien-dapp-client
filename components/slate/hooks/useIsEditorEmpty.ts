// constants
import { ElementType } from '../constants';

// types
import type { CustomElement } from '../types';

export const useIsEditorEmpty = (value: Array<CustomElement>) => {
  const totalChilds = value.length;
  const totalTextChilds = value.filter(
    ({ type }) => type === ElementType.Paragraph
  );

  if (totalChilds !== totalTextChilds.length) return false;

  const noTextChildrens = totalTextChilds
    .map(({ children }) => {
      if (children[0].text.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
        return children;
      }

      return null;
    })
    .filter(Boolean).length;

  if (noTextChildrens !== totalTextChilds.length) return false;

  return true;
};

export default useIsEditorEmpty;
