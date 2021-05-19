import { Button } from '@material-ui/core';
import styles from './index.module.scss';

const User = ({ id, nickname, onCall }) => {
  return (
    <Button className={styles.user} variant="contained" color="primary" onClick={() => onCall(id)}>
      Video call with {nickname}
    </Button>
  );
}

export default User;
