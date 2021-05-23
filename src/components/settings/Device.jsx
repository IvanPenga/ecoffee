import styles from './index.module.scss';
import { Button, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import React from 'react';

const Device = ({ devices, kind }) => {
  return (
    <div className={styles.device}>
      <FormControl className={styles.device__form} variant="outlined">
        <InputLabel id={kind} variant="outlined">{kind}</InputLabel>
        <Select labelId={kind} variant="outlined">
          {devices.map(device => <MenuItem value={device.deviceId}>{device.label}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}

export default Device;