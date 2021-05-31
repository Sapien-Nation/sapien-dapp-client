// mui
import { Typography } from '@material-ui/core';

export const MazSizeHelper = ({ size }: { size: string }) => (
  <Typography variant="caption">
    Drag and Drop or{' '}
    <Typography color="primary" variant="caption">
      Browse{' '}
    </Typography>
    to upload image (max {size})
  </Typography>
);

export const FilePreview = ({ file, name }: { file: any; name: string }) => (
  <img
    alt={name}
    src={file}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
    }}
  />
);
