import { Effect, Reducer, Subscription, request } from 'umi';

export interface BlogModelState {
  blogs: Array<{
    id?: number;
    author?: string;
    title?: string;
    cls?: string;
    tags: Array<string>;
    likes?: number;
    dislikes?: number;
    visits?: number;
    comments?: number;
    time?: string;
    content?: string;
  }>;
}

export interface BlogModelType {
  namespace: 'blog';
  state: BlogModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    save: Reducer<BlogModelState>;
  };
  subscriptions: { setup: Subscription };
}

const getBlogs = async () => {
  const response = await request('/api/blog/getblog/');
  return response.data;
};

const BlogModel: BlogModelType = {
  namespace: 'blog',

  state: {
    blogs: [
      {
        id: 1,
        author: 'y',
        title: 'title',
        cls: 'article',
        tags: ['react', 'antd', 'django'],
        likes: 0,
        dislikes: 0,
        visits: 0,
        comments: 0,
        time: '1997/2/7 10:00:00',
        content: '',
      },
    ],
  },

  effects: {
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield call(getBlogs);
      yield put({
        type: 'save',
        payload: {
          blogs: data,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/blog') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default BlogModel;
