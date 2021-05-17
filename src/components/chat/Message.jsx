import styles from './index.module.scss';
import React, { useState } from 'react';
import classnames from 'classnames';

const Message = ({ message, sender, id, nickname }) => {
  return (
    <div className={classnames(styles.message, { [styles.message__sender]: sender })}>
      <span>{nickname}</span>
      <div>{message}</div>
    </div>
  );
}

export default Message;