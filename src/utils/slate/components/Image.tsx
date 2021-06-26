import React from 'react';

export const Image = ({ attributes, children, element }) => {
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          alt={children}
          src={element.url}
          style={{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '20em',
          }}
        />
      </div>
      {children}
    </div>
  );
};
