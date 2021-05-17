import React from 'react';
import styles from './message.less';
import { request } from 'umi';

import { connect, UserModelState, Dispatch } from 'umi';
import { Skeleton, Pagination } from 'antd';
import { MessageCard, MessageEditor } from '@/components/components';

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}
interface States {
  messageList: any;
  messageCount: number;
  page: number;
  init: boolean;
}

class Message extends React.Component<ConnectProps, States> {
  constructor(props: any) {
    super(props);
    this.state = {
      messageList: [],
      messageCount: 0,
      page: 1,
      init: true,
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
        messageCardList.push(<MessageCard data={response.data[k]} />);
      }
      this.setState({
        messageList: messageCardList,
        init: true,
      });
    });
  };

  getMessageCount = async () => {
    await request('/api/message/getmessagecount/').then(response => {
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
  };

  render() {
    const skeleton = [
      <div>
        <Skeleton avatar active />
        <br />
        <br />
        <br />
        <Skeleton avatar active />
        <br />
        <br />
        <br />
        <Skeleton avatar active />
        <br />
        <br />
        <br />
        <Skeleton avatar active />
        <br />
        <br />
        <br />
        <Skeleton avatar active />
        <br />
        <br />
        <br />
      </div>,
    ];

    const content = [
      <div style={{ backgroundColor: 'white' }}>
        <MessageEditor
          handleRefresh={() => {
            this.getMessages, this.getMessageCount;
          }}
        />
        <div className={styles.divider}></div>
        <div style={{ backgroundColor: 'white', padding: '2em 4em 0' }}>
          {this.state.messageList}
        </div>
        <div style={{ backgroundColor: 'white', padding: '0em 3em 2em' }}>
          <Pagination
            defaultCurrent={1}
            total={this.state.messageCount}
            onChange={this.handleChange}
          />
        </div>
      </div>,
    ];

    return <>{this.state.init ? content : skeleton}</>;
  }
}

export default Message;
