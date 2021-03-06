import React from 'react';
import { Layout, Col, Row, BackTop, Affix, Typography } from 'antd';
import setTheme from '@/utils/setTheme';
import {
  Contact,
  CalendarSpan,
  LikeMe,
  BulletinBoard,
  Headers,
  ThemeTool,
} from '@/components/components';
import { request } from 'umi';
import QueueAnim from 'rc-queue-anim';
import styles from './index.less';

import heartImg from '../assets/imgs/heart.png';

const { Link } = Typography;
interface Props {
  location: any;
  children: React.ReactNode;
}

interface isState {
  count: number;
  visits: number;
  permission: boolean;
  signalChangeIconColor: string;
}

class BasicLayout extends React.Component<Props, isState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
      visits: 0,
      permission: false,
      signalChangeIconColor: '',
    };
    this.changeIconColor = this.changeIconColor.bind(this);
  }

  componentDidMount() {
    this.getLikes();
    this.refreshAccess();
    this.getVisits();
    setTheme();
    // this.getPermission();
  }

  changeIconColor(e: any) {
    this.setState({
      signalChangeIconColor: e,
    });
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
      .then(() => {
        this.setState({ permission: true });
      })
      .catch(() => {
        this.setState({ permission: false });
        // message.destroy();
        return;
      });
  };

  render() {
    const { Content, Footer } = Layout;

    return (
      <Layout style={{ backgroundColor: '#00000000' }} key="a">
        <Headers
          location={location}
          signal={this.state.signalChangeIconColor}
        />
        <Content className={styles.content}>
          <Row>
            <Col span={15} offset={2} style={{ marginRight: '12px' }}>
              <QueueAnim
                type={['right', 'left']}
                ease={['easeOutQuart', 'easeInOutQuart']}
              >
                <div key={location.pathname} className={styles.children}>
                  {this.props.children}
                </div>
              </QueueAnim>
            </Col>
            <Col span={5} style={{ marginLeft: '12px' }}>
              <Row>
                <QueueAnim delay={0} duration={1000} interval={200}>
                  <Col span={24} className={styles.sidetools} key={'sidetool1'}>
                    <Contact />
                  </Col>
                  <Col span={24} className={styles.sidetools} key={'sidetool2'}>
                    <CalendarSpan />
                  </Col>
                  <Affix offsetTop={64} className={styles.sidetools}>
                    <QueueAnim delay={200} duration={1000}>
                      <Col
                        span={24}
                        className={styles.sidetools}
                        key={'sidetool3'}
                      >
                        <BulletinBoard />
                      </Col>
                      <Col
                        span={24}
                        className={styles.sidetools}
                        key={'sidetool4'}
                      >
                        <LikeMe
                          onClick={() =>
                            request('/api/tools/like/', {
                              method: 'post',
                              data: {
                                user:
                                  localStorage.getItem('username') ||
                                  sessionStorage.getItem('username')
                                    ? localStorage.getItem('username') ||
                                      sessionStorage.getItem('username')
                                    : '',
                              },
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
                    </QueueAnim>
                  </Affix>
                </QueueAnim>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer className={styles.footer}>
          <p>
            ©2021&nbsp;Violety.cn.&nbsp;&nbsp;&nbsp;由
            <Link href="https://react.docschina.org/" className={styles.href}>
              {' '}
              react{' '}
            </Link>
            +
            <Link
              href="https://docs.djangoproject.com/zh-hans/3.2/"
              className={styles.href}
            >
              {' '}
              Django{' '}
            </Link>
            强力驱动.&nbsp;&nbsp; 托管于
            <Link href="https://vercel.com/" className={styles.href}>
              &nbsp;Vercel&nbsp;
            </Link>
          </p>
          <p>网站已经被访问了&nbsp;{this.state.visits}&nbsp;次</p>
          <div className={styles.divider}></div>
          <p>
            Designed & Developed with{' '}
            <img src={heartImg} style={{ height: '20px' }} /> by Y
          </p>
        </Footer>
        <BackTop style={{ zIndex: 110 }} />
        <ThemeTool changeIconColorSignal={this.changeIconColor} />
      </Layout>
    );
  }
}

export default BasicLayout;
