export default {
  namespaced: 'global',
  state: {
    menus: [
      {
        id: 1,
        type: 'user',
        menuName: '数据管理',
        menuItem: [
          { id: '1-1', ItemName: '用户列表', ItemHref: '/Lists/client' },
          { id: '1-2', ItemName: '商家列表', ItemHref: '/Lists/merchant' },
          { id: '1-3', ItemName: '食品列表', ItemHref: '/Lists/food' },
          { id: '1-4', ItemName: '订单列表', ItemHref: '/Lists/order' },
        ],
      },
      {
        id: 2,
        type: 'laptop',
        menuName: '添加数据',

        menuItem: [],
      },
      {
        id: 3,
        type: 'notification',
        menuName: '设置',
        menuItem: [],
      },
    ],
  },
};
