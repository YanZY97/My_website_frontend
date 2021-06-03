import React from 'react';
import styles from '../layouts/index.less';
import theme from '../../config/theme';
import logoImg from '../assets/imgs/logo.png';
import githubImg from '../assets/imgs/github.png';
import {
  HomeTwoTone,
  FileTextTwoTone,
  ExperimentTwoTone,
  MessageTwoTone,
  HeartTwoTone,
  IdcardTwoTone,
} from '@ant-design/icons';
import { Menu, Avatar, Layout } from 'antd';
import { User } from '@/components/components';
import { Link, request } from 'umi';
import QueueAnim from 'rc-queue-anim';

interface Props {
  location: any;
}

class Headers extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const pathname = this.props.location.pathname;

    return (
      <Header className={styles.header} key="1">
        <div className={styles.logo}>
          <img src={logoImg} style={{ height: '30px' }} /> title
        </div>
        <div className={styles.user}>
          <User />
          <a
            href="https://github.com/YanZY97/My_website_frontend"
            target="_blank"
          >
            <Avatar
              size={28}
              src={githubImg}
              className={styles.githubLink}
            ></Avatar>
          </a>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={pathname}
          style={{ lineHeight: '48px' }}
        >
          <Menu.Item key="/home">
            <Link to="/home">
              <HomeTwoTone twoToneColor={theme['@primary-color']} />
              首页
            </Link>
          </Menu.Item>
          <Menu.Item key="/blog">
            <Link to="/blog">
              <FileTextTwoTone twoToneColor={theme['@primary-color']} />
              文章
            </Link>
          </Menu.Item>
          <Menu.Item key="/lab">
            <Link to="/lab">
              <ExperimentTwoTone twoToneColor={theme['@primary-color']} />
              实验室
            </Link>
          </Menu.Item>
          <Menu.Item key="/message">
            <Link to="/message">
              <MessageTwoTone twoToneColor={theme['@primary-color']} />
              留言板
            </Link>
          </Menu.Item>
          <Menu.Item key="/partner">
            <Link to="/partner">
              <HeartTwoTone twoToneColor={theme['@primary-color']} />
              伙伴
            </Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">
              <IdcardTwoTone twoToneColor={theme['@primary-color']} />
              关于我
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Headers;
