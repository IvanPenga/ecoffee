import styles from './index.module.scss';
import React, { useMemo, useState } from 'react';
import Overlay from '../overlay/Overlay';
import { hashes, getAvatar } from '../../avatars';
import classNames from 'classnames';

const AvatarModal = ({ onClose, visible, selectedHash }) => {

  const [selected, setSelected] = useState(() => selectedHash || hashes[0]);

  const handleOnClose = () => {
    console.log('Closing', selected);
    if (onClose) onClose(selected);
  }

  const handleOnSelect = (hash) => {
    setSelected(hash);
  }

  return (
    <Overlay onClick={handleOnClose} visible={visible}>
      <div className={styles.avatarModal}>
        <svg onClick={handleOnClose} stroke="white" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
        {hashes.map((hash) => (
          <img
            className={classNames({ [styles.avatarModal__selected]: hash === selected })}
            key={hash}
            onClick={() => handleOnSelect(hash)}
            tabIndex={0}
            src={getAvatar(hash)}
          />
        ))}
      <footer>
        Pick your favourite robot
      </footer>
      </div>
    </Overlay>
  );
}

export default AvatarModal;