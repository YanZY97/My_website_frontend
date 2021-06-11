import React from 'react';
import { Comment, Tooltip, Avatar, Popover, Row, Col, Image } from 'antd';
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
    pictures: any;
  };
}

interface States {
  picList: any;
}

class MessageCard extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      picList: [],
    };
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

    const commentContent = (
      <>
        <p style={{ fontSize: '16px' }}>{data.content}</p>
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Image.PreviewGroup>
            {this.props.data.pictures.map((item: string | undefined) => {
              return (
                <Col span={8}>
                  <Image src={item} />
                </Col>
              );
            })}
          </Image.PreviewGroup>
        </Row>
      </>
    );
    return (
      <>
        <Comment
          author={<p style={{ fontSize: '16px' }}>{author}</p>}
          avatar={avatar}
          content={commentContent}
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
