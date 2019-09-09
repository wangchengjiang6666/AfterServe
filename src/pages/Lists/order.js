/**
 * Routes:
 *  - ./src/layouts/SimpleLayout.js
 */
import React, { Fragment } from 'react';
import { Table } from 'antd';
import style from "./order.scss"
import { connect } from 'dva';
const columns = [
  { title: '订单ID', dataIndex: 'unique_id',  width:"100px"},
  { title: '总价格', dataIndex: 'total_amount',width:"100px"},
  { title: '订单状态', dataIndex: 'status_bar.title',  width:"100px"},

];
class Order extends React.Component {
  render() {
    return (
      <Fragment>
        {/* <h1>订单列表</h1> */}
        <Table 
        className={style.TabList}
        rowKey='unique_id'
        onExpand={this.props.getAddres}
    columns={columns}
    expandedRowRender={record => <div style={{ margin: 0 }} >
    <ul className={style.order_list} >
      <li ><span >用户名</span><strong >{this.props.restaurantMsg.phone}</strong></li>
      <li><span >店铺名称</span><strong >{this.props.restaurantMsg.name}</strong></li>
      <li><span>收货地址</span><strong >{this.props.restaurantMsg.address}</strong></li>
      <li><span>店铺ID</span><strong >{record.restaurant_id}</strong></li>
      <li><span>店铺地址</span><strong >{this.props.restaurantMsg.address}</strong></li>
    </ul>
    </div>}
    dataSource={this.props.orderList}
    pagination={{
      onChange: this.props.getOrderList,
      pageSize:20,
      total: this.props.count,
      defaultCurrent:1
    }}
  />

      </Fragment>
    );
  }
  componentDidMount() {
    this.props.getOrderList();
    this.props.getOrdertotal(); 
  }
}
// export default Order;
export default connect(
  ({ orderManage }) => {
    return {
      orderList: orderManage.orderList,
      count: orderManage.count,
      restaurantMsg: orderManage.restaurantMsg
    }
  },
  // null,
  dispatch => {
    return {
      getOrderList(current) {
        console.log(current);
        let page = (current-1)*20;
        dispatch({
          type: 'orderManage/getOrderList',
          page
        });
      },
      getAddres(expanded, record) {
        console.log(record.restaurant_id);
        
        dispatch({
          type: 'orderManage/getRestaurant',
          restaurant: record.restaurant_id
        })
      },
      getOrdertotal() {
        dispatch({
          type: 'orderManage/getOrderCount'
        });
      }
    }
  }
)(Order);
