import React from 'react';
import { Spin } from 'antd';
import styles from './global.less';

export default () => {
  return (
    <div className={styles.center} style={{ marginTop: '20%' }}>
      <Spin size="large" />
    </div>
  );
};
