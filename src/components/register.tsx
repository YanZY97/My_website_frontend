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
  DatePicker,
} from 'antd';
import { FormInstance } from 'antd/lib/form';
import request from 'umi-request';

interface isProps {
  display?: boolean;
}

interface isState {
  loading: boolean;
  visible: boolean;
  disableSendCaptcha: boolean;
  cooldown: number;
}

class Register extends React.Component<isProps, isState> {
  static defaultProps = {
    display: true,
  };

  constructor(props: isProps) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      disableSendCaptcha: false,
      cooldown: 60,
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

  showAgreement = () => {
    Modal.info({
      title: '注册须知',
      content: <div>1</div>,
      onOk() {},
    });
  };

  sendCaptcha = async () => {
    const value = this.formRef.current?.getFieldValue('email');
    const data = { email: value };
    await request
      .post('/api/user/send_captcha/', {
        data: data,
      })
      .then(response => {
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
        message.warning(error.data);
      });
  };

  handleOk = async () => {
    try {
      const value = await this.formRef.current?.validateFields();
      console.log(value);
      this.setState({ loading: true });
      await request
        .post('/api/user/register/', {
          data: value,
        })
        .then(response => {
          this.setState({ loading: false, visible: false });
          message.success(response);
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
          message.error(error.data);
        });
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };

  render() {
    const { visible, loading } = this.state;
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

    return (
      <>
        <Button
          type="default"
          size="small"
          onClick={this.showModal}
          style={
            this.props.display ? { display: 'inline' } : { display: 'none' }
          }
        >
          注册
        </Button>
        <Modal
          visible={visible}
          title={'注册（' + '*' + '为必填项）'}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          footer={null}
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
                  message: 'Please confirm your password!',
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
              <Input.Password placeholder="请再次输入密码" />
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
            <Form.Item name="mobile" label="手机" rules={[{ required: false }]}>
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
            </Form.Item>
            <Form.Item label="验证码" extra="验证码将发送到您的邮箱,10分钟有效">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: '请在邮箱接收验证码' }]}
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
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default Register;
