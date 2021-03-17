import React from 'react';
import { Layout, Menu, Avatar, Col, Row, BackTop, Affix, message } from 'antd';
import {
  Contact,
  CalendarSpan,
  LikeMe,
  BulletinBoard,
  AdminTools,
  User,
} from '@/components/components';
import { Link, request } from 'umi';
import {
  HomeTwoTone,
  FileTextTwoTone,
  ExperimentTwoTone,
  MessageTwoTone,
  HeartTwoTone,
  IdcardTwoTone,
} from '@ant-design/icons';
import styles from './index.less';
import theme from '../../config/theme';

import heartImg from '../assets/imgs/heart.png';
import logoImg from '../assets/imgs/logo.png';
import githubImg from '../assets/imgs/github.png';

interface Props {
  location: any;
  children: React.ReactNode;
}

interface isState {
  count: number;
  visits: number;
  permission: boolean;
}

class BasicLayout extends React.Component<Props, isState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
      visits: 0,
      permission: false,
    };
  }

  componentDidMount() {
    this.getLikes();
    this.refreshAccess();
    this.getVisits();
    this.getPermission();
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

  getLikes = () => {
    request('/api/tools/like/', {
      method: 'get',
    })
      .then(response => {
        this.setState({ count: response });
        return response;
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  getVisits = () => {
    request('/api/tools/visit/')
      .then(response => {
        this.setState({ visits: response });
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  getPermission = () => {
    request('/api/user/permission_check/', {
      headers: {
        Authorization:
          'Bearer ' +
          (localStorage.getItem('access') || sessionStorage.getItem('access')),
      },
    })
      .then(response => {
        this.setState({ permission: true });
      })
      .catch(error => {
        this.setState({ permission: false });
        message.destroy();
        return;
      });
  };

  render() {
    const { Header, Content, Footer } = Layout;
    const pathname = this.props.location.pathname;

    return (
      <Layout>
        <Header className={styles.header}>
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
            <Menu.Item key="home">
              <Link to="/home">
                <HomeTwoTone twoToneColor={theme['@primary-color']} />
                首页
              </Link>
            </Menu.Item>
            <Menu.Item key="blog">
              <Link to="/blog">
                <FileTextTwoTone twoToneColor={theme['@primary-color']} />
                博客
              </Link>
            </Menu.Item>
            <Menu.Item key="lab">
              <Link to="/lab">
                <ExperimentTwoTone twoToneColor={theme['@primary-color']} />
                实验室
              </Link>
            </Menu.Item>
            <Menu.Item key="message">
              <Link to="/message">
                <MessageTwoTone twoToneColor={theme['@primary-color']} />
                留言板
              </Link>
            </Menu.Item>
            <Menu.Item key="partner">
              <Link to="/partner">
                <HeartTwoTone twoToneColor={theme['@primary-color']} />
                伙伴
              </Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about">
                <IdcardTwoTone twoToneColor={theme['@primary-color']} />
                关于我
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className={styles.content}>
          <Row>
            <Col span={15} offset={2} style={{ marginRight: '12px' }}>
              <div className={styles.children}>{this.props.children}</div>
            </Col>
            <Col span={5} style={{ marginLeft: '12px' }}>
              <Row>
                <Col span={24} className={styles.sidetools}>
                  <Contact />
                </Col>
                <Col span={24} className={styles.sidetools}>
                  <CalendarSpan />
                </Col>
                <Affix offsetTop={64} className={styles.sidetools}>
                  <Col span={24} className={styles.sidetools}>
                    <BulletinBoard />
                  </Col>
                  <Col span={24} className={styles.sidetools}>
                    <LikeMe
                      onClick={() =>
                        request('/api/tools/like/', {
                          method: 'post',
                        })
                          .then(response => {
                            console.log(response);
                            this.setState({ count: response });
                          })
                          .catch(error => {
                            console.log(error);
                          })
                      }
                      count={this.state.count}
                    />
                  </Col>
                  <Col span={24} className={styles.sidetools}>
                    <AdminTools isAdmin={this.state.permission} />
                  </Col>
                </Affix>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer className={styles.footer}>
          <p>2021 </p>
          <div className={styles.divider}></div>
          <p>
            Made with <img src={heartImg} style={{ height: '20px' }} /> by Hal{' '}
            <br />
            <br />
            网站已经被访问了&nbsp;{this.state.visits}&nbsp;次
          </p>
        </Footer>
        <BackTop style={{ zIndex: 110 }} />
      </Layout>
    );
  }
}

export default BasicLayout;
