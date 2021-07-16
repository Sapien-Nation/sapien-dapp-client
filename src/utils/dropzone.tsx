// mui
import { Button, Typography } from '@material-ui/core';

export const MaxSizeHelper = ({
  size,
  open,
}: {
  size: number;
  open: () => void;
}) => (
  <Typography color="textSecondary" variant="button">
    Drag and Drop or{' '}
    {/* <Typography color="primary" variant="button">
      Browse{' '}
    </Typography> */}
    <Button
      color="primary"
      style={{ verticalAlign: 'baseline' }}
      onClick={open}
    >
      Browse
    </Button>
    to upload image (max {size / (1024 * 1024)}MB)
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
