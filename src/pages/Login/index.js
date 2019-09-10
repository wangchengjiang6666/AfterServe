import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Row, Col, Checkbox } from 'antd';
import styles from './index.scss';
import HHH from '../../layouts/components/hhh';

import axios from 'axios';
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.onLogin(values, this.props.history);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <HHH></HHH>
        <Row className={styles.one}>
          <Col span={16} offset={5}>
            <Form onSubmit={this.handleSubmit} className={styles.login_form}>
              <Form.Item>
                {getFieldDecorator('user_name', {
                  rules: [{ required: true, message: '请输入用户名！' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '请输入密码！' },
                    { min: 6, message: '密码不能少于6位！' },
                    { max: 12, message: '密码不能大于12位！' },
                  ],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)}
                <a className={styles.login_form_forgot} href="">
                  忘记密码
                </a>
                <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                  登录
                </Button>
                <a href="">注册</a>
              </Form.Item>
            </Form>
          </Col>

          <img src={this.props.img} />
        </Row>
      </Fragment>
    );
  }
}
export default connect(
  null,
  dispatch => {
    return {
      onLogin: (values, history) => {
        dispatch({
          type: 'global/loginSync',
          payload: values,
          history,
        });
      },
    };
  },
)(Form.create(null)(Login));
