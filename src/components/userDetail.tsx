import React from 'react';
import { connect, UserModelState, Dispatch, history, request } from 'umi';
import { FormInstance } from 'antd/lib/form';
import { MailOutlined } from '@ant-design/icons';
import {
  message,
  Modal,
  Form,
  Col,
  Row,
  Button,
  Input,
  DatePicker,
  Upload,
  Avatar,
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(
  img: Blob,
  callback: (arg0: string | ArrayBuffer | null) => any,
) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}

interface isProps extends ConnectProps {
  user: UserModelState;
}

interface isState {
  username: string;
  access: string;
  loading: boolean;
  avatarLoading: boolean;
  visibleChangeSignature: boolean;
  visibleChangeEmail: boolean;
  visibleChangeMobile: boolean;
  visibleChangeBirthday: boolean;
  visibleChangeWebsite: boolean;
  visibleChangeAvatar: boolean;
  disableSendCaptcha: boolean;
  cooldown: number;
  avatarUrl: any;

  signature: string;
  email: string;
  mobile: number;
  birthday: string;
  website: string;
  avatar: string;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

class UserDetail extends React.Component<isProps, isState> {
  constructor(props: isProps) {
    super(props);
    this.state = {
      loading: false,
      avatarLoading: false,
      visibleChangeSignature: false,
      visibleChangeEmail: false,
      visibleChangeMobile: false,
      visibleChangeBirthday: false,
      visibleChangeWebsite: false,
      visibleChangeAvatar: false,
      username: '',
      access: '',
      disableSendCaptcha: false,
      cooldown: 60,
      avatarUrl: '',

      signature: '',
      email: '',
      mobile: 0,
      birthday: '',
      website: '',
      avatar: '',
    };
  }

  formRefSignature = React.createRef<FormInstance>();
  formRefEmail = React.createRef<FormInstance>();
  formRefMobile = React.createRef<FormInstance>();
  formRefBirthday = React.createRef<FormInstance>();
  formRefWebsite = React.createRef<FormInstance>();
  formRefAvatar = React.createRef<FormInstance>();

  componentDidMount() {
    this.refreshUserInfo();
  }

