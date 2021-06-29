import React from 'react';
import { UserDetail, Headers } from '@/components/components';
import { Col, Row } from 'antd';
import styles from './index.less'

class UserCenter extends React.Component<any, any> {
  render() {
    return (
      <>
        <Headers location={'/'} />
        <Row style={{ paddingTop: '48px', height: '100%' }}>
          <Col
            span={20}
            offset={2}
            className={styles.backboard}
          >
            <UserDetail />
          </Col>
        </Row>
      </>
    );
  }
}

export default UserCenter;
