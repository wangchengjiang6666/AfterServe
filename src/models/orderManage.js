import request from '../utils/request'
export default {
  namespaced: 'orderManage',
  state: {
    orderList: [],
    count: [],
    restaurantMsg: {}
  },
  reducers: {
    setOrderList(state, action) {
      // console.log(state.orderList);      
      return {
        ...state,
        ...{
          orderList: action.orderList,
        },
      };
    },
    setOrderCount(state, action) {
      return {
        ...state,
        ...{
          count: action.count,
        }
      }

    },
    setRestaurantMsg(state, action) {
      return {
        ...state,
        ...{
          restaurantMsg: action.restaurantMsg, 
        }
      }

    }

  },
  effects: {
    //获取列表数据
    *getOrderList(action, {put}) {
      // console.log(1);      
      const result = yield request.get('http://elm.cangdu.org/bos/orders',
      {
        params:  {
          offset: action.page,
          limit: 20
        }
      }
 );
      yield put({
        type: 'setOrderList',
        orderList: result,
      })
      console.log(result);      
    },

    // 获取总条数
    *getOrderCount(action, {put}) {
      const result1 = yield request.get('http://elm.cangdu.org/bos/orders/count');
      yield put({
        type: 'setOrderCount',
        count: result1.count
      })
      // console.log(result1.count);      
    },
    *getRestaurant(action, {put}) {
      const result2 = yield request.get(`http://elm.cangdu.org/shopping/restaurant/${action.restaurant}`
      );
      yield put({
        type: 'setRestaurantMsg',
        restaurantMsg: result2
      })
      // console.log(result2);
    }
  }
}
