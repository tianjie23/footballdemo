import React from 'react';
import {Table, Modal, Row, Col, Button, Dropdown, Menu, Input} from 'antd';

import ReactEcharts from '../../player/index';
import {reqGet_Player, reqCreate_Player, reqSet_Player_NickName, reqSet_Player_Types, reqDelete_Player} from '../../../api/index';
import alerts from '../../../utils/alerts';
import Bread from '../../../components/bread/index';
const bread=[
    {href:"/index/cantera",title:"青训",icon:"team"},
    {href:"/index/cantera/selection",title:"选拔队",icon:"man"},
];

class CanteraSelection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: '球员名称',
                    dataIndex: 'truename',
                    render: (text, record) => <a href="javascript:;"
                                                 onClick={() => this.showModal(record._id)}>{text}</a>,
                },
                {
                    title: '国籍',
                    dataIndex: 'nation',
                },
                {
                    title: '年龄',
                    dataIndex: 'age',
                },
                {
                    title: '身高',
                    dataIndex: 'height',
                },
                {
                    title: '位置',
                    dataIndex: 'position',
                },
                {
                    title: '惯用脚',
                    dataIndex: 'feet',
                },
                {
                    title: '体重',
                    dataIndex: 'weight',
                },
                {
                    title: '当前能力',
                    dataIndex: 'capacity',
                },
                {
                    title: '潜能',
                    dataIndex: 'potential',
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    render: (text, record) => (
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item key="0" onClick={() => this.deletePlayer(record)}>
                                    解雇
                                </Menu.Item>
                                <Menu.Item key="1" onClick={() => this.setModalVisible(true, record)}>
                                    修改昵称
                                </Menu.Item>
                                <Menu.Divider/>
                                <Menu.SubMenu title="调整">
                                    <Menu.Item key="2" onClick={() => this.setTypes(record,1)}>梯队</Menu.Item>
                                    <Menu.Item key="3" onClick={() => this.setTypes(record,2)}>青年队</Menu.Item>
                                </Menu.SubMenu>
                            </Menu>
                        } trigger={['click']}>
                            <Button>操作</Button>
                        </Dropdown>
                    ),
                }
            ],
            data: [],
            res_data: [],
            id: "0",
            visible: false,
            truename: "",
            nickname: "",
            updateNicknameVisible: false,
            loading: true,
            playerid: '',
            count:0
        };
    }

    showModal = (id) => {
        this.setState({
            visible: true,
            id: id
        });
    };
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    createPlayer = () => {
        this.setState({
            loading: true
        });
        reqCreate_Player({number: 11, types: 3})
            .then(
                res => {
                    //console.log(res.data.data,res.data.count);
                    //return;
                    this.setState({
                        loading: false
                    });
                    if (res.data.status === 0) {
                        alerts("创建成功！", "success");
                        this.doLoad();
                    } else {
                        alerts(res.data.msg, "error");
                    }
                }, err => {
                    alerts(err, "error");
                }
            );
    };

    componentWillMount() {
        this.doLoad();
    }

    componentWillReceiveProps(){
        this.doLoad();
    }

    componentDidMount() {
        this.setState({
            loading: false
        });
    }

    onChangeValue = (e) => {
        this.setState({
            nickname: e.target.value
        }, () => {
            //console.log(this.state.nicknamevalue);
        });
    };

    doLoad = () => {
        reqGet_Player({types: 3, limit: 0})
            .then(
                res => {
                    if (res.data.status === 0) {
                        this.setState({
                            res_data: res.data.data,
                            count:res.data.data.length
                        });

                        let data = [];
                        this.state.res_data.length && this.state.res_data.forEach(v => {
                            Object.assign(v, {key: v._id});
                            v.truename = v.nickname || v.truename;
                            v.height= v.height+"cm";
                            v.weight= v.weight+"kg";
                            v.age = v.age+"岁";
                            data.push(v)
                        });
                        this.setState({
                            data: data
                        });
                    }
                }, err => {
                    this.setState({
                        data: []
                    });
                }
            )
    };

    setModalVisible = (modalVisible, record) => {
        this.setState({
            updateNicknameVisible: modalVisible,
            playerid: record._id,
            truename: record.truename,
            nickname: record.nickname,
        });
    };

    setTypes = (record,types) =>{
        this.setState({
            loading: true
        });
        reqSet_Player_Types({id:record._id,types})
            .then(
                res=>{
                    if(res.data.status===1){
                        alerts(res.data.msg)
                    }else{
                        alerts("操作成功");
                        this.doLoad();
                    }
                    this.setState({
                        loading: false,
                    });
                },err=>{
                    alerts(err);
                    this.setState({
                        loading: false,
                    });
                }
            )
    };

    deletePlayer=(record)=>{
        let that = this;
        Modal.confirm({
            title: '解雇球员',
            content: `确定要解雇 ${record.nickname || record.truename} 吗？解雇后将无法再招募！`,
            okText: '狠心解雇',
            cancelText: '不解雇',
            okType: 'danger',
            onOk() {
                that.setState({
                    loading: true
                });
                reqDelete_Player({id:record._id})
                    .then(
                        res=>{
                            if(res.data.status===1){
                                alerts(res.data.msg);
                            }else{
                                that.doLoad();
                                alerts("删除成功");
                            }
                            that.setState({
                                loading: false,
                            });
                        },err=>{
                            alerts(err);
                            that.setState({
                                loading: false,
                            });
                        }
                    )
            },
            onCancel() {},
        });
    };

    setNickName = () => {
        this.setState({
            loading: true
        });
        reqSet_Player_NickName({id: this.state.playerid, nickname: this.state.nickname})
            .then(
                res => {
                    if (res.data.status === 1) {
                        alerts(res.data.msg)
                    } else {
                        alerts("修改成功");
                        this.doLoad();
                    }
                    this.setState({
                        loading: false,
                        updateNicknameVisible: false
                    });
                }, err => {
                    alerts(err);
                    this.setState({
                        loading: false,
                    });
                }
            )
    };

    render() {
        const {columns, data} = this.state;
        return (
            <div>
                <Bread bread={bread}/>
                <div className="content-bg">
                    <Table
                        columns={columns}
                        dataSource={data}
                        loading={this.state.loading}
                        bordered
                        title={() => (
                            <Row gutter={8}>
                                <Col md={8}>选拔队员</Col>
                                <Col md={8}>总共{this.state.count}位选拔球员</Col>
                                <Col md={8}><Button type="primary"
                                                    onClick={() => this.createPlayer()}>创建选拔球员</Button></Col>
                            </Row>
                        )}
                    />
                </div>
                <Modal
                    title="球员情况"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <ReactEcharts id={this.state.id}/>
                    </div>
                </Modal>
                <Modal
                    title={`修改 ${this.state.truename} 的昵称`}
                    wrapClassName="vertical-center-modal"
                    visible={this.state.updateNicknameVisible}
                    onOk={() => this.setNickName()}
                    onCancel={() => {
                        this.setState({
                            updateNicknameVisible: false
                        });
                    }}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <Input size="large" onChange={(e) => this.onChangeValue(e)} addonBefore="昵称："
                               value={this.state.nickname}/>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default CanteraSelection;