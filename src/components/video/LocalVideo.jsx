import styles from './index.module.scss';
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import stunServers from '../../webrtc/stun';

const connection = new RTCPeerConnection({
  iceServers: [ {urls: stunServers } ]
});

const LocalVideo = ({ onPlay, forwardRef }) => {

  const localVideoRef = useRef();
  const [stream, setStream] = useState();

  const stopLocalStream = useCallback(() => {
    console.log('Stopping stream', stream);
    stream?.getTracks().forEach((track) => track.stop());
    localVideoRef.current.srcObject = null;
  }, [stream]);

  const playLocalStream = useCallback(async() => {
    console.log('Playing...');
    const userMedia = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    localVideoRef.current.srcObject = userMedia;
    if (onPlay) onPlay(userMedia);
    setStream(userMedia);
  }, [stream]);

  useImperativeHandle(forwardRef, () => ({
    stop: stopLocalStream,
    play: playLocalStream
  }), [stopLocalStream, playLocalStream]);

  return (
    <video className={styles.localVideo} ref={localVideoRef} autoPlay playsInline />
  );
}

export default LocalVideo;