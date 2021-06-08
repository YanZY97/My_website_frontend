import React from 'react';
import { connect, UserModelState, Dispatch, Link, request } from 'umi';
import { Avatar, Dropdown, Menu, Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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

  async componentDidMount() {
    const { dispatch } = this.props;
    if (localStorage.getItem('access') || sessionStorage.getItem('access')) {
      await request('/api/user/getnameandid/', {
        method: 'get',
        headers: {
          Authorization:
            'Bearer ' +
            (localStorage.getItem('access') ||
              sessionStorage.getItem('access')),
        },
      }).then(response => {
        dispatch!({
          type: 'user/save',
          payload: {
            isLogin: true,
            username: response.username,
            avatar:
              '/api/media/avatars/' +
              response.id +
              '/avatar.png' +
              '?ran=' +
              Math.random(),
          },
        });
      });
    } else {
    }
  }

  logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
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
          <Link to="/usercenter">
            <a>个人中心</a>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a onClick={this.showConfirm}>退出登录</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <span className={style.user}>
        <Button
          type="default"
          size="small"
          style={
            this.props.user.isLogin
              ? { display: 'none' }
              : { display: 'inline' }
          }
        >
          <Link to="/login">登录</Link>
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          type="primary"
          size="small"
          style={
            this.props.user.isLogin
              ? { display: 'none' }
              : { display: 'inline' }
          }
        >
          <Link to="/register">注册</Link>
        </Button>
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
