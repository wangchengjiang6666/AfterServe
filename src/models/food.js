import request from '../utils/request';

export default {
  namespaced: 'global',
  state: {
    foodList: [],
    count: null,
    limit: 7,
    offset: null,
  },

  reducers: {
    setFoodList(state, action) {
      return {
        ...state,
        ...{
          foodList: action.foodList,
        },
      };
    },
    setFoodCount(state, action) {
      return {
        ...state,
        ...{
          count: action.count,
        },
      };
    },
  },

  effects: {
    *getFoodList(action, { put }) {
      const result = yield request.get('https://elm.cangdu.org/shopping/v2/foods', {
        params: {
          offset: action.page || 1,
          limit: 7,
          restaurant_id: 2,
        },
      });
      //   console.log(result);
      yield put({
        type: 'setFoodList',
        foodList: result.data,
      });
    },
    *getFoodCount(action, { put }) {
      const result = yield request.get('https://elm.cangdu.org/shopping/v2/foods/count');
      //   console.log(result.data.count);
      yield put({
        type: 'setFoodCount',
        count: result.data.count,
      });
    },
    *deleteFood(action, { put }) {
      const result = yield request.delete(`https://elm.cangdu.org/shopping/v2/food/${action.id}`);
      alert(result.data.message);
    },
  },
};
