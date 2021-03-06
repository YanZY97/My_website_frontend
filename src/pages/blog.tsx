import React, { FC } from 'react';
import styles from './blog.less';
import { connect, BlogModelState, ConnectProps } from 'umi';

import { MarkdownEditor, BolgCard } from '@/components/components';
import { Button, Pagination } from 'antd';

interface PageProps extends ConnectProps {
  blog: BlogModelState;
}

const Blog: FC<PageProps> = props => {
  const bolgCardList = [];
  for (let i = 0; i < props.blog.blogs.length; i++) {
    bolgCardList.push(<BolgCard data={props.blog.blogs[i]} />);
  }

  return (
    <div>
      {bolgCardList}
      <Pagination defaultCurrent={1} total={bolgCardList.length} />
    </div>
  );
};

export default connect(({ blog }: { blog: BlogModelState }) => ({ blog }))(
  Blog,
);
