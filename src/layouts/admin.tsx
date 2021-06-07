import React from 'react';
import styles from '../layouts/index.less';
import theme from '../../config/theme';
import logoImg from '../assets/imgs/logo.png';
import githubImg from '../assets/imgs/github.png';
import { HomeTwoTone, ToolTwoTone, SettingTwoTone } from '@ant-design/icons';
import { Menu, Avatar, Layout, Row, Col, message } from 'antd';
import { User } from '@/components/components';
import { Link, request, history } from 'umi';

import heartImg from '../assets/imgs/heart.png';

interface headerProps {
  location: any;
}

class Headers extends React.Component<headerProps, any> {
  constructor(props: headerProps) {
    super(props);
  }

  componentDidMount() {
    request('/api/user/permission_check/', {
      method: 'get',
      headers: {
        Authorization:
          'Bearer ' +
          (localStorage.getItem('access') || sessionStorage.getItem('access')),
      },
    })
      .then(request => {
        console.log(request);
      })
      .catch(request => {
        message.destroy();
        message.error('请以管理员身份登录');
        history.push('/stuffLogin');
      });
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const pathname = this.props.location.pathname;

    return (
      <Header className={styles.header}>
        <div className={styles.logo}>
          <img src={logoImg} style={{ height: '30px', marginTop: '-4px' }} />{' '}
          Violety.cn
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
              返回主站
            </Link>
          </Menu.Item>
          <Menu.Item key="/admin/home">
            <Link to="/admin/home">
              <SettingTwoTone twoToneColor={theme['@primary-color']} />
              后台主页
            </Link>
          </Menu.Item>
          <Menu.Item key="/admin/manage">
            <Link to="/admin/manage">
              <ToolTwoTone twoToneColor={theme['@primary-color']} />
              数据管理
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

interface Props {
  location: any;
  children: React.ReactNode;
}

interface isState {}

class BasicLayout extends React.Component<Props, isState> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.refreshAccess();
  }

  refreshAccess() {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      request('/api/user/refresh/', {
        method: 'post',
        data: {
          refresh: refresh,
        },
      })
        .then(response => {
          localStorage.setItem('access', response.access);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  }

  render() {
    const { Content, Footer } = Layout;

    return (
      <Layout style={{ backgroundColor: '#00000000' }}>
        <Headers location={location} />
        <Content>
          {/* <Row> */}
          {/* <Col span={22} offset={2} style={{ backgroundColor: 'white' }}> */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '128px 15%',
              minHeight: '1000px',
            }}
          >
            {this.props.children}
          </div>
          {/* </Col> */}
          {/* </Row> */}
        </Content>
        <Footer className={styles.footer}>
          <p>2021 </p>
          <div className={styles.divider}></div>
          <p>
            Made with <img src={heartImg} style={{ height: '20px' }} /> by Y{' '}
          </p>
        </Footer>
      </Layout>
    );
  }
}

export default BasicLayout;
