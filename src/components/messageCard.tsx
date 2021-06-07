import React from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface Props {
  data: {
    id: number;
    author: string;
    content: string;
    time: string;
  };
}

class MessageCard extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    const author = data.author == '' ? '游客' : data.author;
    const avatar =
      data.author == '' ? (
        <Avatar size="default" icon={<UserOutlined />} />
      ) : (
        <Avatar
          size="default"
          src={'/api/media/avatars/' + data.author + '/avatar.png'}
        />
      );
    return (
      <>
        <Comment
          author={<p style={{ fontSize: '16px' }}>{author}</p>}
          avatar={avatar}
          content={<p style={{ fontSize: '16px' }}>{data.content}</p>}
          datetime={
            <Tooltip title={data.time}>
              {/* <span>{moment().fromNow()}</span> */}
              <p style={{ fontSize: '15px' }}>{data.time}</p>
            </Tooltip>
          }
          style={{ marginBottom: '8px' }}
        />
      </>
    );
  }
}

export default MessageCard;
