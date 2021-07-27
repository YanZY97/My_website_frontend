import React from 'react';
import { Card, Typography, Modal, Row, Col } from 'antd';
import { history } from 'umi';
import { ChatClient } from '@/components/components'
const { Meta } = Card;
import QueueAnim from 'rc-queue-anim';
import { useState } from 'react';

export default () => {
  const [ran, setRan] = useState(0);
  const [isChatClientVisible, setIsChatClientVisible] = useState(false);
  const showChatClient = () => {
    setIsChatClientVisible(true);
  };
  const handleCancel = () => {
    setIsChatClientVisible(false);
  };


  return (
    <>
      <Row gutter={[48, 48]}>
        <Col span={6}>
          <QueueAnim>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              onClick={() => {
                history.push('lab/wasm');
              }}
              key={1}
            >
              <Meta
                title="WASM测试"
                description="编译C/C++代码在web上运行，可以和js共存"
              />
            </Card>
          </QueueAnim>
        </Col>
        <Col span={6}>
          <QueueAnim>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              onClick={showChatClient}
              key={2}
            >
              <Meta
                title="EchoChat"
                description="Simple chat robot"
              />
            </Card>
          </QueueAnim>
        </Col>
      </Row>
      
      <Card
        hoverable
        style={{ width: '50%', marginTop: '32px' }}
        onClick={() => {
          setRan(Math.random());
        }}
        key={1}
      >
        <Typography.Title level={5}>
          *由于本站没有广告，所以这里是猫猫图
        </Typography.Title>
        <img
          src={'https://thiscatdoesnotexist.com/' + '?ran=' + ran}
          alt=""
          style={{ width: '100%' }}
        />
        <p style={{ fontSize: 'small' }}>(this cat does not exist)</p>
        <a href="https://thesecatsdonotexist.com/">more！</a>
      </Card>
      <Modal bodyStyle={{ padding: 0, backgroundColor: '#fff0', width: '200px' }} width={400} visible={isChatClientVisible} onCancel={handleCancel} footer={null} closable={false}>
        <ChatClient/>
      </Modal>
    </>
  );
};
