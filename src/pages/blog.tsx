import React, { FC, useState } from 'react';
import styles from './blog.less';
import { connect, BlogModelState, ConnectProps } from 'umi';

import { BlogCard } from '@/components/components';
import { Skeleton, Pagination } from 'antd';

interface PageProps extends ConnectProps {
  blog: BlogModelState;
}

interface States {
  blogList: any;
  page: number;
  init: boolean;
}

class Blog extends React.Component<PageProps, States> {
  constructor(props: PageProps) {
    super(props);
    this.state = {
      blogList: [],
      page: 1,
      init: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    let blogCardList = [];
    const _end = 10 + (this.state.page - 1) * 10;
    const end =
      _end < nextProps.blog.blogs.length ? _end : nextProps.blog.blogs.length;
    const start = 0 + (this.state.page - 1) * 10;
    for (let k = start; k < end; k++) {
      blogCardList.push(<BlogCard data={nextProps.blog.blogs[k]} />);
    }
    this.setState({
      init: true,
      blogList: blogCardList,
    });
    document.body.scrollIntoView();
  }

  handleChange = (page: number) => {
    this.setState({
      page: page,
    });
    let blogCardList = [];
    const _end = 10 + (page - 1) * 10;
    const end =
      _end < this.props.blog.blogs.length ? _end : this.props.blog.blogs.length;
    const start = 0 + (page - 1) * 10;
    for (let k = start; k < end; k++) {
      blogCardList.push(<BlogCard data={this.props.blog.blogs[k]} />);
    }
    this.setState({
      blogList: blogCardList,
    });
    document.body.scrollIntoView();
    return blogCardList;
  };

  render() {
    const skeleton = [
      <div>
        <Skeleton avatar active />
        <br />
        <br />
        <br />
        <Skeleton avatar active />
        <br />
        <br />
        <br />
        <Skeleton avatar active />
        <br />
        <br />
        <br />
        <Skeleton avatar active />
        <br />
        <br />
        <br />
        <Skeleton avatar active />
        <br />
        <br />
        <br />
      </div>,
    ];

    const content = [
      <div>
        {this.state.blogList}
        <Pagination
          defaultCurrent={1}
          total={this.props.blog.blogs.length}
          onChange={this.handleChange}
        />
      </div>,
    ];

    return <>{this.state.init ? content : skeleton}</>;
  }
}

export default connect(({ blog }: { blog: BlogModelState }) => ({ blog }))(
  Blog,
);
