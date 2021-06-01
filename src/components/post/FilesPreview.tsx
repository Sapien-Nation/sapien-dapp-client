// mui
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Close, MusicNote } from '@material-ui/icons';

// styles
import { blue, darkGrey, lightBlue } from 'styles/colors';

//utils
import { formatBytes } from 'utils/formatBytes';

interface Props {
  files?: Array<File>;
}

const FilesPreview = ({ files }: Props) => {
  return (
    <div>
      {files?.map((file) => (
        <Card key={file} elevation={0} style={{ borderRadius: 10, margin: 10 }}>
          <CardContent
            component="div"
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '16px',
            }}
          >
            <Box display="flex">
              {file?.type.includes('audio') && (
                <MusicNote
                  style={{
                    backgroundColor: lightBlue,
                    borderRadius: 10,
                    color: blue,
                    fontSize: 27,
                    marginRight: 16,
                    padding: 10,
                  }}
                />
              )}
              <Box
                alignItems="right"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography variant="buttonMedium">{file.name}</Typography>
                <Typography color={darkGrey} variant="subtitle2">
                  <span>{file?.type}</span> &bull;{' '}
                  <span>{formatBytes(file?.size)}</span>
                </Typography>
              </Box>
            </Box>
            <IconButton aria-label="close" onClick={() => console.log('todo')}>
              <Close style={{ color: darkGrey, fontSize: 16 }} />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FilesPreview;
