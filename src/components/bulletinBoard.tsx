import React from 'react';
import globalstyles from './styles/index.less';
import { request } from 'umi';
import { Pagination, Spin } from 'antd';

interface States {
  announcementList: any;
  announcementCount: number;
  page: number;
  init: boolean;
}

class BulletinBoard extends React.Component<any, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      announcementList: [],
      announcementCount: 0,
      page: 1,
      init: false,
    };
  }

  componentDidMount() {
    this.getAnnounces();
    this.getAnnounceCount();
  }

  handleChange = async (page: number) => {
    await this.setState({
      page: page,
    });
    this.getAnnounces();
  };

  getAnnounces = async () => {
    await request('/api/tools/getannouncement/', {
      method: 'get',
      params: { page: this.state.page },
    }).then(response => {
      let announceCardList = [];
      for (let k = 0; k < response.data.length; k++) {
        const data = response.data[k];
        announceCardList.push(
          <>
            <div
              style={{
                width: '100%',
                textAlign: 'left',
                backgroundColor: '#ffffff00',
                padding: '4px 32px',
              }}
            >
              <div>{data.text}</div>
              <div style={{ margin: '2px 0', color: '#8a8a8a' }}>
                {data.time}
              </div>
            </div>
            <div className={globalstyles.divider}></div>
          </>,
        );
      }
      this.setState({
        announcementList: announceCardList,
        init: true,
      });
    });
  };

  getAnnounceCount = async () => {
    await request('/api/tools/getannouncementcount/').then(response => {
      this.setState({
        announcementCount: response.count,
      });
    });
  };

  render() {
    const skeleton = (
      <div style={{ textAlign: 'center', padding: '5% 0' }}>
        <Spin size="default" />
      </div>
    );
    return (
      <div className={globalstyles.sidetool} style={{ padding: '8px 0' }}>
        {/* <div className={globalstyles.divider}></div> */}
        {this.state.init ? this.state.announcementList : skeleton}
        <Pagination
          size="small"
          defaultCurrent={1}
          total={this.state.announcementCount}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default BulletinBoard;
