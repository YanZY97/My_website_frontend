import React from 'react';
import {
  Button,
  Modal,
  Form,
  Checkbox,
  Input,
  message,
  Row,
  Col,
  Upload,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import { request, history, Link } from 'umi';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { connect, UserModelState, Dispatch } from 'umi';

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}

function getBase64(
  img: Blob,
  callback: (arg0: string | ArrayBuffer | null) => any,
) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

interface isState {
  avatarLoading: boolean;
  avatarUrl: any;
  loading: boolean;
  disableSendCaptcha: boolean;
  cooldown: number;
}

class Register extends React.Component<ConnectProps, isState> {
  constructor(props: ConnectProps) {
    super(props);
    this.state = {
      avatarLoading: false,
      avatarUrl: '',
      loading: false,
      disableSendCaptcha: false,
      cooldown: 60,
    };
  }

  formRef = React.createRef<FormInstance>();

  beforeUpload = (file: { type: string; size: number }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.destroy();
      message.error('只能上传 JPG/PNG 格式文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.destroy();
      message.error('图片文件要小于 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ avatarLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, avatarUrl =>
        this.setState({
          avatarUrl,
          avatarLoading: false,
        }),
      );
    }
  };

  showAgreement = () => {
    Modal.info({
      title: '注册须知',
      content: <div></div>,
      onOk() {},
    });
  };

  sendCaptcha = async () => {
    const value = await this.formRef.current?.validateFields(['email']);
    const data = { email: value, flag: 'register' };
    await request('/api/user/send_captcha/', {
      method: 'post',
      data: data,
    })
      .then(response => {
        message.destroy();
        message.success(response);
        let cooldown = this.state.cooldown;
        this.setState({ cooldown: cooldown--, disableSendCaptcha: true });
        const timer = setInterval(() => {
          this.setState(
            { cooldown: cooldown--, disableSendCaptcha: true },
            () => {
              if (cooldown === 0) {
                clearInterval(timer);
                this.setState({ cooldown: 60, disableSendCaptcha: false });
              }
            },
          );
        }, 1000);
      })
      .catch(error => {
        console.log(error.data);
        message.destroy();
        message.warning(error.data);
      });
  };

  handleOk = async () => {
    try {
      let value = await this.formRef.current?.validateFields();
      (value as any).avatar = this.state.avatarUrl;
      this.setState({ loading: true });
      await request('/api/user/register/', {
        method: 'post',
        data: value,
      })
        .then(async response => {
          this.setState({ loading: false });
          message.destroy();
          message.success(response);
          await request('/api/user/login/', {
            method: 'post',
            data: value,
          }).then(
            (response: {
              username: string;
              refresh: string;
              access: string;
              id: number;
            }) => {
              const { dispatch } = this.props;
              this.setState({ loading: false });
              message.destroy();
              message.success('登录成功');
              localStorage.setItem('username', response.username);
              localStorage.setItem('refresh', response.refresh);
              localStorage.setItem('access', response.access);
              dispatch!({
                type: 'user/save',
                payload: {
                  isLogin: true,
                  username: response.username,
                  avatar: '/api/media/avatars/' + response.id + '/avatar.png',
                },
              });
              history.push('/');
            },
          );
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
          message.destroy();
          message.error(error.data);
        });
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };

  render() {
    const { loading, avatarLoading, avatarUrl } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 18,
          offset: 6,
        },
      },
    };
    const uploadButton = (
      <div>
        {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <>
        <div
          style={{
            width: '450px',
            padding: '50px 28px',
            backgroundColor: '#ffffffdd',
            border: '1px solid #c2c2c2',
            borderRadius: '8px',
            margin: '0 auto',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-55%)',
          }}
        >
          <Form
            {...formItemLayout}
            name="register"
            ref={this.formRef}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入用于登录和显示的名称" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
              hasFeedback
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认你的密码',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不一致');
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="请再次输入密码"
                visibilityToggle={false}
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: '邮箱地址不正确',
                },
                {
                  required: true,
                  message: '请输入邮箱地址',
                },
              ]}
            >
              <Input placeholder="请输入邮箱地址" />
            </Form.Item>
            {/* <Form.Item name="mobile" label="手机" rules={[{ required: false }]}>
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="website"
            label="网站"
            rules={[{ required: false }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthday"
            label="生日"
            rules={[{ required: false }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item> */}
            <Form.Item label="验证码" extra="验证码将发送到您的邮箱,10分钟有效">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: '请输入验证码' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button
                    disabled={this.state.disableSendCaptcha}
                    onClick={this.sendCaptcha}
                  >
                    {this.state.disableSendCaptcha
                      ? this.state.cooldown + '秒后重新发送'
                      : '发送验证码'}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              name="avatar"
              label="上传头像"
              extra="2MB内 JPG/PNG格式图片"
            >
              <Upload
                name="avatar"
                listType="picture-card"
                style={{ height: '128px', width: '128px' }}
                showUploadList={false}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
                action="/api/tools/uploadaction/"
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject('您需要同意注册须知'),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                我已经阅读并同意了
                <Button type="link" size="small" onClick={this.showAgreement}>
                  注册须知
                </Button>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={this.handleOk}
                style={{ width: '30%' }}
              >
                注册
              </Button>
              <Button type="link" style={{ width: '50%' }}>
                <Link to="/login">去登录</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(
  Register,
);
