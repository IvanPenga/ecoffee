import styles from './index.module.scss';
import React, { useCallback } from 'react';
import classnames from 'classnames';

const Overlay = ({ children, visible, onClick }) => {

  const handleOnOverlayClick = useCallback((event) => {
    event.target === event.currentTarget && onClick();
  }, [onClick]);

  return (
    <div onClick={handleOnOverlayClick} className={classnames(styles.overlay, { [styles.visible]: visible })}>
      {children}
    </div>
  );
}

export default Overlay;