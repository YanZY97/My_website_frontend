import React from 'react';
import { Typography, Image, Col, Row } from 'antd';

interface Props {
  user: string;
  signature: string;
  avatar: string;
}

class UserPopover extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        <Row>
          <Col span={10}>
            <Image
              src={this.props.avatar}
              style={{ height: '80px', width: '80px', display: 'inline-block' }}
            />
          </Col>
          <Col span={14}>
            <Typography.Title level={4} style={{ fontWeight: 'bold' }}>{this.props.user}</Typography.Title>
            <p style={{ color: '#949494' }}>{this.props.signature}</p>
          </Col>
        </Row>
      </>
    );
  }
}

export default UserPopover;
