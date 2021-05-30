import React, { useCallback } from 'react';

const Robohash = ({ hash, className, onClick }) => {
  
  let src = '';
  if (hash && typeof hash === 'string' && hash.length === 32) {
    src = require(`../../images/robohash/${hash}.png`).default;
  }

  return (
    <img 
      onClick={onClick}
      tabIndex={0} 
      className={className} 
      src={src} 
    />
  );
}

export default Robohash;