  sendCaptcha = async () => {
    // const value = this.formRef.current?.getFieldValue('email');
    const value = await this.formRefEmail.current?.validateFields(['email']);
    const data = { email: value, flag: 'reset' };
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

  refreshUserInfo = async () => {
    const username =
      localStorage.getItem('username') || sessionStorage.getItem('username');
    const access =
      localStorage.getItem('access') || sessionStorage.getItem('access');
    if (username && access) {
      await this.setState({
        username: username,
        access: 'Bearer ' + access,
      });
      this.refreshUserDetail();
    } else {
      history.push('login');
      return;
    }
  };

  refreshUserDetail = async () => {
    await request('/api/user/getuserdetail/', {
      method: 'get',
      headers: {
        Authorization: this.state.access,
      },
    })
      .then(response => {
        this.setState({
          signature: response.signature,
          email: response.email,
          birthday: response.birthday,
          mobile: response.mobile,
          website: response.website,
          avatar: response.avatar,
        });
      })
      .catch(response => {
        message.error(response);
      });
  };

  showModalChangeSignature = () => {
    this.setState({
      visibleChangeSignature: true,
    });
  };

  showModalChangeEmail = () => {
    this.setState({
      visibleChangeEmail: true,
    });
  };

  showModalChangeMobile = () => {
    this.setState({
      visibleChangeMobile: true,
    });
  };

  showModalChangeBirthday = () => {
    this.setState({
      visibleChangeBirthday: true,
    });
  };

  showModalChangeWebsite = () => {
    this.setState({
      visibleChangeWebsite: true,
    });
  };

  showModalChangeAvatar = () => {
    this.setState({
      visibleChangeAvatar: true,
    });
  };

  handleChangeEmail = async () => {
    this.setState({
      loading: true,
    });
    let value = await this.formRefEmail.current?.validateFields();
    await request('/api/user/resetemail/', {
      method: 'post',
      data: value,
      headers: {
        Authorization: this.state.access,
      },
    })
      .then(response => {
        this.setState({ loading: false, visibleChangeEmail: false });
        message.destroy();
        message.success(response);
        this.refreshUserDetail();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        message.destroy();
        message.error(error.data);
      });
  };

  onClose = () => {
    this.setState({
      loading: false,
      visibleChangeSignature: false,
      visibleChangeEmail: false,
      visibleChangeMobile: false,
      visibleChangeBirthday: false,
      visibleChangeWebsite: false,
      visibleChangeAvatar: false,
    });
  };

  handleChangeSignature = async () => {
    this.setState({
      loading: true,
    });
    let value = await this.formRefSignature.current?.validateFields();
    await request('/api/user/resetsignature/', {
      method: 'post',
      data: value,
      headers: {
        Authorization: this.state.access,
      },
    })
      .then(response => {
        this.setState({ loading: false, visibleChangeSignature: false });
        message.destroy();
        message.success(response);
        this.refreshUserDetail();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        message.destroy();
        message.error(error.data);
      });
  };

  handleChangeMobile = async () => {
    this.setState({
      loading: true,
    });
    let value = await this.formRefMobile.current?.validateFields();
    await request('/api/user/resetmobile/', {
      method: 'post',
      data: value,
      headers: {
        Authorization: this.state.access,
      },
    })
      .then(response => {
        this.setState({ loading: false, visibleChangeMobile: false });
        message.destroy();
        message.success(response);
        this.refreshUserDetail();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        message.destroy();
        message.error(error.data);
      });
  };

  handleChangeBirthday = async () => {
    this.setState({
      loading: true,
    });
    let value = await this.formRefBirthday.current?.validateFields();
    await request('/api/user/resetbirthday/', {
      method: 'post',
      data: value,
      headers: {
        Authorization: this.state.access,
      },
    })
      .then(response => {
        this.setState({ loading: false, visibleChangeBirthday: false });
        message.destroy();
        message.success(response);
        this.refreshUserDetail();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        message.destroy();
        message.error(error.data);
      });
  };

  handleChangeWebsite = async () => {
    this.setState({
      loading: true,
    });
    let value = await this.formRefWebsite.current?.validateFields();
    await request('/api/user/resetwebsite/', {
      method: 'post',
      data: value,
      headers: {
        Authorization: this.state.access,
      },
    })
      .then(response => {
        this.setState({ loading: false, visibleChangeWebsite: false });
        message.destroy();
        message.success(response);
        this.refreshUserDetail();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        message.destroy();
        message.error(error.data);
      });
  };

  handleChangeAvatar = async () => {
    this.setState({
      loading: true,
    });
    let value = await this.formRefAvatar.current?.validateFields();
    (value as any).avatar = this.state.avatarUrl;
    await request('/api/user/uploadavatar/', {
      method: 'post',
      data: value,
      headers: {
        Authorization: this.state.access,
      },
    })
      .then(response => {
        this.setState({ loading: false, visibleChangeAvatar: false });
        message.destroy();
        message.success(response);
        this.refreshUserDetail();
        location.reload();
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        message.destroy();
        message.error(error.data);
      });
  };

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
      console.log(info.file);
      getBase64(info.file.originFileObj, avatarUrl =>
        this.setState({
          avatarUrl,
          avatarLoading: false,
        }),
      );
    }
  };

