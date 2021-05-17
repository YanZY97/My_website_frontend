import React, { FC, useState } from 'react';
import styles from './blog.less';
import { request } from 'umi';

import { BlogCard } from '@/components/components';
import { Skeleton, Pagination } from 'antd';

interface States {
  blogList: any;
  blogCount: number;
  page: number;
  init: boolean;
}

class Blog extends React.Component<any, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      blogList: [],
      blogCount: 0,
      page: 1,
      init: false,
    };
  }

  componentDidMount() {
    this.getBlogs();
    this.getBlogCount();
  }

  getBlogs = async () => {
    await request('/api/blog/getblog/', {
      method: 'get',
      params: { page: this.state.page },
    }).then(response => {
      let blogCardList = [];
      for (let k = 0; k < response.data.length; k++) {
        blogCardList.push(<BlogCard data={response.data[k]} />);
      }
      this.setState({
        blogList: blogCardList,
        init: true,
      });
    });
  };

  getBlogCount = async () => {
    await request('/api/blog/getblogcount/').then(response => {
      this.setState({
        blogCount: response.count,
      });
    });
  };

  handleChange = async (page: number) => {
    await this.setState({
      page: page,
    });
    this.getBlogs();
    this.getBlogCount();
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
          total={this.state.blogCount}
          onChange={this.handleChange}
        />
      </div>,
    ];

    return <>{this.state.init ? content : skeleton}</>;
  }
}

export default Blog;
