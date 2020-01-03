import React from 'react';
import classnames from 'classnames';

export default function Spinner({ className }) {
  return (
    <div
      role="status"
      style={{
        width: '4rem',
        height: '4rem',
      }}
      className={classnames('spinner-grow text-info', className)}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
