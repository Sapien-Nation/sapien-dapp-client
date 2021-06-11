// mui
import { Box, Typography } from '@material-ui/core';
import {
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
} from '@material-ui/icons';

interface Props {
  commentsCount: 0;
  echoCount: 0;
}

const Actions = ({ commentsCount, echoCount }: Props) => {
  return (
    <Box display="flex" gap={1.7} marginLeft={1.5}>
      <Box alignItems="center" display="flex" gap={0.7}>
        <CommentsIcon color="secondary" fontSize="small" />
        <Typography color="secondary" variant="caption">
          {commentsCount}
        </Typography>
      </Box>
      <Box alignItems="center" display="flex" gap={0.7}>
        <CommentsIcon color="secondary" fontSize="small" />
        <Typography color="secondary" variant="caption">
          {echoCount}
        </Typography>
      </Box>
      <ShareIcon color="secondary" fontSize="small" />
    </Box>
  );
};

export default Actions;
