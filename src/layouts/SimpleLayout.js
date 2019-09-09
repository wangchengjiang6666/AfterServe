import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import style from './SimpleLayout.scss';
import NavLink from 'umi/navlink';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class SimpleLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    let { menus } = this.props;
    return (
      <Fragment>
        <Layout style={{ height: '100%' }}>
          <Header
            className={style.header}
            style={{ background: '#1a1b20', color: '#fff', height: '50px' }}
          >
            <div className={style.logo}>三千包吃住组</div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{
                lineHeight: '50px',
                background: '#1a1b20',
                color: '#fff',
                paddingLeft: '5px',
              }}
            >
              <Menu.Item key="1">我的桌面</Menu.Item>
              <Menu.Item key="2">订单列表 </Menu.Item>
              <Menu.Item key="3">余额</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider
              width={150}
              style={{ background: '#1a1b20' }}
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={[]}
                style={{ height: '100%', borderRight: 0, background: '#1a1b20', color: '#fff' }}
              >
                {menus.map(item => {
                  return (
                    <SubMenu
                      key={item.id}
                      title={
                        <span>
                          <Icon type={item.type} />
                          <NavLink to={item.href}>{item.menuName}</NavLink>
                        </span>
                      }
                      style={{ background: '#1a1b20' }}
                    >
                      {item.menuItem &&
                        item.menuItem.map((val, index) => {
                          return <Menu.Item key={index}>{val}</Menu.Item>;
                        })}
                    </SubMenu>
                  );
                })}
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}
export default connect(
  ({ global }) => {
    return {
      menus: global.menus,
    };
  },
  null,
)(SimpleLayout);
