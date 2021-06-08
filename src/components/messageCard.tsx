import React from 'react';
import { Comment, Tooltip, Avatar, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserPopover } from './candies/components';

interface Props {
  data: {
    id: number;
    author: string;
    signature: string;
    avatar: string;
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
    const content = (
      <div style={{ width: '240px' }}>
        <UserPopover
          user={data.author}
          avatar={data.avatar}
          signature={data.signature}
        />
      </div>
    );
    const avatar =
      data.author == '' ? (
        <Avatar size="default" icon={<UserOutlined />} />
      ) : (
        <Popover content={content} placement="topLeft" trigger="click">
          <Avatar size="default" src={data.avatar} />
        </Popover>
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
