import React from 'react';
import {connect} from 'react-redux';
import {Table, Modal} from 'antd';

import Bread from '../../components/bread/index';
import ReactEcharts from '../player/index';
import {getUser} from "../../redux/actions";
import {reqGet_Player, reqCreate_Player} from '../../api/index';

const bread = [
    {href: "/index/index", title: "主页", icon: "home"},
];

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns:[
                {
                    title: '球员名称',
                    dataIndex: 'truename',
                    render: (text, record) => <a href="javascript:;" onClick={()=>this.showModal(record._id)}>{text}</a>,
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
                }
            ],
            data:[],
            res_data:[],
            id:"0",
            visible: false,
            loadplayer:false
        };
    }

    showModal = (id) => {
        this.setState({
            visible: true,
            id:id
        });
    };
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    componentWillUpdate (){
    }

    componentDidMount() {
        this.props.getUser();
        //const {user} =this.props;
    }

    render() {
        const {columns,data} = this.state;
        const {user} = this.props;
        //console.log(user._id);
        return (
            <div>
                <Bread bread={bread}/>
                <div className="content-bg">
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        title={() => '一线队球员'}
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
                        <ReactEcharts id={this.state.id} />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Home);