import { useCallback, useEffect, useRef, useState } from "react";
import Chat from "../components/chat/Chat";
import styles from './index.module.scss';
import Overlay from '../components/overlay/Overlay';
import LocalVideo from "../components/video/LocalVideo";
import useSocketUsers from "../hooks/useSocketUsers";
import SelectUserModal from "../components/overlay/SelectUserModal";
import classnames from 'classnames';
import RemoteVideo from "../components/video/RemoteVideo";
import connection from "../webrtc/connection";

const STATE = {
  None: 0,
  Choosing: 1,
  Ringing: 2,
  Receiving: 3
}

const Home = ({ nickname, socket, avatar }) => {

  const [callState, setCallState] = useState(STATE.None);
  const [calleeId, setCalleeId] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [stream, setStream] = useState(null);

  const [remoteOffer, setRemoteOffer] = useState(null);
  const [callerId, setCallerId] = useState(null);

  const [isCaller, setIsCaller] = useState(false);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const users = useSocketUsers(socket);

  useEffect(() => {

    const onIceCandidate = (candidate) => {
      console.log('Got ICE candidates', candidate);
      connection.addIceCandidate(new RTCIceCandidate(candidate));
    };
    
    connection.onicecandidate = (e) => {
      if (e.candidate) { 
        if (isCaller) {
          socket?.emit('icecandidate', { id: calleeId, candidate: new RTCIceCandidate(e.candidate) }); 
        }
        else {
          socket?.emit('icecandidate', { id: callerId, candidate: new RTCIceCandidate(e.candidate) }); 
        }
      }
    }

    socket?.on('icecandidate', onIceCandidate);

    connection.ontrack = (e) => {
      console.log('Got SRC');
      remoteVideoRef.current.setSrcObject(e.streams[0]);
    }
    return () => {
      socket?.off('icecandidate', onIceCandidate);
    }

  }, [socket, calleeId, isCaller, callerId]);




  useEffect(() => {

    const onOffer = ({ offer, callerId }) => {
      setRemoteOffer(offer);
      setCallerId(callerId);
      setCallState(STATE.Receiving);
      setOverlayVisible(true);
      connection.setRemoteDescription(new RTCSessionDescription(offer));
    };

    const onAnswer = ({ answer }) => {
      connection.setRemoteDescription(new RTCSessionDescription(answer));
    };

    socket?.on('offer', onOffer);
    socket?.on('answer', onAnswer);

    return () => {
      socket?.off('offer', onOffer);
      socket?.on('answer', onAnswer);
    }

  }, [socket]);

  const handleOnVideoClick = useCallback(() => {
    setOverlayVisible(true);
    setIsCaller(true);
    requestAnimationFrame(() => {
      try {
        localVideoRef.current?.play();
      } catch(error) {
        console.log(error);
      }
    });
  }, []);

  const handleOnLocalVideoPlay = useCallback((stream) => {
    if (isCaller) setCallState(STATE.Choosing);
    setStream(stream);
  }, [isCaller]);

  const handleOnUserSelect = useCallback((id, nickname, avatar) => {
    setCalleeId(id);
    setCallState(STATE.Ringing);
    
    stream.getTracks().forEach(track => connection.addTrack(track, stream));

    connection.createOffer({ offerToReceiveVideo: true })
      .then((offer) => { 
        socket.emit('offer', { id, offer });
        connection.setLocalDescription(new RTCSessionDescription(offer));
      }).catch((error) => console.log(error));

  }, [stream]);

  const handleOnModalClose = useCallback(() => {
    setStream(null);
    setOverlayVisible(false);
    localVideoRef.current?.stop();
  }, []);

  useEffect(() => {
    switch(callState) {
      case STATE.Ringing: return;
      default: return;
    }
  }, [callState]);

  const handleOnAnswer = useCallback(() => {
    localVideoRef.current?.play()
    .then(stream => { 
      stream.getTracks().forEach(track => connection.addTrack(track, stream))
    
      connection.createAnswer({ offerToReceiveVideo: true })
      .then((answer) => {
        socket.emit('answer', { id: callerId, answer });
        connection.setLocalDescription(answer);
      }).catch((error) => console.log(error));

    })
    .catch(err => console.log(err))
  }, [callerId]);

  const handleOnReject = useCallback(() => {
    setOverlayVisible(false);
  }, []);

  const handleOnRemoteVideoPlay = useCallback(() => {

  }, [stream]);

  return (
    <div className={styles.home}>
      <header>
        <div>
          <span>Hello {nickname}</span>
          <button onClick={handleOnVideoClick}>
            <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></svg>
          </button>
        </div>
      </header>
      <Chat socket={socket} />
      <Overlay visible={overlayVisible} onClick={handleOnModalClose}>
        <LocalVideo
          small={true}
          forwardRef={localVideoRef}
          onPlay={handleOnLocalVideoPlay}
        />
        <SelectUserModal 
          onClose={handleOnModalClose} 
          visible={callState === STATE.Choosing}
          onSelect={handleOnUserSelect} 
          users={users} 
        />
        <RemoteVideo
          forwardRef={remoteVideoRef}
          onPlay={handleOnRemoteVideoPlay} 
        />
        {remoteOffer && callState === STATE.Receiving && (
          <div className={styles.controls}>
            <button onClick={handleOnAnswer}>Answer</button>
            <button onClick={handleOnReject}>Reject</button>
          </div>
        )}
        <span className={classnames(styles.home__loading, {[styles.home__loading__visible]: stream === null})}>
          Loading...
        </span>
      </Overlay>
    </div>
  );
}

export default Home;
