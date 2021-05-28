import { useEffect, useRef, useState } from "react";
import Chat from "../components/chat/Chat";
import styles from './index.module.scss';
import Overlay from '../components/overlay/Overlay';
import LocalVideo from "../components/video/LocalVideo";

const Home = ({ nickname, socket }) => {

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [stream, setStream] = useState(null);

  const handleOnVideoClick = () => {
    setOverlayVisible(true);
  }

  const handleOnLocalVideoPlay = (stream) => {
    setStream(stream);
  }

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
      <Overlay visible={overlayVisible} onClick={() => setOverlayVisible(false)}>
        <LocalVideo play={overlayVisible} onPlay={handleOnLocalVideoPlay} />
        <span></span>
      </Overlay>
    </div>
  );
}

export default Home;
