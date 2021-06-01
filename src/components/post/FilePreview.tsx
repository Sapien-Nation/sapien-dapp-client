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

interface Props {
  audios?: Array<File>;
  images?: Array<File>;
}

const FilePreview = ({ audios, images }: Props) => {
  const media = audios.concat(images);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'Kb', 'Mb', 'Gb', 'Tb'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <Box display="flex" marginY={2}>
      {media &&
        media.map((elm, i) => (
          <Card
            key={i}
            elevation={0}
            style={{ borderRadius: 10, margin: 10, width: 363 }}
          >
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
                {elm.type && elm.type.includes('audio') && (
                  <Box
                    component="div"
                    style={{
                      backgroundColor: lightBlue,
                      borderRadius: 10,
                      marginRight: 16,
                      padding: 10,
                    }}
                  >
                    <MusicNote style={{ color: blue, fontSize: 27 }} />
                  </Box>
                )}
                <Box
                  alignItems="right"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography variant="buttonMedium">{elm.name}</Typography>
                  <Typography color={darkGrey} variant="subtitle2">
                    <span>{elm?.type}</span> &bull;{' '}
                    <span>{formatBytes(elm?.size)}</span>
                  </Typography>
                </Box>
              </Box>
              <IconButton
                aria-label="close"
                onClick={() => console.log('todo')}
              >
                <Close style={{ color: darkGrey, fontSize: 16 }} />
              </IconButton>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};

export default FilePreview;
