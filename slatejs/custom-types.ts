import { BaseRange, BaseText } from 'slate';
import { ReactEditor } from 'slate-react';

declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor;
    Text: BaseText & {
      placeholder?: string;
    };
    Range: BaseRange & {
      placeholder?: string;
    };
  }
}
