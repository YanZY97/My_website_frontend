import React from 'react';
import { request } from 'umi';
import { Button, Modal, Form, Checkbox, Input, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect, UserModelState, Dispatch } from 'umi';

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}

interface isProps extends ConnectProps {
  user: UserModelState;
  display?: boolean;
}

interface isState {
  loading: boolean;
  visible: boolean;
}

class Login extends React.Component<isProps, isState> {
  static defaultProps = {
    display: true,
  };
  constructor(props: isProps) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  formRef = React.createRef<FormInstance>();

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = async () => {
    try {
      const value = await this.formRef.current?.validateFields();
      const remember = this.formRef.current?.getFieldValue('remember');
      const { dispatch } = this.props;
      this.setState({ loading: true });
      await request('/api/user/login/', {
        method: 'post',
        data: value,
      })
        .then(
          (response: { username: string; refresh: string; access: string }) => {
            this.setState({ loading: false, visible: false });
            message.success('登录成功');
            if (remember) {
              localStorage.setItem('username', response.username);
              localStorage.setItem('refresh', response.refresh);
              localStorage.setItem('access', response.access);
            } else {
              sessionStorage.setItem('username', response.username);
              sessionStorage.setItem('refresh', response.refresh);
              sessionStorage.setItem('access', response.access);
            }
            dispatch!({
              type: 'user/save',
              payload: {
                isLogin: true,
                username: response.username,
              },
            });
          },
        )
        .catch((error: any) => {
          console.log(error);
          this.setState({ loading: false });
          message.error('登录失败,用户名或密码错误');
        });
    } catch (errorInfo) {}
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button
          type="primary"
          size="small"
          onClick={this.showModal}
          style={
            this.props.display ? { display: 'inline' } : { display: 'none' }
          }
        >
          登录
        </Button>
        <Modal
          visible={visible}
          title={'登录'}
          onCancel={this.handleCancel}
          footer={null}
          width={300}
        >
          <Form
            name="login"
            initialValues={{ remember: true }}
            ref={this.formRef}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名/邮箱/手机' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名/邮箱/手机" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <div style={{ textAlign: 'right', margin: '0 5%' }}>
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.handleOk}
                >
                  登录
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(
  Login,
);
