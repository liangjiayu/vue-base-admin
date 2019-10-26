import layout from '@/layout/layout.vue';

const exampleRouter = {
  path: '/example',
  component: layout,
  meta: { title: '例子' },
  children: [
    {
      path: 'list',
      name: 'list',
      component: () => import('@/views/example/list'),
      meta: { title: '例子列表' },
    },
  ],
};

export default exampleRouter;
