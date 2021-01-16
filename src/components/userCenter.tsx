import React from 'react';
import { connect, UserModelState, Dispatch } from 'umi';
import { Drawer } from 'antd';

interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}

interface isProps extends ConnectProps {
  user: UserModelState;
}

interface isState {
  loading: boolean;
  visible: boolean;
}

class userCenter extends React.Component<isProps, isState> {
  constructor(props: isProps) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <a onClick={this.showDrawer}>个人中心</a>
        <Drawer
          title={this.props.user.username}
          width={1000}
          placement="right"
          closable={false}
          visible={this.state.visible}
          onClose={this.onClose}
        ></Drawer>
      </>
    );
  }
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(
  userCenter,
);
