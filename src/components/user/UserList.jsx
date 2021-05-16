import User from "./User";
import styles from './index.module.scss';

const UserList = ({ users, onCall }) => {
  return (
    <div className={styles.userlist}>
      {users.map((user) => <User key={user.id} {...user} onCall={onCall} />)}
    </div>
  );
}

export default UserList;