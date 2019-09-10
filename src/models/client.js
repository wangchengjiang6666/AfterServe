import axios from 'axios';
export default {
  namespaced: 'client',
  state: {
    clientList: [],
    total: 1,
  },
  reducers: {
    setClientList(state, action) {
      return {
        ...state,
        ...{
          clientList: action.clientList,
          total: action.total,
        },
      };
    },
  },
  effects: {
    *getClientList(action, { put }) {
      const result = yield axios.get('https://elm.cangdu.org/v1/users/list', {
        params: {
          limit: action.pageSize || 5,
          offset: action.page || 0,
        },
      });
      yield put({
        type: 'setClientList',
        clientList: result.data,
        total: 100,
      });
    },
  },
};
