import styles from './index.module.scss';
import React from 'react';
import classnames from 'classnames';

const Message = ({ message, sender, id, nickname, timestamp }) => {
  return (
    <div className={classnames(styles.message, { [styles.message__sender]: sender })}>
      <span>{nickname}</span>
      <div>{message}</div>
    </div>
  );
}

export default Message;