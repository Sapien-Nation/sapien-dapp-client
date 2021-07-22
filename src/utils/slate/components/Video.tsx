import React, { useState } from 'react';

// mui
import { Box, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

// styles
import { primary } from 'styles/colors';

export const VideoElement = ({ attributes, children, element }) => {
  const { image } = element;
  const [hidden, setHidden] = useState(false);

  return (
    <>
      <div {...attributes}>
        <div contentEditable={false}>
          <Box
            className="card--rounded-white"
            display={hidden ? 'none' : 'flex'}
            marginY={1}
            position="relative"
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
                href={children}
                rel="noreferrer"
                style={{ margin: 0, color: primary[800] }}
                target="_blank"
              >
                {children}
              </a>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};
