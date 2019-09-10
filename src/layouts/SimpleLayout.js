import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import style from './SimpleLayout.scss';
import NavLink from 'umi/navlink';
import Link from 'umi/link';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class SimpleLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    let { menus, match } = this.props;
    let path = match.path;

    let allMenuItems = [];
    // console.log(menus);
    menus.forEach(menu => {
      allMenuItems.push(...menu.menuItem);
    });

    let curMenu = allMenuItems.find(item => {
      return item.ItemHref && item.ItemHref === path;
    });

    let openKeys = curMenu ? [curMenu.id.split('-')[0]] : [];
    let selectedKeys = curMenu ? [curMenu.id] : [];
    return (
      <Fragment>
        <Layout style={{ height: '100%' }}>
          <Header
            className={style.header}
            style={{ background: '#1a1b20', color: '#fff', height: '50px' }}
          >
            <div className={style.logo}></div>
            <Menu
              theme="dark"
              mode="horizontal"
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
                defaultOpenKeys={openKeys}
                defaultSelectedKeys={selectedKeys}
                style={{ height: '100%', borderRight: 0, background: '#1a1b20', color: '#fff' }}
              >
                <Menu.Item key="3" className={path === '/' ? 'ant-menu-item-selected' : ''}>
                  <NavLink to="/">
                    <Icon type="inbox" />
                    <span>welcome</span>
                  </NavLink>
                </Menu.Item>
                {menus.map(item => {
                  return (
                    <SubMenu
                      key={item.id}
                      title={
                        <span>
                          <Icon type={item.type} />
                          {item.menuName}
                        </span>
                      }
                      style={{ background: '#1a1b20' }}
                    >
                      {item.menuItem &&
                        item.menuItem.map(val => {
                          return (
                            <Menu.Item key={val.id}>
                              <Link
                                to={val.ItemHref}
                                onClick={e => {
                                  // console.log(e.target.innerText);
                                  let html = e.target.innerText;
                                  this.props.change(html);
                                }}
                              >
                                {val.ItemName}
                              </Link>
                            </Menu.Item>
                          );
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
                <Breadcrumb.Item style={{ color: 'black' }}>
                  <a href="">{this.props.navName}</a>
                </Breadcrumb.Item>
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
      navName: global.navName,
    };
  },
  dispatch => {
    return {
      change: navName => {
        dispatch({
          type: 'global/handleChange',
          navName,
        });
      },
    };
  },
)(SimpleLayout);
