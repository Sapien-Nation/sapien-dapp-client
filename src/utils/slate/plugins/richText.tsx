import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import React, { Ref, PropsWithChildren } from 'react';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

type OrNull<T> = T | null;

const Button = React.forwardRef(
  (
    { ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => <span {...props} ref={ref} />
);

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const Menu = React.forwardRef(
  (
    { ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => <div {...props} ref={ref} style={{ marginBottom: 10 }} />
);

export const Toolbar = React.forwardRef(
  (
    { ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => <Menu {...props} ref={ref} />
);

export const MarkButton = ({ format }) => {
  const editor = useSlate();
  return (
    <Button
      //active={isMarkActive(editor, format)}
      style={{ cursor: 'pointer', margin: '0 10px' }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {format}
    </Button>
  );
};
