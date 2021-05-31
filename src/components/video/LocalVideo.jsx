import styles from './index.module.scss';
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react';
import stunServers from '../../webrtc/stun';
import classnames from 'classnames';

const connection = new RTCPeerConnection({
  iceServers: [ {urls: stunServers } ]
});

let controller = new AbortController();

const LocalVideo = ({ onPlay, forwardRef, small }) => {

  const localVideoRef = useRef();
  const [stream, setStream] = useState();

  const stopLocalStream = useCallback(() => {
    stream?.getTracks().forEach((track) => track.stop());
    localVideoRef.current.srcObject = null;
    setStream(null);
  }, [stream]);

  const playLocalStream = useCallback(async() => {
    const media = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    localVideoRef.current.srcObject = media;
    if (onPlay) onPlay(media);
    setStream(media);
  }, [stream]);

  useImperativeHandle(forwardRef, () => ({
    stop: stopLocalStream,
    play: playLocalStream
  }), [stopLocalStream, playLocalStream]);

  return (
    <video className={classnames(styles.localVideo, { [styles.localVideo__small]: small })} ref={localVideoRef} autoPlay playsInline />
  );
}

export default LocalVideo;