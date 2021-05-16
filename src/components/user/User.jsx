import styles from './index.module.scss';

const User = ({ id, nickname, onCall }) => {
  return (
    <div className={styles.user}>
      <p>Nickname - {id}</p>
      <p>{nickname}</p>
      <button onClick={() => onCall(id)}>Make call</button>
    </div>
  );
}

export default User;
