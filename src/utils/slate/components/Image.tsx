import React from 'react';

// mui
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const Image = ({ attributes, children, element }) => {
  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        style={{
          position: 'relative',
        }}
      >
        <IconButton
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '0.5rem',
          }}
          onClick={() => element.removeMethod(element)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <img
          alt={children}
          src={element.url}
          style={{
            borderRadius: 16,
            display: 'block',
            height: 'auto',
            maxWidth: '100%',
            width: '100%',
          }}
        />
      </div>
      {children}
    </div>
  );
};
