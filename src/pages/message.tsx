import React from 'react';
import styles from './message.less';
import { request } from 'umi';

import { Dispatch } from 'umi';
import { Pagination, Spin } from 'antd';
import { MessageCard, MessageEditor } from '@/components/components';
import QueueAnim from 'rc-queue-anim';

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}
interface States {
  messageList: any;
  messageCount: number;
  page: number;
  loaded: boolean;
}

class Message extends React.Component<ConnectProps, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      messageList: [],
      messageCount: 0,
      page: 1,
      loaded: false,
    };
  }

  async componentDidMount() {
    await this.getMessages();
    this.getMessageCount();
  }

  getMessages = async () => {
    this.setState({
      loaded: false,
    });
    await request('/api/message/getmessage/', {
      method: 'get',
      params: { page: this.state.page },
    }).then(response => {
      let messageCardList = [];
      for (let k = 0; k < response.data.length; k++) {
        messageCardList.push(
          <div key={k}>
            <MessageCard data={response.data[k]} />
          </div>,
        );
      }
      this.setState({
        messageList: messageCardList,
        loaded: true,
      });
    });
  };

  getMessageCount = async () => {
    await request('/api/message/getmessagecount/', {
      method: 'get',
    }).then(response => {
      this.setState({
        messageCount: response.count,
      });
    });
  };

  handleChange = async (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    await this.setState({
      page: page,
      loaded: false,
    });
    this.getMessages();
  };

  render() {
    const skeleton = [
      <div style={{ textAlign: 'center', padding: '10% 0' }}>
        <Spin size="large" tip="Loading..." />
      </div>,
    ];
    const content = [
      <QueueAnim>
        <div className={styles.background} key="1">
          <QueueAnim>
            <MessageEditor
              handleRefresh={() => {
                this.getMessages();
                this.getMessageCount();
              }}
              key="1"
            />
            <div className={styles.divider}></div>
            <div style={{ padding: '2em 4em 0' }} key="2">
              <QueueAnim>
                {this.state.loaded ? this.state.messageList : skeleton}
              </QueueAnim>
            </div>
            <div style={{ padding: '0em 3em 2em' }}>
              <Pagination
                defaultCurrent={1}
                total={this.state.messageCount}
                onChange={this.handleChange}
              />
            </div>
          </QueueAnim>
        </div>
        ,
      </QueueAnim>,
    ];

    return <>{content}</>;
  }
}

export default Message;
