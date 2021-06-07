import React from 'react';
import { request, history } from 'umi';
import { Button, Form, Row, Col, Input, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MailOutlined } from '@ant-design/icons';

interface isState {
  loading: boolean;
  disableSendCaptcha: boolean;
  cooldown: number;
  showNext: boolean;
}

class ResetPassword extends React.Component<any, isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      disableSendCaptcha: false,
      cooldown: 60,
      showNext: false,
    };
  }

  formRef = React.createRef<FormInstance>();
  formRef2 = React.createRef<FormInstance>();

  sendCaptcha = async () => {
    // const value = this.formRef.current?.getFieldValue('email');
    const value = await this.formRef.current?.validateFields(['email']);
    const data = { email: value };
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

  handleNext = async () => {
    try {
      let value = await this.formRef.current?.validateFields();
      this.setState({ loading: true });
      await request('/api/user/evalcaptcha/', {
        method: 'post',
        data: value,
      })
        .then(response => {
          this.setState({ loading: false });
          message.destroy();
          message.success(response);
          this.setState({
            showNext: true,
          });
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

  handleResetPassword = async () => {
    let value = await this.formRef2.current?.validateFields();
    this.setState({ loading: true });
    await request('/api/user/resetpassword/', {
      method: 'post',
      data: value,
    })
      .then(response => {
        this.setState({ loading: false });
        message.destroy();
        message.success(response);
        history.push('login');
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        message.destroy();
        message.error(error.data);
      });
  };

  render() {
    const { loading } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    return (
      <>
        <div
          style={{
            width: '400px',
            padding: '56px 32px 16px',
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
            name="checkCaptcha"
            {...formItemLayout}
            ref={this.formRef}
            style={
              this.state.showNext ? { display: 'none' } : { display: 'inline' }
            }
          >
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ required: true, message: '请输入注册时填写的邮箱' }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="请输入注册时填写的邮箱"
              />
            </Form.Item>
            <Form.Item label="验证码" extra="验证码10分钟内有效">
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
            <Form.Item>
              <div style={{ textAlign: 'left', margin: '0' }}>
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.handleNext}
                  style={{ width: '100%' }}
                >
                  Next
                </Button>
              </div>
            </Form.Item>
          </Form>

          <Form
            name="resetPassword"
            ref={this.formRef2}
            {...formItemLayout}
            style={
              this.state.showNext ? { display: 'inline' } : { display: 'none' }
            }
          >
            {/* <Form.Item
            name="oldpassword"
            label="旧密码"
            rules={[{ required: true, message: '请输入旧密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item> */}
            <Form.Item
              name="newpassword"
              label="新密码"
              rules={[{ required: true, message: '请输入新密码' }]}
              hasFeedback
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="确认密码"
              dependencies={['newpassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newpassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不一致');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="请再次输入密码" />
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: 'left', margin: '0' }}>
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.handleResetPassword}
                  style={{ width: '100%' }}
                >
                  重置密码
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </>
    );
  }
}

export default ResetPassword;
