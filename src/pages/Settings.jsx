import { Button } from '@material-ui/core';
import { useRef, useState } from 'react';
import MediaDevices from '../components/settings/MediaDevices';
import IceCandidates from '../components/webrtc/IceCandidates';
import styles from './index.module.scss';

const stun = [
  'stun:stun.l.google.com:19302',
  'stun:stun1.l.google.com:19302',
  'stun:stun2.l.google.com:19302',
  'stun:stun3.l.google.com:19302',
  'stun:stun4.l.google.com:19302',
  'stun:stun.freeswitch.org:3478'
]

const Settings = () => {

  const videoRef = useRef();
  const [iceCandidates, setIceCandidates] = useState([]);

  const handleOpenStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    videoRef.current.srcObject = stream;
  };

  const handleIceCandidates = async () => {
    const connection = new RTCPeerConnection({
      iceServers: [{ urls: stun }]
    });
    setIceCandidates([]);
    connection.onicecandidate = (ice) => {
      setIceCandidates(prev => [...prev, ice.candidate]);
    }
    const offer = await connection.createOffer({ offerToReceiveAudio: true, offerToReceiveAudio: true });
    connection.setLocalDescription(offer);
  }

  return (
    <div className={styles.settings}>
      <div className={styles.settings__left}>
        <MediaDevices />
      </div>
      <div className={styles.settings__right}>
        <div>
          <video ref={videoRef} autoPlay playsInline />
          <Button variant="contained" color="primary" onClick={handleOpenStream}>Start</Button>
          <Button variant="contained" color="primary" onClick={handleIceCandidates}>Gather ICE candidates</Button>
        </div>
        <IceCandidates icecandidates={iceCandidates} />
      </div>
    </div>
  );
}

export default Settings;
