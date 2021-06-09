import styles from './index.module.scss';
import React from 'react';
import classnames from 'classnames';
import VideocamIcon from '@material-ui/icons/Videocam';
import SettingsIcon from '@material-ui/icons/Settings';

const Header = ({ onVideoClick, onSettingsClick }) => {
  return (
    <header>
      <div>
        <span>Hello</span>
        <div className={styles.icons}>
          <button onClick={onVideoClick}>
            <VideocamIcon />
          </button>
          <button onClick={onSettingsClick}>
            <SettingsIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;