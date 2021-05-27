import React from 'react';
import { Layout, Col, Row, BackTop, Affix } from 'antd';
import {
  Contact,
  CalendarSpan,
  LikeMe,
  BulletinBoard,
  Headers,
} from '@/components/components';
import { request } from 'umi';
import styles from './index.less';

import heartImg from '../assets/imgs/heart.png';

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
    // this.getPermission();
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
      <Layout style={{ backgroundColor: '#00000000' }}>
        <Headers location={location} />
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
                </Affix>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer className={styles.footer}>
          <p>2021 </p>
          <div className={styles.divider}></div>
          <p>
            Made with <img src={heartImg} style={{ height: '20px' }} /> by Y{' '}
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
