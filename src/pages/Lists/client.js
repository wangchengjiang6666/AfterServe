/**
 * Routes:
 *  - ./src/layouts/SimpleLayout.js
 */
import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
const columns = [
  { title: '用户id', dataIndex: 'user_id' },
  { title: '注册时间', dataIndex: 'registe_time' },
  { title: '用户名', dataIndex: 'username' },
  { title: '城市', dataIndex: 'city' },
  { title: '礼品数量', dataIndex: 'gift_amount' },
];
class Client extends React.Component {
  render() {
    return (
      <Fragment>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={this.props.clientList}
          pagination={{
            position: 'bottom',
            total: this.props.total,
            onChange: this.props.getClientList,
          }}
        ></Table>
      </Fragment>
    );
  }
  componentDidMount() {
    this.props.getClientList();
  }
}
export default connect(
  ({ client }) => {
    return {
      clientList: client.clientList,
      total: client.total,
    };
  },
  dispatch => {
    return {
      getClientList(page, pageSize) {
        dispatch({
          type: 'client/getClientList',
          page,
          pageSize: 5,
        });
      },
    };
  },
)(Client);
