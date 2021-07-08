import React, { useState } from 'react';

// mui
import { Box, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// styles
import { primary } from 'styles/colors';

export const VideoElement = ({ attributes, children, element }) => {
  const { url, image } = element;
  const [hidden, setHidden] = useState(false);

  return (
    <>
      {children}
      <div {...attributes}>
        <div contentEditable={false}>
          <Box
            borderRadius={16}
            display={hidden ? 'none' : 'flex'}
            marginY={1}
            position="relative"
            style={{ backgroundColor: '#fff' }}
          >
            <IconButton
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: '1rem',
              }}
              onClick={() => setHidden(true)}
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
      </div>
    </>
  );
};
