import { useCallback, useEffect, useRef, useState } from "react";
import Chat from "../components/chat/Chat";
import styles from './index.module.scss';
import Overlay from '../components/overlay/Overlay';
import LocalVideo from "../components/video/LocalVideo";
import useSocket from "../hooks/useSocket";
import SelectUserModal from "../components/overlay/SelectUserModal";
import classnames from 'classnames';

const STATE = {
  Ringing: 0
}

const Home = ({ nickname, socket, avatar }) => {

  const [callState, setCallState] = useState(null);
  const [calleeId, setCalleeId] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [stream, setStream] = useState(null);

  const localVideoRef = useRef();

  const users = useSocket(socket);

  const handleOnVideoClick = () => {
    setOverlayVisible(true);
    localVideoRef.current?.play();
  }

  const handleOnLocalVideoPlay = useCallback((stream) => {
    setStream(stream);
  }, []);

  const handleOnUserSelect = useCallback((id, nickname, avatar) => {
    setCalleeId(id);
    setCallState(STATE.Ringing);
  }, []);

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
          small={callState === STATE.Ringing}
          forwardRef={localVideoRef}
          onPlay={handleOnLocalVideoPlay}
        />
        <SelectUserModal 
          onClose={handleOnModalClose} 
          visible={stream}
          onSelect={handleOnUserSelect} 
          users={users} 
        />
        <span className={classnames(styles.home__loading, {[styles.home__loading__visible]: stream === null})}>
          Loading...
        </span>
        <span></span>
      </Overlay>
    </div>
  );
}

export default Home;
