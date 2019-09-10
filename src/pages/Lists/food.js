/**
 * Routes:
 *  - ./src/layouts/SimpleLayout.js
 */
import React, { Fragment } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import styles from './food.scss';

// class Button extends React.Component {
//   render() {
//     return <button></button>;
//   }
// }

class Food extends React.Component {
  columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      width: '200px',
    },
    {
      title: '食品介绍',
      dataIndex: 'description',
      width: '260px',
    },
    {
      title: '评分',
      dataIndex: 'rating',
      width: '200px',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: null,
      width: '200px',

      render: (text, record, index) => (
        <span>
          <Button
            type="danger"
            onClick={() => {
              // console.log(text, record, index);
              let id = record.item_id;
              console.log(id);
              this.props.deleteFood(id);
            }}
          >
            删除
          </Button>
        </span>
      ),
    },
  ];

  render() {
    // let foodList = this.props.foodList;
    return (
      <Fragment>
        <Table
          rowKey="item_id"
          expandedRowRender={foodList => (
            <div>
              <div className={styles.left}>
                <p>食品名称: {foodList.name}</p>
                <p>食品 ID: {foodList.item_id}</p>
                <p>食品介绍: {foodList.description}</p>
                <p>食品评分: {foodList.rating}</p>
                <p>月销量: {foodList.month_sales}</p>
              </div>
              <div className={styles.right}>
                <p>餐馆名称: {foodList.pinyin_name}</p>
                <p>餐馆 ID: {foodList.restaurant_id}</p>
                <p>餐馆详情: {foodList.tips}</p>
                <p>食品分类: {foodList.category_id}</p>
              </div>
            </div>
          )}
          columns={this.columns}
          dataSource={this.props.foodList}
          pagination={{
            total: this.props.count,
            onChange: this.props.getFoodList,
          }}
        />
        <p>{this.props.foodList.name}</p>
      </Fragment>
    );
  }
  componentDidMount() {
    this.props.getFoodCount();
    this.props.getFoodList();
  }
}

export default connect(
  ({ food }) => {
    return {
      foodList: food.foodList,
      count: food.count,
    };
  },
  dispatch => {
    return {
      getFoodList(page, pageSize) {
        dispatch({
          type: 'food/getFoodList',
          page,
          pageSize,
        });
      },
      getFoodCount() {
        dispatch({
          type: 'food/getFoodCount',
        });
      },
      deleteFood(id) {
        dispatch({
          type: 'food/deleteFood',
          id,
        });
      },
    };
  },
)(Food);
