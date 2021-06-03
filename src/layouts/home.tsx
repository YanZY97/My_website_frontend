import React from 'react';
import styles from './home.less';
import { Link } from 'umi';
import { Button, Avatar } from 'antd';
import {
  FileTextOutlined,
  ExperimentOutlined,
  MessageOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import logoImg from '../assets/imgs/homelogo.png';
import heartImg from '../assets/imgs/heart.png';

import QueueAnim from 'rc-queue-anim';

export default () => {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.center}>
          <QueueAnim type={['right', 'left']} className="demo-content">
            <QueueAnim
              type={['right', 'left']}
              key="head"
              className="demo-content"
              duration={1800}
            >
              <div className={styles.logo}>
                <QueueAnim
                  type={['right', 'left']}
                  className="demo-content"
                  duration={1800}
                >
                  <Avatar src={logoImg} size={240} key={'avatar'} />
                </QueueAnim>
                <div style={{ margin: '60px 0 0' }}>
                  <QueueAnim key="page" type="bottom" duration={1800}>
                    <h2 key={1}>
                      Stay young &nbsp;&nbsp;&nbsp;&nbsp; Stay simple
                    </h2>
                    <h2 key={2}>个人日志和技术分享</h2>
                  </QueueAnim>
                </div>
              </div>
            </QueueAnim>
            <QueueAnim type="bottom" key="btn" duration={2000}>
              <div key="1" style={{ width: '100%', marginBottom: '100px' }}>
                {/* <QueueAnim type="bottom" key="btn" duration={1000} delay={1000} leaveReverse={true}> */}
                <div style={{ display: 'inline-block' }} key="0">
                  <Link style={{ margin: '0 16px' }} to="blog">
                    <Button
                      className={styles.button}
                      type="default"
                      size="large"
                      shape="round"
                      icon={<FileTextOutlined />}
                    >
                      文章
                    </Button>
                  </Link>
                </div>
                <div style={{ display: 'inline-block' }} key="1">
                  <Link style={{ margin: '0 16px' }} to="lab">
                    <Button
                      className={styles.button}
                      type="default"
                      size="large"
                      shape="round"
                      icon={<ExperimentOutlined />}
                    >
                      实验室
                    </Button>
                  </Link>
                </div>
                <div style={{ display: 'inline-block' }} key="2">
                  <Link style={{ margin: '0 16px' }} to="message">
                    <Button
                      className={styles.button}
                      type="default"
                      size="large"
                      shape="round"
                      icon={<MessageOutlined />}
                    >
                      留言
                    </Button>
                  </Link>
                </div>
                <div style={{ display: 'inline-block' }} key="3">
                  <Link style={{ margin: '0 16px' }} to="about">
                    <Button
                      className={styles.button}
                      type="default"
                      size="large"
                      shape="round"
                      icon={<IdcardOutlined />}
                    >
                      关于我
                    </Button>
                  </Link>
                </div>
                {/* </QueueAnim> */}
              </div>
            </QueueAnim>
          </QueueAnim>
        </div>
        <div className={styles.footer}>
          Made with <img src={heartImg} style={{ height: '20px' }} /> by Y{' '}
        </div>
      </div>
    </>
  );
};
