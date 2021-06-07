import React from 'react';
import styles from './message.less';
import { request } from 'umi';

import { Dispatch } from 'umi';
import { Pagination } from 'antd';
import { MessageCard, MessageEditor } from '@/components/components';
import QueueAnim from 'rc-queue-anim';

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}
interface States {
  messageList: any;
  messageCount: number;
  page: number;
}

class Message extends React.Component<ConnectProps, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      messageList: [],
      messageCount: 0,
      page: 1,
    };
  }

  componentDidMount() {
    this.getMessages();
    this.getMessageCount();
  }

  getMessages = async () => {
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
    await this.setState({
      page: page,
    });
    this.getMessages();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  render() {
    const content = [
      <QueueAnim>
        <div style={{ backgroundColor: 'white' }} key="1">
          <QueueAnim>
            <MessageEditor
              handleRefresh={() => {
                this.getMessages();
                this.getMessageCount();
              }}
              key="1"
            />
            <div className={styles.divider}></div>
            <div
              style={{ backgroundColor: 'white', padding: '2em 4em 0' }}
              key="2"
            >
              <QueueAnim>{this.state.messageList}</QueueAnim>
            </div>
            <div style={{ backgroundColor: 'white', padding: '0em 3em 2em' }}>
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