  render() {
    const { loading, avatarUrl } = this.state;
    const modalChangeEmail = [
      <Modal
        title="修改电子邮件地址"
        visible={this.state.visibleChangeEmail}
        onCancel={this.onClose}
        footer={null}
      >
        <Form {...layout} ref={this.formRefEmail}>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { type: 'email', required: true, message: '请输入新的邮箱地址' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="请输入新的邮箱地址" />
          </Form.Item>
          <Form.Item label="验证码" extra="验证码10分钟内有效">
            <Row gutter={8}>
              <Col span={15}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
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
        </Form>
        <Form.Item>
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleChangeEmail}
              style={{ width: '50%' }}
            >
              确定
            </Button>
          </div>
        </Form.Item>
      </Modal>,
    ];
    const modalChangeSignature = [
      <Modal
        title="修改个人简介"
        visible={this.state.visibleChangeSignature}
        onCancel={this.onClose}
        footer={null}
      >
        <Form {...layout} ref={this.formRefSignature}>
          <Form.Item
            name="signature"
            label="个人简介"
            rules={[{ required: true, message: '请输入新的个人简介' }]}
          >
            <Input placeholder="请输入新的个人简介" />
          </Form.Item>
        </Form>
        <Form.Item>
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleChangeSignature}
              style={{ width: '50%' }}
            >
              确定
            </Button>
          </div>
        </Form.Item>
      </Modal>,
    ];
    const modalChangeMobile = [
      <Modal
        title="修改手机号"
        visible={this.state.visibleChangeMobile}
        onCancel={this.onClose}
        footer={null}
      >
        <Form {...layout} ref={this.formRefMobile}>
          <Form.Item
            name="mobile"
            label="手机"
            rules={[{ required: true, message: '请输入新的手机号' }]}
          >
            <Input placeholder="请输入新的手机号" />
          </Form.Item>
        </Form>
        <Form.Item>
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleChangeMobile}
              style={{ width: '50%' }}
            >
              确定
            </Button>
          </div>
        </Form.Item>
      </Modal>,
    ];
    const modalChangeBirthDay = [
      <Modal
        title="修改生日"
        visible={this.state.visibleChangeBirthday}
        onCancel={this.onClose}
        footer={null}
      >
        <Form {...layout} ref={this.formRefBirthday}>
          <Form.Item
            name="birthday"
            label="选择日期"
            rules={[{ required: false }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </Form>
        <Form.Item>
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleChangeBirthday}
              style={{ width: '50%' }}
            >
              确定
            </Button>
          </div>
        </Form.Item>
      </Modal>,
    ];
    const modalChangeWebsite = [
      <Modal
        title="修改个人主页"
        visible={this.state.visibleChangeWebsite}
        onCancel={this.onClose}
        footer={null}
      >
        <Form {...layout} ref={this.formRefWebsite}>
          <Form.Item
            name="website"
            label="个人主页"
            rules={[{ required: true, message: '请输入个人主页地址' }]}
          >
            <Input placeholder="请输入个人主页地址" />
          </Form.Item>
        </Form>
        <Form.Item>
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleChangeWebsite}
              style={{ width: '50%' }}
            >
              确定
            </Button>
          </div>
        </Form.Item>
      </Modal>,
    ];
    const uploadButton = [
      <div>
        {this.state.avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>,
    ];
    const modalChangeAvatar = [
      <Modal
        title="修改头像"
        visible={this.state.visibleChangeAvatar}
        onCancel={this.onClose}
        footer={null}
      >
        <Form {...layout} ref={this.formRefAvatar}>
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
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>
        <Form.Item>
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleChangeAvatar}
              style={{ width: '50%' }}
            >
              确定
            </Button>
          </div>
        </Form.Item>
      </Modal>,
    ];

    return (
      <>
        <div style={{ padding: '56px 80px' }}>
          <Row>
            <Col span={14}>
              <h2 style={{ margin: '0 0 64px 32px' }}>基本信息</h2>
              <Row gutter={[16, 24]}>
                <Col span={3} offset={2} style={{ textAlign: 'right' }}>
                  个人简介:
                </Col>
                <Col span={11} offset={1}>
                  {this.state.signature}
                </Col>
                <Col span={7}>
                  <a onClick={this.showModalChangeSignature}>修改</a>
                </Col>

                <Col span={3} offset={2} style={{ textAlign: 'right' }}>
                  邮箱:
                </Col>
                <Col span={11} offset={1}>
                  {this.state.email}
                </Col>
                <Col span={7}>
                  <a onClick={this.showModalChangeEmail}>修改</a>
                </Col>

                <Col span={3} offset={2} style={{ textAlign: 'right' }}>
                  手机:
                </Col>
                <Col span={11} offset={1}>
                  {this.state.mobile}
                </Col>
                <Col span={7}>
                  <a onClick={this.showModalChangeMobile}>修改</a>
                </Col>

                <Col span={3} offset={2} style={{ textAlign: 'right' }}>
                  生日:
                </Col>
                <Col span={11} offset={1}>
                  {this.state.birthday}
                </Col>
                <Col span={7}>
                  <a onClick={this.showModalChangeBirthday}>修改</a>
                </Col>

                <Col span={3} offset={2} style={{ textAlign: 'right' }}>
                  个人主页:
                </Col>
                <Col span={11} offset={1}>
                  <a href={'http://' + this.state.website}>
                    {this.state.website}
                  </a>
                </Col>
                <Col span={7}>
                  <a onClick={this.showModalChangeWebsite}>修改</a>
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <h2 style={{ marginBottom: '32px' }}>头像</h2>
              <div style={{ textAlign: 'center' }}>
                <Avatar
                  size={240}
                  style={{ margin: '0 auto 80px' }}
                  src={this.state.avatar + '?ran=' + Math.random()}
                />
                <br />
                <Button
                  type="default"
                  style={{ width: '40%' }}
                  onClick={this.showModalChangeAvatar}
                >
                  修改头像
                </Button>
              </div>
            </Col>
          </Row>
          {modalChangeEmail}
          {modalChangeMobile}
          {modalChangeBirthDay}
          {modalChangeWebsite}
          {modalChangeAvatar}
          {modalChangeSignature}
        </div>
      </>
    );
  }
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(
  UserDetail,
);
