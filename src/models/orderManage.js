import request from '../utils/request'
export default {
  namespaced: 'orderManage',
  state: {
    orderList: [],
    count: [],
    restaurantMsg: {},
    getusername: '',
    getaddress: ''
  },
  reducers: {
    //监控并更新订单数据
    setOrderList(state, action) {   
      return {
        ...state,
        ...{
          orderList: action.orderList,
        },
      };
    },
    //监控并更新总条数
    setOrderCount(state, action) {
      return {
        ...state,
        ...{
          count: action.count,
        }
      }

    },
    //监控并更新订单详细数据
    setRestaurantMsg(state, action) {
      return {
        ...state,
        ...{
          restaurantMsg: action.restaurantMsg, 
          getusername: action.username, 
          getaddress: action.address, 
        }
      }
    }

  },
  effects: {
    //获取列表数据
    *getOrderList(action, {put}) {    
      const result = yield request.get('http://elm.cangdu.org/bos/orders',
      {
        params:  {
          offset: action.page,
          limit: 10
        }
      }
 );
      yield put({
        type: 'setOrderList',
        orderList: result.data,
      })  
    },

    // 获取数据总条数
    *getOrderCount(action, {put}) {
      const result1 = yield request.get('http://elm.cangdu.org/bos/orders/count');
      yield put({
        type: 'setOrderCount',
        count: result1.data.count
      })   
    },
    //获取表格展开时的订单相关参数
    *getRestaurant(action, {put}) {
      const result2 = yield request.get(`http://elm.cangdu.org/shopping/restaurant/${action.restaurant}`);
      const result3 = yield request.get(`http://elm.cangdu.org/v1/user/${action.user_id}`);
      const result4 = yield request.get(`http://elm.cangdu.org/v1/addresse/${action.address_id}`);
      yield put({
        type: 'setRestaurantMsg',
        restaurantMsg: result2.data,
        username: result3.data.username,
        address: result4.data.address
      })
    },
  }
}
