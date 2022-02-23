import { useState } from 'react';
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { tw } from 'twind';
import { parse } from 'node-html-parser';

// api
import { createContent } from 'api/content';

// components
import { ExpandedEditor, NormalEditor } from './mainChanel';

// context
import { useAuth } from 'context/user';
import { useToast } from 'context/toast';

// constants
import { ElementType } from './constants';

// types
import type { CustomElement, CustomText } from './types';

// utils
import { serialize } from './utils';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

enum View {
  Expanded,
  Normal,
}

interface Props {
  onSave: () => void;
  tribeID: string;
}

const EditorField = ({ onSave, tribeID }) => {
  const [view, setView] = useState<View>(View.Normal);
  const [cacheValue, setCacheValue] = useState<Array<CustomElement>>([
    {
      children: [{ text: '' }],
      type: ElementType.Paragraph,
      key: null,
    },
  ]);
  const [isFetching, setIsFetching] = useState(false);

  const { me } = useAuth();
  const toast = useToast();
  //--------------------------------------------------------------------------------------------------------------------
  const handleSubmit = async (values) => {
    setIsFetching(true);
    try {
      const body = {
        data: values.map((node: CustomElement) => serialize(node)).join(''),
        groupId: tribeID,
      };

      const rawHTML = parse(
        values.map((node: CustomElement) => serialize(node)).join('')
      );
      const preview =
        rawHTML.querySelector('img')?.rawAttributes?.['data-fileKey'];

      if (preview) {
        (body as any).preview = preview;
      }

      await createContent(body);
      onSave();
    } catch (error) {
      toast({
        message: error || 'Error while creating the content, please try again',
      });
    }
    setIsFetching(false);
  };

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div
        className={tw`flex items-center w-full mt-6 bg-white px-6 py-8 relative ${
          isFetching ? 'cursor-wait' : 'cursor-default'
        }`}
      >
        <img
          className={tw`self-start inline-block h-10 w-10 rounded-full mr-4`}
          src={
            me.avatar ||
            'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png'
          }
          alt="This is your profile picture"
          onError={(event) => {
            (event.target as HTMLImageElement).src =
              'https://d151dmflpumpzp.cloudfront.net/tribe-images/sapien-tribe.png';
          }}
        />
        {view === View.Normal && (
          <NormalEditor defaultValue={cacheValue} onSubmit={handleSubmit} />
        )}

        {view === View.Expanded && (
          <ExpandedEditor
            defaultValue={cacheValue}
            setView={(doc, selection) => {
              setCacheValue(doc);
              setView(View.Normal);
              // TODO handle set editor selection for better UX
              console.log(selection);
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default EditorField;
