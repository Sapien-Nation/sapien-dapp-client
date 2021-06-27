// mui
import { Box, Typography } from '@material-ui/core';
import {
  ChatBubbleOutlineOutlined as CommentsIcon,
  ShareOutlined as ShareIcon,
  Campaign as EchoIcon,
} from '@material-ui/icons';

interface Props {
  commentsCount: number;
  echoCount: number;
  shareCount: number;
}

const Actions = ({ commentsCount, echoCount, shareCount }: Props) => {
  return (
    <Box display="flex" marginLeft={1.5} style={{ gap: '17px' }}>
      <Box alignItems="center" display="flex" style={{ gap: '0.7px' }}>
        <CommentsIcon color="secondary" fontSize="small" />
        <Typography color="secondary" variant="caption">
          {commentsCount}
        </Typography>
      </Box>
      <Box alignItems="center" display="flex" style={{ gap: '0.7px' }}>
        <EchoIcon color="secondary" fontSize="small" />
        <Typography color="secondary" variant="caption">
          {echoCount}
        </Typography>
      </Box>
      <Box alignItems="center" display="flex" style={{ gap: '0.7px' }}>
        <ShareIcon color="secondary" fontSize="small" />
        <Typography color="secondary" variant="caption">
          {shareCount}
        </Typography>
      </Box>
    </Box>
  );
};

export default Actions;
