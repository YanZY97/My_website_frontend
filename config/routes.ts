export default [
  {
    path: '/home',
    component: '@/layouts/home',
    title: 'Violety',
  },
  {
    path: '/login',
    component: '@/layouts/login',
    title: 'Violety - 登录',
  },
  {
    path: '/reset-password',
    component: '@/layouts/resetPassword',
    title: 'Violety - 重置密码',
  },
  {
    path: '/register',
    component: '@/layouts/register',
    title: 'Violety - 注册',
  },
  {
    path: '/usercenter',
    component: '@/layouts/usercenter',
    title: 'Violety - 个人中心',
  },
  {
    path: '/stuffLogin',
    component: '@/layouts/stuffLogin',
    title: 'Violety - 管理员登录',
  },
  {
    path: '/admin',
    component: '@/layouts/admin',
    routes: [
      { exact: true, path: '/admin', redirect: 'home' },
      {
        exact: true,
        path: 'home',
        component: '@/pages/admin/home',
        title: 'Violety - admin - 主页',
      },
      {
        exact: true,
        path: 'manage',
        component: '@/pages/admin/manage',
        title: 'Violety - admin - 管理',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { exact: true, path: '/', redirect: 'home' },
      // { exact: true, path: 'home', component: '@/layouts/home', title: 'home' },
      {
        exact: true,
        path: 'blog',
        component: '@/pages/blog',
        title: 'Violety - 文章',
      },
      {
        exact: true,
        path: 'lab',
        component: '@/pages/lab',
        title: 'Violety - 实验室',
      },
      {
        exact: true,
        path: 'lab/wasm',
        component: '@/pages/labPages/wasm',
        title: 'Violety - 实验室/wasm',
      },
      {
        exact: true,
        path: 'message',
        component: '@/pages/message',
        title: 'Violety - 留言板',
      },
      {
        exact: true,
        path: 'partner',
        component: '@/pages/partner',
        title: 'Violety - 伙伴',
      },
      {
        exact: true,
        path: 'about',
        component: '@/pages/about',
        title: 'Violety - 关于',
      },

      {
        exact: true,
        path: 'articles/:id',
        component: '@/pages/articles/[id]',
        title: 'Violety - 文章详情',
      },
    ],
  },
];
