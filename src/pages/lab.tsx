import React from 'react';
import { Card } from 'antd';
import { history } from 'umi';

const { Meta } = Card;
import QueueAnim from 'rc-queue-anim';
import { useState } from 'react';

export default () => {
  const [ran, setRan] = useState(0);

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
      <Card
        hoverable
        style={{ width: '50%', marginTop: '32px' }}
        onClick={() => {
          setRan(Math.random());
        }}
        key={1}
      >
        <h3>*由于本站没有广告，所以这里是猫猫图</h3>
        <img
          src={'https://thiscatdoesnotexist.com/' + '?ran=' + ran}
          alt=""
          style={{ width: '100%' }}
        />
        <p style={{ fontSize: 'small' }}>(this cat does not exist)</p>
      </Card>
    </>
  );
};
