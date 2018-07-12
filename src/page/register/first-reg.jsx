import React from 'react';

import {Form, Input, Row, Col, Button, message} from 'antd';

import Loading from '../../components/loading/index';

const FormItem = Form.Item;


class FirstReg extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        //username:this.props.value.username
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //message.info('提示: ', values);
                //console.log(values);
                this.props.next(values)
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一样！');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        //console.log(this.props.form,this.props.form.value,"aaa");
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <Loading>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                    >
                        {getFieldDecorator('username', {
                            rules: [
                                {required: true, message: '请输入用户名',},
                                {min: 6, max: 20, message: '请输入6到20个字符之间！'},
                            ],
                            initialValue: ""
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                {required: true, message: '请输入密码',},
                                {validator: this.validateToNextPassword,},
                                {min: 6, max: 20, message: '请输入6到20个字符之间！'},
                                ],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请输入确认密码',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号码"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{required: true, message: '请填写手机号码'}],
                        })(
                            <Input style={{width: '100%'}}/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="验证码"
                        extra="填写手机号，点击发送验证码"
                    >
                        <Row gutter={16}>
                            <Col span={18}>
                                {getFieldDecorator('captcha', {
                                    rules: [{required: true, message: '请输入验证码'}],
                                })(
                                    <Input/>
                                )}
                            </Col>
                            <Col span={6}>
                                <Button>发送验证码</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">下一步</Button>
                    </FormItem>
                </Form>
            </Loading>
        )
    }
}


const FirstRegFrom = Form.create({
    // mapPropsToFields (props) {
    //     let p = {};
    //     let {value} = props;
    //     console.log(props)
    //     if (value) {
    //         // 编辑时赋初值
    //         console.log(value)
    //         // fieldsName.forEach(key => p[key] = {value: initValues[key]});
    //     } else {
    //         console.log(value)
    //         // 新建时赋空值
    //         // fieldsName.forEach(key => p[key] = {value: ''});
    //     }
    //     return p;
    // },
})(FirstReg);
export default FirstRegFrom;