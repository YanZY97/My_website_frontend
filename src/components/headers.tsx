import React from 'react';
import styles from '../layouts/index.less';
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
import { Menu, Avatar, Layout, Typography } from 'antd';
import { User } from '@/components/components';
import { Link } from 'umi';

const { Text } = Typography;

interface Props {
  location: any;
  signal: string;
}

class Headers extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { Header } = Layout;
    const pathname = this.props.location.pathname;

    return (
      <Header className={styles.header} key="1">
        <Link to="/home">
          <div className={styles.logo}>
            <img src={logoImg} style={{ height: '30px', marginTop: '-4px' }} />
            <span style={{ display: 'inline-block' }}>
              <Text>&nbsp;Violety.cn</Text>
            </span>
          </div>
        </Link>
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
          style={{
            lineHeight: '48px',
            marginBottom: '0px',
          }}
        >
          <Menu.Item key="/home">
            <Link to="/home">
              <HomeTwoTone />
              &nbsp;首页
            </Link>
          </Menu.Item>
          <Menu.Item key="/blog">
            <Link to="/blog">
              <FileTextTwoTone />
              &nbsp;文章
            </Link>
          </Menu.Item>
          <Menu.Item key="/lab">
            <Link to="/lab">
              <ExperimentTwoTone />
              &nbsp;实验室
            </Link>
          </Menu.Item>
          <Menu.Item key="/message">
            <Link to="/message">
              <MessageTwoTone />
              &nbsp;留言板
            </Link>
          </Menu.Item>
          <Menu.Item key="/partner">
            <Link to="/partner">
              <HeartTwoTone />
              &nbsp;伙伴
            </Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">
              <IdcardTwoTone />
              &nbsp;关于我
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Headers;
