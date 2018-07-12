import React from 'react';
import {Row, Col, Menu, Dropdown, Icon, Button, List, Avatar, Spin} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {getUser, setFormation} from '../../../redux/actions';

import Bread from '../../../components/bread/index';

import court from '../../../assets/imgs/court.jpg';
import qiuyuan from '../../../assets/imgs/qiuyuan.png';
import {formation_data} from './data';
import alerts from '../../../utils/alerts';

import './index.less';
import {reqGet_Player, reqSet_Starter, reqGet_Starter} from "../../../api";

const {SubMenu} = Menu;
const bread = [
    {href: "/index/tactics", title: "战术", icon: "dot-chart"},
    {href: "/index/tactics/formation", title: "阵型", icon: "code-o"},
];

let pos = [];
for(let i=1;i<=11;i++){
    pos.push(i)
}


class TacticsFormation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            hasMore: true,
            formation: "4-4-2",
            position: [],
            starter:[],
        }
    }


    lineUp = (e, item) => {
        //console.log(e.key,item);
        reqSet_Starter({id:item._id,starter_pos:e.key})
            .then(
                res=>{
                    //console.log(res.data.status)
                    if(res.data.status===0){
                        this.getStarter();
                        this.getData();
                    }else{
                        alerts(res.data.msg,"warning");
                    }
                },err=>{
                    alerts(err,"warning")
                }
            )
    };

    menu = (
        <Menu>
            {
                formation_data.map((item, index) => {
                    return (
                        <SubMenu title={item.title} key={index}>
                            {
                                item.sub.map(item2 => {
                                    return (
                                        <Menu.Item key={item2.key} onClick={() => this.onFormation(item2)}>
                                            {item2.title}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                    )
                })
            }
        </Menu>
    );

    getData = () => {
        reqGet_Player({types: 0, limit: 0})
            .then(
                res => {
                    if (res.data.status === 0) {
                        this.setState({
                            res_data: res.data.data,
                            count: res.data.data.length
                        });

                        let data = [];
                        this.state.res_data.length && this.state.res_data.forEach(v => {
                            Object.assign(v, {key: v._id});
                            v.truename = v.nickname || v.truename;
                            data.push(v)
                        });
                        this.setState({
                            data: data,
                            loading: false,
                        });
                    }
                }, err => {
                    this.setState({
                        data: []
                    });
                }
            )
    };

    getStarter=()=>{
        reqGet_Starter()
            .then(
                res=>{
                    if(res.data.status===0){
                        this.setState({
                            starter:res.data.data
                        })
                    }else{
                        alerts(res.data.msg,"warning");
                    }
                },err=>{
                    alerts(err,"warning");
                }
            )
    };

    componentDidMount() {
        this.props.getUser();
        this.setState({
            formation: this.props.user.formation,
            position: this.props.user.formation_position
        });
        this.getData();
        this.getStarter();
        //this.props.getStarter();
        //console.log(this.props.player.truename,"aaa");
    }

    onFormation = (item2) => {
        this.setState({
            formation: item2.key,
            position: item2.position
        }, () => {
            this.props.setFormation(this.state.formation, this.state.position);
        });
    };

    handleInfiniteOnLoad = () => {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 4) {
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.getData();
    };

    imgClick = (e) => {
        //console.log(e.target);
        e.target = "aaa"
    };

    render() {
        //console.log(this.state.starter.length);
        return (
            <div>
                <Bread bread={bread}/>
                <div className="content-bg">

                    <Row gutter={8}>
                        <Col md={24}>
                            <div className="formation">
                                <Dropdown overlay={this.menu} trigger={['click']}>
                                    <Button>
                                        {this.state.formation}<Icon type="down"/>
                                    </Button>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col md={12}>
                            <div className="formation">
                                <div className="court">
                                    <img src={court} draggable="false"/>
                                    <div onClick={(e) => this.imgClick(e)} className="qiuyuan"
                                         style={{left: 20, top: 180}}>
                                        <div className="qiuyuanc">
                                            <img src={qiuyuan} draggable="false"/>
                                            <div className="qiuyuanc-index">1号位</div>
                                            <div className="qiuyuanc-name">
                                                {
                                                    this.state.starter.map(item=>{
                                                        console.log(item.stat_pos)
                                                        if(item.stat_pos===1){
                                                            return (
                                                                <div key={item._id}>
                                                                    <Avatar className="head_img" src={item.pic}/>
                                                                    <div className="head-name">
                                                                        {item.nickname || item.truename}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.position.map((item, index) => {
                                            return (
                                                <div key={index} className="qiuyuan"
                                                     style={{left: item.l, top: item.t}}>

                                                    <div className="qiuyuanc">
                                                        <img src={qiuyuan} draggable="false"/>
                                                        <div className="qiuyuanc-index">{index + 2}号位</div>

                                                        <div className="qiuyuanc-name">
                                                        {
                                                            this.state.starter.map(item2=>{
                                                                //console.log(item2.stat_pos);
                                                                if(item2.stat_pos===index + 2){
                                                                    return (
                                                                        <div key={item2._id}>
                                                                            <Avatar className="head_img" src={item2.pic}/>
                                                                            <div className="head-name">
                                                                                {item2.nickname || item2.truename}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </Col>
                        <Col md={12} className="qiuyuanList">
                            <div className="qiuyuanList-title">点击头像进行排阵</div>
                            <InfiniteScroll
                                initialLoad={false}
                                pageStart={1}
                                loadMore={this.handleInfiniteOnLoad}
                                hasMore={!this.state.loading && this.state.hasMore}
                                useWindow={true}
                            >
                                <List
                                    dataSource={this.state.data}
                                    renderItem={item => (
                                            <List.Item key={item.id}>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Dropdown overlay={
                                                            <Menu>
                                                                <SubMenu title="调整位置" key="0">
                                                                    {
                                                                        pos.map(i=>{
                                                                            return <Menu.Item onClick={(e)=>this.lineUp(e,item)} key={i}>{i}号位</Menu.Item>
                                                                        })
                                                                    }
                                                                </SubMenu>
                                                            </Menu>
                                                        } trigger={['click']}>
                                                        <Avatar
                                                        src={item.pic}/>
                                                        </Dropdown>}
                                                    title={`${item.nickname || item.truename}`}
                                                    description={`${item.position} ${item.age}岁 ${item.height}cm`}
                                                />
                                                <div>{item.stat===1?<span style={{color:"red"}}>首发{item.stat_pos}号位</span>:'替补'}</div>
                                            </List.Item>
                                    )}
                                >
                                    {this.state.loading && this.state.hasMore && (
                                        <div className="demo-loading-container">
                                            <Spin/>
                                        </div>
                                    )}
                                </List>
                            </InfiniteScroll>

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser, setFormation}
)(TacticsFormation);