// mui
import { Box, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

// styles
import { primary } from 'styles/colors';

const Video = ({ attributes, children, element }) => {
  const { url, image } = element;

  return (
    <>
      <div {...attributes} contentEditable={false}>
        <Box
          className="card--rounded-white"
          display="flex"
          marginY={1}
          position="relative"
        >
          <IconButton
            aria-label="Remove video from content"
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '1rem',
            }}
            onClick={() => element.removeMethod()}
          >
            <CloseIcon />
          </IconButton>
          <img
            alt={image?.url || ''}
            height="auto"
            src={image?.url}
            style={{ borderRadius: '16px 0 0 16px' }}
            width="130px"
          />
          <Box padding={2} width="100%">
            <a
              href={url}
              rel="noreferrer"
              style={{ margin: 0, color: primary[800] }}
              target="_blank"
            >
              {url}
            </a>
          </Box>
        </Box>
      </div>
      <a
        href={children}
        rel="noreferrer"
        style={{ margin: 0, color: primary[800] }}
        target="_blank"
      >
        {children}
      </a>
    </>
  );
};

export default Video;
