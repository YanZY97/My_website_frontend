import React from 'react';
import { request } from 'umi';
import { message, Modal, Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { PluginComponent } from 'react-markdown-editor-lite';

interface PostUrl {
  url: string;
  showModal: boolean;
  title: string;
  cls: string;
  tags: string;
}

class PostBlog extends PluginComponent<PostUrl> {
  static pluginName = 'postBlog';
  static align = 'right';

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      url: this.getConfig('url'),
      showModal: false,
      title: '',
      cls: '',
      tags: '',
    };
  }

  handleClick = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
    });
  };

  postBlog = async () => {
    await request(this.state.url, {
      method: 'post',
      headers: {
        Authorization:
          'Bearer ' +
          (localStorage.getItem('access') || sessionStorage.getItem('access')),
      },
      data: {
        data: this.editor.getMdValue(),
        title: this.state.title,
        cls: this.state.cls,
        tags: this.state.tags,
      },
    })
      .then(response => {
        message.destroy();
        message.success(response.data);
        this.setState({
          showModal: false,
        });
      })
      .catch(error => {
        console.log(error);
        message.destroy();
        message.error('没有操作权限');
        this.setState({
          showModal: false,
        });
      });
  };

  onChangeTitle = (e: { target: { value: string } }) => {
    const { value } = e.target;
    this.setState({
      title: value,
    });
  };

  onChangeCls = (e: { target: { value: string } }) => {
    const { value } = e.target;
    this.setState({
      cls: value,
    });
  };

  onChangeTags = (e: { target: { value: string } }) => {
    const { value } = e.target;
    this.setState({
      tags: value,
    });
  };

  render() {
    return (
      <>
        <span
          className="button button-type-counter"
          title="Post"
          onClick={this.handleClick}
        >
          <CheckOutlined />
        </span>
        <Modal
          title="输入标题和标签"
          visible={this.state.showModal}
          onOk={this.postBlog}
          okText="发布"
          cancelText="取消"
          onCancel={this.handleCancel}
        >
          <Input placeholder="标题" onChange={this.onChangeTitle} />
          <br />
          <br />
          <Input placeholder="分类" onChange={this.onChangeCls} />
          <br />
          <br />
          <Input placeholder="标签" onChange={this.onChangeTags} />
        </Modal>
      </>
    );
  }
}

export default PostBlog;
