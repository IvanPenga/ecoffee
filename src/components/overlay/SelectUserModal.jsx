import styles from './index.module.scss';
import React, { useCallback } from 'react';
import Robohash from '../robohash/Robohash';
import classnames from 'classnames';

const SelectUserModal = ({ visible, onSelect, onClose, users = [] }) => {

  const handleOnClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  return (
    <div className={classnames(styles.selectUserModal, { [styles.visible]: visible })}>
      <header>Who you gonna call?</header>
      {users.map(({id, nickname, avatar}) => (
        id && nickname && (
          <div onClick={() => onSelect(id)} key={id} className={styles.selectUserModal__user}>
            <Robohash hash={avatar} />
            <span>{nickname}</span>
          </div>
        )
      ))}
      <button onClick={handleOnClose} className={styles.selectUserModal__nobody}>
        Nobody
      </button>
    </div>
  );
}

export default SelectUserModal;