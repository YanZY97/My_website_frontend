import { Effect, Reducer } from 'umi';

export interface UserModelState {
  username: string;
  isLogin: boolean;
  avatar: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    username: 'user',
    isLogin: false,
    avatar: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default UserModel;
