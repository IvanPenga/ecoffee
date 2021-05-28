import { useEffect, useRef, useState } from "react";
import Chat from "../components/chat/Chat";
import Settings from "../pages/Settings";
import UserList from "../components/user/UserList";
import styles from './index.module.scss';

const Home = ({ nickname }) => {
  return (
    <div className={styles.home}>
      Hello {nickname}
    </div>
  );
}

export default Home;
