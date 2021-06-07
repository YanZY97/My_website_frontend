import React from 'react';
import { request } from 'umi';

import { BlogCard } from '@/components/components';
import { Pagination } from 'antd';
import QueueAnim from 'rc-queue-anim';

interface States {
  blogList: any;
  blogCount: number;
  page: number;
  show: boolean;
}

class Blog extends React.Component<any, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      blogList: [],
      blogCount: 0,
      page: 1,
      show: true,
    };
  }

  componentDidMount() {
    this.getBlogs();
    this.getBlogCount();
    this.setState({
      show: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      show: false,
    });
  }

  getBlogs = async () => {
    await request('/api/blog/getblog/', {
      method: 'get',
      params: { page: this.state.page },
    }).then(response => {
      let blogCardList = [];
      for (let k = 0; k < response.data.length; k++) {
        blogCardList.push(
          <div key={'card' + k}>
            <BlogCard data={response.data[k]} />
          </div>,
        );
      }
      this.setState({
        blogList: blogCardList,
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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const content = [
      <div>
        <QueueAnim>{this.state.blogList}</QueueAnim>
        <Pagination
          defaultCurrent={1}
          total={this.state.blogCount}
          onChange={this.handleChange}
        />
      </div>,
    ];

    return <>{this.state.show ? content : null}</>;
  }
}

export default Blog;
