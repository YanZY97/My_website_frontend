import React from 'react';
import { connect, UserModelState, Dispatch } from 'umi';

import Login from './login';
import Register from './register';
import style from './styles/user.less';

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
        },
      });
    } else {
      console.log(1);
    }
  }

  render() {
    return (
      <span className={style.user}>
        <Login display={!this.props.user.isLogin} />
        &nbsp;&nbsp;&nbsp;
        <Register display={!this.props.user.isLogin} />
        {this.props.user.username}
      </span>
    );
  }
}

export default connect(({ user }: { user: UserModelState }) => ({ user }))(
  User,
);
