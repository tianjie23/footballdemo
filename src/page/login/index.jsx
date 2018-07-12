import React from 'react';
import {Form, Icon, Input, Button, Checkbox, Tabs, message} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import { login } from '../../redux/actions';
import alerts from '../../utils/alerts';

import Loading from '../../components/loading/index';
import Logo from '../../components/logo/index';
import './index.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

function buttonSubmit(getFieldDecorator){
    return (
        <FormItem>
        {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
        })(
            <Checkbox>记住登录</Checkbox>
        )}
        <Link to="/register" className="login-form-forgot">忘记密码？</Link>
        <Button type="primary" htmlType="submit" className="login-form-button">
            登录
        </Button>
        <Link to="/register">现在注册！</Link>
    </FormItem>
    )

}

class UserNameLogin extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //message.error('错误提示：'+values);
                //console.log(values)
                this.props.handleLogin(values);
            }
            //message.info(this.props.login(this.state))
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [
                            {required: true, message: '请填写您的用户名！'},
                            {min: 6, max: 20, message: '请输入6到20个字符之间！'},
                        ],
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="用户名"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {required: true, message: '请填写您的密码！'},
                            {min: 6, max: 20, message: '请输入6到20个字符之间！'},
                        ],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>
                {buttonSubmit(getFieldDecorator)}
            </Form>
        )
    }
}


class PhoneLogin extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleLogin(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [
                            {required: true, message: '请填写您的手机号！'},
                            {min: 6, max: 20, message: '请输入6到20个字符之间！'},
                        ],
                    })(
                        <Input prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="手机号"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {required: true, message: '请填写您的密码！'},
                            {min: 6, max: 20, message: '请输入6到20个字符之间！'},
                        ],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>
                {buttonSubmit(getFieldDecorator)}
            </Form>
        )
    }
}

const UserNameLoginFrom = Form.create()(UserNameLogin);
const PhoneLoginFrom = Form.create()(PhoneLogin);

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            remember:false
        }
    }

    handleLogin = (value) =>{
        this.setState({
            ...value
        },()=>{
            this.props.login(this.state);
        })
    };

    render() {
        const {user} = this.props;
        //console.log(user.redirectTo);
        if(user.msg){
            alerts(user.msg,"error");
        }else if(user.redirectTo){
            return <Redirect to="/index" />
            //this.props.history.replace("/index");
        }
        return (
            <div>
                <Logo/>
                <Loading>
                    <div className="login-form">
                        <Tabs size="large" defaultActiveKey="1">
                            <TabPane tab="账号登录" key="1">
                                <UserNameLoginFrom handleLogin={this.handleLogin} />
                            </TabPane>
                            <TabPane tab="手机登录" key="2">
                                <PhoneLoginFrom handleLogin={this.handleLogin} />
                            </TabPane>
                        </Tabs>
                    </div>
                </Loading>
            </div>
        )
    }
}


export default connect(
    state => ({user: state.user}),  // 组件的props多了一个属性: user
    {login}
)(Login);