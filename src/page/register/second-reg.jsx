import React from 'react';

import { Form, Input, Button, message } from 'antd';

import Loading from '../../components/loading/index';
import './index.less';

const FormItem = Form.Item;


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
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
class SecondReg extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.next(values)
                //message.error('错误提示: '+ err);
            }
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Loading>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="球队名称"
                        >
                            {getFieldDecorator('fcname', {
                                rules: [{
                                    required: true, message: '请填写您的球队名',
                                }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button onClick={()=>this.props.prev()} className="button-margin">上一步</Button>
                            <Button type="primary" htmlType="submit">下一步</Button>
                        </FormItem>
                    </Form>
            </Loading>
        )
    }
}

const SecondRegFrom = Form.create()(SecondReg);

export default SecondRegFrom;