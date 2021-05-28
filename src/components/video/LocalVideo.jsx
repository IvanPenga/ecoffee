import styles from './index.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import stunServers from '../../webrtc/stun';

const connection = new RTCPeerConnection({
  iceServers: [ {urls: stunServers } ]
});

const LocalVideo = ({ play, onPlay }) => {

  const localVideoRef = useRef();

  const playLocalStream = useCallback(async() => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    localVideoRef.current.srcObject = stream;
    if (onPlay) onPlay(stream);
  }, []);

  useEffect(async() => {
    if (play) {
      try {
        playLocalStream();
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