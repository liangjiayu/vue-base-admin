import layout from '@/layout/layout.vue';

const exampleRouter = {
  path: '/example',
  component: layout,
  children: [
    {
      path: 'create',
      name: 'createExample',
      component: () => import('@/views/example/create'),
    },
    {
      path: 'list',
      name: 'listExample',
      component: () => import('@/views/example/list'),
    },
  ],
};

export default exampleRouter;
