import React from 'react';
import { request, history, Link } from 'umi';
import { Button, Form, Checkbox, Input, message, Divider } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect, UserModelState, Dispatch } from 'umi';

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}

interface isProps extends ConnectProps {
  user: UserModelState;
  onlyAdmin?: boolean;
}

interface isState {
  loading: boolean;
}

class Login extends React.Component<isProps, isState> {
  static defaultProps = {
    onlyAdmin: false,
  };

  constructor(props: isProps) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  formRef = React.createRef<FormInstance>();

  handleOk = async () => {
    try {
      const value = await this.formRef.current?.validateFields();
      const remember = this.formRef.current?.getFieldValue('remember');
      const url = this.props.onlyAdmin
        ? '/api/user/adminlogin/'
        : '/api/user/login/';
      const redirectUrl = this.props.onlyAdmin ? '/admin' : '/';
      const { dispatch } = this.props;
      this.setState({ loading: true });
      await request(url, {
        method: 'post',
        data: value,
      })
        .then(
          (response: {
            username: string;
            refresh: string;
            access: string;
            id: number;
          }) => {
            this.setState({ loading: false });
            message.destroy();
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
                avatar: '/api/media/avatars/' + response.id + '/avatar.png',
              },
            });
            history.push(redirectUrl);
          },
        )
        .catch((error: any) => {
          console.log(error);
          this.setState({ loading: false });
          message.destroy();
          message.error('登录失败,用户名或密码错误');
        });
    } catch (errorInfo) {}
  };

  render() {
    const { loading } = this.state;
    const foot = this.props.onlyAdmin
      ? [
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a>
              <Link to="/reset-password">忘记密码？</Link>
            </a>
            <Divider type="vertical" />
            <a>
              <Link to="/"> 返回首页 </Link>
            </a>
          </div>,
        ]
      : [
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a>
              <Link to="/reset-password">忘记密码？</Link>
            </a>
            <Divider type="vertical" />
            <a>
              <Link to="/register"> 现在注册 </Link>
            </a>
            <Divider type="vertical" />
            <a>
              <Link to="/"> 返回首页 </Link>
            </a>
          </div>,
        ];

    return (
      <>
        <div
          style={{
            width: '350px',
            padding: '50px 28px 12px',
            backgroundColor: '#ffffffdd',
            border: '1px solid #c2c2c2',
            borderRadius: '8px',
            margin: '0 auto',
            position: 'relative',
            top: '36%',
            transform: 'translateY(-50%)',
          }}
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
                <Checkbox style={{ display: 'none' }}>记住我</Checkbox>
              </Form.Item>
              <div style={{ textAlign: 'left', margin: '0' }}>
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.handleOk}
                  style={{ width: '100%' }}
                >
                  登录
                </Button>
              </div>
            </Form.Item>
            {foot}
          </Form>
        </div>
      </>
    );
  }
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(
  Login,
);
