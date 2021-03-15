import React, { FC, useState } from 'react';
import styles from './blog.less';
import { connect, BlogModelState, ConnectProps } from 'umi';

import { MarkdownEditor, BolgCard } from '@/components/components';
import { Button, Pagination } from 'antd';

interface PageProps extends ConnectProps {
  blog: BlogModelState;
}

const Blog: FC<PageProps> = props => {
  const init = () => {
    const bolgCardList = [];
    const end = 10 < props.blog.blogs.length ? 10 : props.blog.blogs.length;
    for (let i = 0; i < 10; i++) {
      bolgCardList.push(<BolgCard data={props.blog.blogs[i]} />);
    }
    return bolgCardList;
  };

  const [bolgList, setBlogList] = useState<any>([]);

  const handleChange = (page: number) => {
    let bolgCardList = [];
    const _end = 10 + (page - 1) * 10;
    const end = _end < props.blog.blogs.length ? _end : props.blog.blogs.length;
    const start = 0 + (page - 1) * 10;
    for (let k = start; k < end; k++) {
      bolgCardList.push(<BolgCard data={props.blog.blogs[k]} />);
    }
    setBlogList(bolgCardList);
  };

  return (
    <div>
      {bolgList}
      <Pagination
        defaultCurrent={1}
        total={props.blog.blogs.length}
        onChange={handleChange}
      />
    </div>
  );
};

export default connect(({ blog }: { blog: BlogModelState }) => ({ blog }))(
  Blog,
);
