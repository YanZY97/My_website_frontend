import React from 'react';
import { Card } from 'antd';
import { history } from 'umi';

const { Meta } = Card;
import QueueAnim from 'rc-queue-anim';

export default () => {
  return (
    <>
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
    </>
  );
};
