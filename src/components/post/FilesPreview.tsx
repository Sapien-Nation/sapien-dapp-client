// mui
import { Box, IconButton, Typography } from '@material-ui/core';
import {
  Audiotrack as AudioIcon,
  Close as CloseIcon,
  Image as ImageIcon,
  Videocam as VideoIcon,
} from '@material-ui/icons';

// utils
import { formatBytes } from 'utils/formatBytes';

interface Props {
  files?: Array<File>;
  onRemove: (files: Array<File>) => void;
}

const FilesPreview = ({ files, onRemove }: Props) => {
  const renderIcon = (type: string) => {
    if (type.includes('audio'))
      return <AudioIcon fontSize="large" />;
    else if (type.includes('image'))
      return <ImageIcon fontSize="large" />;
    else if (type.includes('video'))
      return <VideoIcon fontSize="large" />;
  };

  const handleRemove = (index: number) =>
    onRemove(files.filter((_, fileIndex) => fileIndex !== index));

  return (
    <>
      {files?.map((file, index) => (
        <Box
          key={file.name}
          className="card--rounded"
          display="flex"
          gap={1}
          padding={1}
        >
          <Box
            alignItems="center"
            borderRadius={2.5}
            display="flex"
            height={46}
            justifyContent="center"
            width={46}
          >
            {renderIcon(file.type)}
          </Box>
          <Box display="grid">
            <Typography variant="h3">{file.name}</Typography>
            <Typography variant="subtitle2">
              <span>{file?.type}</span> <span>{formatBytes(file?.size)}</span>
            </Typography>
          </Box>
          <IconButton
            aria-label="remove file"
            onClick={() => handleRemove(index)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </>
  );
};

export default FilesPreview;
