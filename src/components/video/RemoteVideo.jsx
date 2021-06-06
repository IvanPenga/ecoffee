import styles from './index.module.scss';
import React, { useCallback, useImperativeHandle, useRef } from 'react';

const RemoteVideo = ({ forwardRef }) => {

  const remoteVideoRef = useRef();

  const setSrcObject = useCallback((stream) => {
    if (remoteVideoRef.current.srcObject !== stream) {
      remoteVideoRef.current.srcObject = stream;
    }
  }, []);

  useImperativeHandle(forwardRef, () => ({
    setSrcObject: setSrcObject,
  }), [setSrcObject]);

  return (
    <video className={styles.remoteVideo} ref={remoteVideoRef} autoPlay playsInline />
  );
}

export default RemoteVideo;