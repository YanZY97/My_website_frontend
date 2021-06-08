import React from 'react';
import { connect, UserModelState, Dispatch } from 'umi';
import { Comment, Avatar, Form, Button, Input, message } from 'antd';
import { request } from 'umi';

const { TextArea } = Input;

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}

interface Props extends ConnectProps {
  user: UserModelState;
  submitUrl?: string;
  handleRefresh: () => void;
}

interface State {
  submitting: boolean;
  value: string;
  user: string;
}

const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        添加评论
      </Button>
    </Form.Item>
  </>
);

class MessageEditor extends React.Component<Props, State> {
  static defaultProps = {
    submitUrl: '/api/message/postmessage/',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      submitting: false,
      value: '',
      user: '',
    };
  }

  handleSubmit = () => {
    if (!this.state.value) {
      message.destroy();
      message.warning('留言内容不能为空');
      return;
    }

    this.setState({
      user: this.props.user.username,
      submitting: true,
    });

    request(this.props.submitUrl!, {
      method: 'post',
      data: {
        user: this.props.user.username,
        data: this.state.value,
      },
    })
      .then(response => {
        message.destroy();
        message.success('发布成功');
        this.setState({
          submitting: false,
          value: '',
        });
        this.HandleRefresh(this.props.handleRefresh);
      })
      .catch(error => {
        message.destroy();
        console.log(error);
        this.setState({
          submitting: false,
        });
      });
  };

  handleChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  };

  HandleRefresh = async (onFinish: () => void) => {
    await onFinish();
  };

  render() {
    return (
      <>
        <div style={{ padding: '2em 4em', backgroundColor: 'white' }}>
          <h1>发表留言</h1>
          <Comment
            avatar={<Avatar size={'default'} src={this.props.user.avatar} />}
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={this.state.submitting}
                value={this.state.value}
              />
            }
          />
        </div>
      </>
    );
  }
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(
  MessageEditor,
);
