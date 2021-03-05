import React from 'react';
import styles from './blog.less';
import { MarkdownEditor, BolgCard } from '@/components/components';
import { Button, Pagination } from 'antd';

export default () => {
  const bolgCardList = [];
  for (let i = 0; i < 10; i++) {
    bolgCardList.push(<BolgCard />);
  }
  return (
    <div>
      {bolgCardList}
      <Pagination defaultCurrent={1} total={bolgCardList.length} />
    </div>
  );
};
