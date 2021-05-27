import React from 'react';
import styles from './partner.less';
import { Typography, Divider } from 'antd';
import { PartnerLinks } from '@/components/components';

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <>
      <div className={styles.index}>
        <PartnerLinks />
      </div>
    </>
  );
};
