// context
import { useAuth } from 'context/user';

// components
import { Page, PostComposerSkeleton } from 'components/common';
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
  const { me, isLoggingIn } = useAuth();

  const data = getDirectMessageHeader(messageID).messages;

  return (
    <>
      <Page
        header={<Header messageID={messageID} />}
        subHeader={
          <>
            {me && (
              <Box className="card--rounded-white" padding={3}>
                <CreateContentForm
                  setIsCreating={() => {}}
                  squareID={messageID}
                  user={me}
                  onSave={() => console.log('Hello')}
                />
              </Box>
            )}
            {!me && isLoggingIn && <PostComposerSkeleton />}
          </>
        }
      >
        <Box display="grid" style={{ gap: '16px' }}>
          {data.map((content) => (
            // @ts-ignore
            <MessageItem key={content.id} message={content} mutate={() => {}} />
          ))}
        </Box>
      </Page>
      {me && <Widgets />}
    </>
  );
};
