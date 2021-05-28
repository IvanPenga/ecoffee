import styles from './index.module.scss';
import React, { useEffect, useRef, useState } from 'react';

const LocalVideo = ({ play, onPlay }) => {

  const localVideoRef = useRef();

  useEffect(async() => {
    if (play) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        localVideoRef.current.srcObject = stream;
        if (onPlay) onPlay(stream);
      } catch(error) {
        console.log(error);
      }
    }
  }, [play]);

  return (
    <video className={styles.localVideo} ref={localVideoRef} autoPlay playsInline />
  );
}

export default LocalVideo;