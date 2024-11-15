import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { OptionsSharp } from '@vicons/ionicons5';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/my-bill',
    name: 'MyBill',
    redirect: '/my-bill/menu',
    component: Layout,
    meta: {
      title: 'MyBill',
      icon: renderIcon(OptionsSharp),
      sort: 1,
    },
    children: [
      {
        path: 'expend',
        name: 'expend',
        meta: {
          title: '我的支出',
        },
        component: () => import('@/views/mybill/expend/expend.vue'),
      },
      {
        path: 'income',
        name: 'income',
        meta: {
          title: '我的收入',
        },
        component: () => import('@/views/mybill/income/income.vue'),
      },
      {
        path: 'upload',
        name: 'upload',
        meta: {
          title: '导入',
        },
        component: () => import('@/views/mybill/upload/index.vue'),
      },
    ],
  },
];

export default routes;
