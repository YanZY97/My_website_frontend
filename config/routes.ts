export default [
  // {
  //   path: '/home',
  //   component: '@/layouts/home',
  // },
  {
    path: '/login',
    component: '@/layouts/login',
  },
  {
    path: '/reset-password',
    component: '@/layouts/resetPassword',
  },
  {
    path: '/register',
    component: '@/layouts/register',
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
