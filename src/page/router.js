import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import cookies from 'browser-cookies'

import Main from '../components/layout/index';
import Home from './home/index';
import Facilities from './facilities/index';
import TacticsRouter from './tactics/router';
import CanteraRouter from './cantera/router';
import Setting from './setting/index';
import UserInfo from './user/info/index';
import Explain from './explain/index';
import {getUser} from "../redux/actions";

class CustomRouter extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const userid = cookies.get('userid');
        const {user} = this.props;
        //console.log("登陆中...",userid,user._id,userid && !user._id);
        if(userid && !user._id) {
            this.props.getUser();
        }
    }
    // componentWillReceiveProps(nextProps){
    //     console.log("顶级路由加载componentWillReceiveProps",nextProps)
    // }
    // componentDidUpdate(){
    //     console.log("顶级路由加载componentDidUpdate")
    // }
    // componentWillUpdate(){
    //     console.log("顶级路由加载componentWillUpdate")
    // }
    render() {
        // 得到当前请求的path
        const pathname = this.props.location.pathname;
        // 判断用户是否已登陆(过)(cookie中userid是否有值)
        const userid = cookies.get('userid');
        if(!userid) { // 如果没值, 自动跳转到登陆界面
            return <Redirect to='/login'/>
        }
        // cookie中有userid
        // redux中的user是否有数据
        const {user} = this.props;
        if(!user._id) {
            return null  // 不做任何显示
        } else {
            // 请求根路径时, 自动 跳转到对应的用户主界面
            if(pathname==='/') {
                return <Redirect to={pathname}/>
            }
        }
        return (
            <Main>
                <Switch>
                    <Route path="/index/index" component={Home} />
                    <Route path="/index/facilities" component={Facilities} />
                    <Route path="/index/tactics" component={TacticsRouter} />
                    <Route path="/index/cantera" component={CanteraRouter} />
                    <Route path="/index/setting" component={Setting} />
                    <Route path="/index/user/info" component={UserInfo} />
                    <Route path="/index/explain" component={Explain} />
                    <Redirect from="/index" to="/index/index" />
                </Switch>
            </Main>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {getUser},
)(CustomRouter);