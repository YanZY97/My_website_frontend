import React from 'react';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import style from './styles/uploadAvatar.less';

interface isState {
  loading: boolean;
  imageUrl: any;
}

function getBase64(
  img: Blob,
  callback: (arg0: string | ArrayBuffer | null) => any,
) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class UploadAvatar extends React.Component<any, isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: '',
    };
  }

  beforeUpload = (file: { type: string; size: number }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.destroy();
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.destroy();
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <>
        <Upload
          name="avatar"
          listType="picture-card"
          className={style.avatar}
          showUploadList={false}
          action="/api/user/upload_avatar/"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </>
    );
  }
}

export default UploadAvatar;
