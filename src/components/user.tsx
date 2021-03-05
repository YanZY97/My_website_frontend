import React from 'react';
import { connect, UserModelState, Dispatch } from 'umi';
import { Avatar, Dropdown, Menu, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import Login from './login';
import Register from './register';
import style from './styles/user.less';

const { confirm } = Modal;

// dva-model connectProps组件接口
interface ConnectProps<P extends { [K in keyof P]?: string } = {}> {
  dispatch?: Dispatch;
}
interface UserProps extends ConnectProps {
  user: UserModelState;
}

class User extends React.Component<UserProps, any> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const username =
      localStorage.getItem('username') || sessionStorage.getItem('username');
    if (username) {
      dispatch!({
        type: 'user/save',
        payload: {
          isLogin: true,
          username: username,
          avatar: '/api/media/avatars/' + username + '/avatar.png',
        },
      });
    }
  }

  logout = () => {
    const { dispatch } = this.props;
    localStorage.clear();
    sessionStorage.clear();
    dispatch!({
      type: 'user/save',
      payload: {
        isLogin: false,
        username: '',
        avatar: '',
      },
    });
  };

  showConfirm = () => {
    confirm({
      title: '是否要退出登录？',
      icon: <ExclamationCircleOutlined />,
      onOk: this.logout,
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a>个人中心</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a onClick={this.showConfirm}>注销</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <span className={style.user}>
        <Login display={!this.props.user.isLogin} />
        &nbsp;&nbsp;&nbsp;
        <Register display={!this.props.user.isLogin} />
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          className={style.dropdown}
        >
          <div
            className={style.usermenu}
            style={
              this.props.user.isLogin
                ? { display: 'inline' }
                : { display: 'none' }
            }
          >
            <Avatar
              size={26}
              src={this.props.user.avatar}
              alt={this.props.user.username[0]}
            />
            <span className={style.username}>{this.props.user.username}</span>
          </div>
        </Dropdown>
      </span>
    );
  }
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(
  User,
);
