import axios from 'axios';
import { message } from 'antd';
const user = window.sessionStorage.getItem('user');
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
        menuItem: [{ id: '3-1', ItemName: '管理员设置', ItemHref: '/Lists/admin' }],
      },
    ],
    //当前用户登录的个人信息
    user: user ? JSON.parse(user) : '',
  },
  effects: {
    *loginSync(action, { put }) {
      const result = yield axios.post('https://elm.cangdu.org/admin/login', action.payload);
      console.log(result);
      if (result.data.status === 1) {
        message.success('登录成功');
        yield put({ type: 'login', user: action.payload.user_name });
        action.history.replace('/');
        window.sessionStorage.setItem('user', JSON.stringify(action.payload.user_name));
        // window.sessionStorage.setItem('jwt', JSON.stringify(result.data.jwt));
      } else {
        message.error('用户名或密码不正确');
      }
    },
  },
  reducers: {
    login(state, action) {
      return {
        ...state,
        ...{
          user: action.user,
        },
      };
    },
  },
};
