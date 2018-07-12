import React from 'react';
import {Menu, Icon, Row, Col, Avatar, Badge, Button} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import {menus} from './menu';
import './index.less';
import {getUser} from "../../redux/actions";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const MenuItems = ({key, title, icon}) =>
    <Menu.Item key={key}>
        <Link to={key}>
            {icon && <Icon type={icon}/>}<span>{title}</span>
        </Link>
    </Menu.Item>;

const SubItems = ({key, title, icon, sub}) =>
    <SubMenu
        key={key}
        title={<span><Icon type={icon}/><span>{title}</span></span>}
    >
        {sub && sub.map(item => MenuItems(item))}
    </SubMenu>;

class SliderMenu extends React.Component {
    state = {
        current: '/index/index',
        show:true,
    };
    handleClick = (e) => {
        //message.info(e.key);
        this.setState({
            current: e.key,
        });
    };

    render() {
        const {user} = this.props;
        return (
            <Row>
                <Col md={16}>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[this.state.current]}
                        mode="horizontal"
                        theme="dark"
                        className="menu"
                    >
                        {
                            menus && menus.map((item) =>
                                item.sub && item.sub.length ?
                                    SubItems(item) : MenuItems(item)
                            )
                        }
                    </Menu>
                </Col>
                <Col md={8} className="fontright">
                    <Button type="primary">开始比赛</Button>
                    <Menu
                        mode="horizontal"
                        theme="dark"
                        className="menu pull-right"
                    >

                        <Menu.Item selectable={false} disabled={true} className="menu-money">
                            <Icon type="pay-circle-o" />{user.money}
                        </Menu.Item>
                        <Menu.Item className="menu-css">
                            <Badge dot={this.state.show}>
                                <Icon type="notification" className="anticon-noti"/>
                            </Badge>
                        </Menu.Item>
                        <SubMenu title={<Avatar src="http://p2.qhimgs4.com/t016245f1a43c5df071.jpg"/>}>
                            <MenuItemGroup title="用户中心">
                                <Menu.Item key="setting:1">你好 - {user.username}</Menu.Item>
                                <Menu.Item key="setting:2"><Link to="/index/user/info">个人信息</Link></Menu.Item>
                                <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                </Col>
            </Row>
        )
    }
}

export default connect(
    state=>({user:state.user}),
)(SliderMenu);