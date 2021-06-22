import { Controller, useForm } from 'react-hook-form';

// components
import { Editor } from 'components/common';

// mui
import { Avatar, Box, IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';

// types
import { Descendant } from 'slate';
import type { User } from 'tools/types/user';

// styles
import { primary } from 'styles/colors';

interface Props {
  user: User;
  onSubmit: (values: any) => void;
}

const CreateContentForm = ({ user, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<{ data: Array<Descendant> }>({
    defaultValues: {
      data: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" padding={3} style={{ gap: 10 }}>
        <Avatar src={user.avatar}>{user.username[0].toUpperCase()}</Avatar>
        <Box style={{ width: '100%', minWidth: 680 }}>
          <Controller
            control={control}
            name="data"
            render={({ field }) => (
              <Box style={{ width: '100%', minWidth: 680 }}>
                <Editor username={user.username} {...field} />
              </Box>
            )}
          />
        </Box>
        <IconButton
          style={{
            backgroundColor: primary,
            borderRadius: 16,
          }}
          type="submit"
        >
          <Send fontSize="small" style={{ color: '#FFF' }} />
        </IconButton>
      </Box>
    </form>
  );
};

export default CreateContentForm;
