import React from 'react';

// mui
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Image = ({ attributes, children, element }) => {
  // TODO handle loading
  const { isUploading } = element;
  if (isUploading) return 'Adding image...';

  return (
    <>
      <div
        {...attributes}
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
          onClick={() => element.removeMethod()}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <img
          alt="Content"
          data-fileKey={element.key}
          src={element.url}
          style={{
            borderRadius: 16,
            display: 'block',
            height: 'auto',
            maxWidth: '100%',
            width: '100%',
          }}
          onError={(event) => {
            (event as any).target.src = element.original;
          }}
        />
      </div>
      {children}
    </>
  );
};

export default Image;
