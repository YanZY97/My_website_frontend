import React from 'react';
import styles from './about.less';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <>
      <div className={styles.index}>
        <Title>About</Title>
      </div>
    </>
  );
};
