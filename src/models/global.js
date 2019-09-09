export default {
  namespaced: 'global',
  state: {
    menus: [
      {
        id: 1,
        type: 'user',
        menuName: '会员管理',
        href: '/users/MenberCenter',
        menuItem: ['列表一', '列表二', '列表三'],
      },
      {
        id: 2,
        type: 'laptop',
        menuName: '城市列表',
        href: '/users/Citys',
        menuItem: ['列表四', '列表五', '列表六'],
      },
      {
        id: 3,
        type: 'notification',
        menuName: '其它页面',
        href: '/users/Others',
        menuItem: ['列表七', '列表八', '列表九'],
      },
    ],
  },
};
