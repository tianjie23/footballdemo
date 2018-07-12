import React from 'react';

import { Form, Button, Tabs,Radio,Avatar, Modal } from 'antd';

import Loading from '../../components/loading/index';
import './index.less';
import { matchdata } from './data';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RadioButton = Radio.Button;
const confirm = Modal.confirm;

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
class ThreeReg extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
    };

    onRef = (ref) => {
        this.child = ref
    };

    showConfirm=()=> {
        let that=this;
        confirm({
            title: '信息确认',
            content: '确认联赛选择完成了吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                that.refs.getAcq.onChangeLoading(true);
                //return;
                that.props.onSubmit();
                //that.refs.getAcq.onChangeLoading(false);
            },
            onCancel() {},
        });
    };

    render(){
        return (
            <Loading ref="getAcq">
                    <Form onSubmit={this.handleSubmit}>
                        <Tabs
                            defaultActiveKey="zc"
                        >
                            {
                                matchdata && matchdata.map(item=>{
                                    return (
                                        <TabPane tab={item.title} key={item.key}>
                                            {/*{item.data}*/}
                                            <Radio.Group defaultValue={`${item.data[0]["id"]}_${item.data[0]["key"]}`} size="large">
                                                {
                                                    item.data && item.data.map(item2=>{
                                                        return(
                                                            <RadioButton key={item2.key} value={ `${item2.id}_${item2.key}` } onClick={()=>this.props.handleClick(`${item2.id}`,`${item2.key}`)}><Avatar src={item2.pic} />{ item2.title }</RadioButton>
                                                        )
                                                    })
                                                }
                                            </Radio.Group>
                                        </TabPane>
                                    )
                                })
                            }
                        </Tabs>
                        <FormItem {...tailFormItemLayout}>
                            <Button onClick={()=>this.props.prev()} className="button-margin">上一步</Button>
                            <Button type="primary" onClick={this.showConfirm} >完成注册</Button>
                        </FormItem>
                    </Form>
            </Loading>
        )
    }
}

const ThreeRegFrom = Form.create()(ThreeReg);

export default ThreeRegFrom;