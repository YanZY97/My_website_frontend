export default [
  // {
  //   path: '/home',
  //   component: '@/layouts/home',
  // },
  {
    path: '/login',
    component: '@/layouts/login',
    title: 'login',
  },
  {
    path: '/reset-password',
    component: '@/layouts/resetPassword',
    title: 'reset-password',
  },
  {
    path: '/register',
    component: '@/layouts/register',
    title: 'register',
  },
  {
    path: '/usercenter',
    component: '@/layouts/usercenter',
    title: 'usercenter',
  },
  {
    path: '/stuffLogin',
    component: '@/layouts/stuffLogin',
    title: 'stuffLogin',
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
        title: 'home',
      },
      {
        exact: true,
        path: 'manage',
        component: '@/pages/admin/manage',
        title: 'manage',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { exact: true, path: '/', redirect: 'home' },
      { exact: true, path: 'home', component: '@/layouts/home', title: 'home' },
      { exact: true, path: 'blog', component: '@/pages/blog', title: 'blog' },
      { exact: true, path: 'lab', component: '@/pages/lab', title: 'lab' },
      {
        exact: true,
        path: 'lab/wasm',
        component: '@/pages/labPages/wasm',
        title: 'wasm',
      },
      {
        exact: true,
        path: 'message',
        component: '@/pages/message',
        title: 'message',
      },
      {
        exact: true,
        path: 'partner',
        component: '@/pages/partner',
        title: 'partner',
      },
      {
        exact: true,
        path: 'about',
        component: '@/pages/about',
        title: 'about',
      },

      { exact: true, path: 'articles/:id', component: '@/pages/articles/[id]' },
    ],
  },
];
