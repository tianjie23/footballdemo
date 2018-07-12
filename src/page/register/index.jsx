import React from 'react';
import { Steps } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import { register } from '../../redux/actions';
import {reqCreate_Player} from '../../api/index';

import alerts from '../../utils/alerts';

import FirstReg from './first-reg';
import SecondReg from './second-reg';
import ThreeReg from './three-reg';
import Logo from '../../components/logo/index';
import './index.less';
const Step = Steps.Step;


class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            captcha:"",
            password:"",
            confirm:"",
            phone:"",
            username:"",
            fcname:"",
            lx:"zc",
            fc:"gzhd"
        };
    }
    next = (obj) => {
        const current = this.state.current + 1;
        this.setState({
            current,
            ...obj
        });
    };
    prev = (obj) => {
        const current = this.state.current - 1;
        this.setState({ current });
        this.props.register(this.state,0);
    };

    handleClick=(lx,fc)=>{
        //message.info(`${lx}-------${fc}`)
        this.setState({
            lx:lx,
            fc:fc
        });
        // alert(value)
        //console.log(this.state);
    };

    onSubmit= ()=>{
        //console.log(this.state)
        this.props.register(this.state,1);
        //reqCreate_Player({number:13, types:0});

    };
    steps = [{
        title: '第一步',
        description:'注册账号',
        content: <FirstReg next={this.next} />,
    }, {
        title: '第二步',
        description:'球队名称',
        content: <SecondReg next={this.next} prev={this.prev} />,
    }, {
        title: '第三步',
        description:'选择联赛',
        content: <ThreeReg prev={this.prev} onSubmit={this.onSubmit} handleClick={this.handleClick} />,
    }];

    render(){
        const { current } = this.state;
        const {user} = this.props;
        if(user.msg){
            alerts(user.msg,"error");
        }else if(user.redirectTo){
            return <Redirect to={user.redirectTo} />
        }
        return (
            <div className="register-form">
                <Logo />
            <Steps current={current}>
                {this.steps.map(item => <Step key={item.title} description={item.description} title={item.title} />)}
            </Steps>
            <div className="steps-content">{this.steps[this.state.current].content}</div>
            <div>
                <Link to="/login">我要登录！</Link>
            </div>
            {/*<div className="steps-action">*/}
                {/*{*/}
                    {/*this.state.current < this.steps.length - 1*/}
                    {/*&&*/}
                    {/*<Button type="primary" onClick={() => this.next()}>Next</Button>*/}
                {/*}*/}
                {/*{*/}
                    {/*this.state.current === this.steps.length - 1*/}
                    {/*&&*/}
                    {/*<Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>*/}
                {/*}*/}
                {/*{*/}
                    {/*this.state.current > 0*/}
                    {/*&&*/}
                    {/*<Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>*/}
                        {/*Previous*/}
                    {/*</Button>*/}
                {/*}*/}
            {/*</div>*/}
        </div>)
    }
}

export default connect(
    state => ({user: state.user}),  // 组件的props多了一个属性: user
    {register}                      // 组件的props多了一个属性: register函数
)(Register);