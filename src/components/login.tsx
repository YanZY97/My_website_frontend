import React from 'react';
import { Button, Modal, Form, Checkbox, Input, message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import request from 'umi-request';

interface isState {
  loading: boolean;
  visible: boolean;
}

class Login extends React.Component<any, isState> {
  constructor(props: any) {
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
      this.setState({ loading: true });
      await request
        .post('/api/user/login/', {
          data: value,
        })
        .then(response => {
          this.setState({ loading: false, visible: false });
          message.success('登录成功');
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
          message.error('登录失败,用户名或密码错误');
        });
    } catch (errorInfo) {
      console.log(errorInfo);
    }
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" size="small" onClick={this.showModal}>
          登录
        </Button>
        <Modal
          visible={visible}
          title="登录"
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
              &nbsp;&nbsp;
              <a href="">忘记密码</a>
            </Form.Item>
            <Form.Item style={{ margin: '0' }}>
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

export default Login;
