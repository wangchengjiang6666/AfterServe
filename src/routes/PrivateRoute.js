import React, { Fragment } from 'react';
import { connect } from 'dva';
import Redirect from 'umi/redirect';
const PrivateRoute = ({ children, user, menus, match }) => {
  if (user) {
    let pach = match.path;
    return <Fragment>{children}</Fragment>;
  } else {
    return <Redirect to="/login" />;
  }
};
export default connect(
  ({ global }) => ({
    user: global.user,
  }),
  null,
)(PrivateRoute);
