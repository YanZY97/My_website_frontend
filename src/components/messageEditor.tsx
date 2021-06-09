import React from 'react';
import { connect, UserModelState, Dispatch } from 'umi';
import {
  Comment,
  Avatar,
  Form,
  Button,
  Input,
  message,
  Upload,
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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
  previewVisible: boolean;
  previewImage: any;
  previewTitle: any;
  fileList: any;
  imgList: any;
}

function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

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
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      imgList: [],
    };
  }

  handleSubmit = () => {
    if (!this.state.value && this.state.fileList.length === 0) {
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
        images: this.state.imgList,
      },
    })
      .then(response => {
        message.destroy();
        message.success('发布成功');
        this.setState({
          submitting: false,
          value: '',
          fileList: [],
          imgList: [],
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

  handleChangeText = (e: any) => {
    this.setState({
      value: e.target.value,
    });
  };

  HandleRefresh = async (onFinish: () => void) => {
    await onFinish();
  };

  handleChange = async ({ fileList }: any) => {
    const _fileList: { name: any; imageb64: unknown }[] = [];
    await fileList.forEach(async (element: any) => {
      const imageb64 = await getBase64(element.originFileObj);
      _fileList.push({ name: element.name, imageb64: imageb64 });
    });
    this.setState({ fileList, imgList: _fileList });
  };
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>选择图片</div>
      </div>
    );

    return (
      <>
        <div style={{ padding: '2em 4em', backgroundColor: 'white' }}>
          <h1>发表留言</h1>
          <Comment
            avatar={<Avatar size={'default'} src={this.props.user.avatar} />}
            content={
              <>
                <Form.Item>
                  <TextArea
                    rows={4}
                    onChange={this.handleChangeText}
                    value={this.state.value}
                  />
                </Form.Item>
                {this.props.user.username ? (
                  <Form.Item>
                    <Upload
                      name="avatar"
                      action="/api/tools/uploadaction/"
                      listType="picture-card"
                      style={{ height: '128px' }}
                      fileList={this.state.fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {this.state.fileList.length >= 3 ? null : uploadButton}
                    </Upload>
                    <Modal
                      visible={this.state.previewVisible}
                      title={this.state.previewTitle}
                      footer={null}
                      onCancel={this.handleCancel}
                    >
                      <img
                        alt="example"
                        style={{ width: '100%' }}
                        src={this.state.previewImage}
                      />
                    </Modal>
                  </Form.Item>
                ) : null}
                <Form.Item>
                  <Button
                    htmlType="submit"
                    loading={this.state.submitting}
                    onClick={this.handleSubmit}
                    type="primary"
                  >
                    添加评论
                  </Button>
                </Form.Item>
              </>
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
