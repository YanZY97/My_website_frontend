import React from 'react';
import styles from './about.less';
import { Typography, Divider, Col, Row } from 'antd';

import wechatQR from '../assets/imgs/wechatqr.png';
import alipayQR from '../assets/imgs/alipayqr.png';

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <>
      <div className={styles.index}>
        <Title>关于我</Title>
        <br />
        <Paragraph>
          某普通大学生
          <br />
          喜欢动手，喜欢编程，爱音乐，爱吉他
          <br />
          <br />
          我的github主页:
          <br />
          <Link href="https://github.com/YanZY97">
            https://github.com/YanZY97
          </Link>
          <br />
          请follow我
          <br />
        </Paragraph>
        <Divider />
        <Title>关于本站</Title>
        <br />
        <Paragraph>
          感谢访问本站
          <br />
          本网站完全由我个人进行开发和维护
          <br />
          部署于个人服务器
          <br />
          由花生壳提供内网穿透
          <br />
          本站源代码： <br />
          前端：{' '}
          <Link href="https://github.com/YanZY97/My_website_frontend">
            https://github.com/YanZY97/My_website_frontend
          </Link>
          <br />
          后端：{' '}
          <Link href="https://github.com/YanZY97/my_website_backend">
            https://github.com/YanZY97/my_website_backend
          </Link>
          <Text>（python是世界上最好的语言）</Text>
        </Paragraph>
        <Paragraph>
          我会持续维护本站并添加更多内容
          <br />
        </Paragraph>
        <Divider />
        <Title>赞助本站</Title>
        <br />
        <Paragraph>
          如果本网站对你有所帮助，欢迎赞助支持
          <br />
          赞赏之款项用于补充本人大脑和维护服务器
        </Paragraph>
        <h2>赞助方式：</h2>
        <Row style={{ padding: '32px 0' }}>
          <Col span={6} offset={4} style={{ textAlign: 'center' }}>
            <img src={wechatQR} alt="" style={{ width: '75%' }} /> <br />
            <br />
            <Text style={{ color: '#16ac37' }}>微信扫一扫，向我赞赏</Text>
          </Col>
          <Col span={6} offset={4}>
            <img src={alipayQR} alt="" style={{ width: '75%' }} /> <br />
            <br />
            <Text style={{ color: '#3d51ff' }}>支付宝扫一扫，向我赞赏</Text>
          </Col>
        </Row>
      </div>
    </>
  );
};
