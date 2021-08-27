// hooks
import { useMe } from 'hooks';

// components
import { Page } from 'components/common';
import Header from './Header';
import { CreateContentForm, MessageItem } from 'components/content';
import { Widgets } from 'components/widgets';

// mui
import { Box } from '@material-ui/core';

// TODO remove
import { getDirectMessageHeader } from 'utils/poc';

interface Props {
  messageID: string;
}

export const Messages = ({ messageID }: Props) => {
  const me = useMe();

  const data = getDirectMessageHeader(messageID).messages;

  return (
    <>
      <Page
        header={<Header messageID={messageID} />}
        subHeader={
          <Box className="card--rounded-white" padding={3}>
            <CreateContentForm
              setIsCreating={() => {}}
              squareID={messageID}
              user={me}
              onSave={() => console.log('Hello')}
            />
          </Box>
        }
      >
        <Box display="grid" style={{ gap: '16px' }}>
          {data.map((content) => (
            // @ts-ignore
            <MessageItem key={content.id} message={content} mutate={() => {}} />
          ))}
        </Box>
      </Page>
      <Widgets />
    </>
  );
};
