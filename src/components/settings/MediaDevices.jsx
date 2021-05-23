import styles from './index.module.scss';
import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Device from './Device';

const MediaDevices = ({  }) => {

  const [audioInput, setAudioInput] = useState([]);
  const [audioOutput, setAudioOutput] = useState([]);
  const [videoInput, setVideoInput] = useState([]);

  useEffect(async() => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices() || [];
      setAudioInput(devices.filter(device => device.kind === 'audioinput'));
      setAudioOutput(devices.filter(device => device.kind === 'audiooutput'));
      setVideoInput(devices.filter(device => device.kind === 'videoinput'));
    } catch (error) {

    }
  }, []);

  return (
    <div className={styles.settings}>
      <Device devices={audioInput} kind="audioinput" />
      <Device devices={audioOutput} kind="audiooutput" />
      <Device devices={videoInput} kind="videoinput" />
    </div>
  );
}

export default MediaDevices;