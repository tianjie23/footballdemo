import React from 'react';
import {Row, Col, Progress, Tooltip, Button} from 'antd';
import ReactEcharts from 'echarts-for-react';
import alters from '../../utils/alerts';

import {reqGet_Player_info,reqSet_Player_Experien} from '../../api/index';

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: {},
            data: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        let id = "0";
        if (this.props.id === nextProps.id) {
            id = this.props.id;
        } else {
            id = nextProps.id;
        }
        reqGet_Player_info({id: id})
            .then(
                res => {
                    if (res.data.status === 0) {
                        const data = res.data.data;
                        this.setState({
                            data: data,
                            option: {
                                color: ['#3398DB'],
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                    }
                                },
                                radar: [
                                    {

                                        indicator: [
                                            {text: '攻击', max: 100},
                                            {text: '防守', max: 100},
                                            {text: '体力', max: 100},
                                            {text: '速度', max: 100},
                                            {text: '带球', max: 100},
                                            {text: '短传', max: 100},
                                            {text: '长传', max: 100},
                                            {text: '射门', max: 100},
                                            {text: '技术', max: 100},
                                            {text: '守门', max: 100},
                                        ],
                                        center: ['50%', '50%'],
                                        radius: 80
                                    },
                                ],
                                series: [
                                    {
                                        type: 'radar',
                                        tooltip: {
                                            trigger: 'item'
                                        },
                                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                        data: [
                                            {
                                                value: [data.attack, data.defense, data.energy, data.speed, data.dribbling, data.short, data.long, data.shoot, data.skill, data.gatek],
                                                name: '属性'
                                            }
                                        ]
                                    },
                                ]
                            }
                        });
                    }
                }, err => {

                }
            )
    }

    componentDidMount() {
        reqGet_Player_info({id: this.props.id})
            .then(
                res => {
                    if (res.data.status === 0) {
                        const data = res.data.data;
                        this.setState({
                            data: data,
                            option: {
                                color: ['#3398DB'],
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                    }
                                },
                                radar: [
                                    {

                                        indicator: [
                                            {text: '攻击', max: 100},
                                            {text: '防守', max: 100},
                                            {text: '体力', max: 100},
                                            {text: '速度', max: 100},
                                            {text: '带球', max: 100},
                                            {text: '短传', max: 100},
                                            {text: '长传', max: 100},
                                            {text: '射门', max: 100},
                                            {text: '技术', max: 100},
                                            {text: '守门', max: 100},
                                        ],
                                        center: ['50%', '50%'],
                                        radius: 80
                                    },
                                ],
                                series: [
                                    {
                                        type: 'radar',
                                        tooltip: {
                                            trigger: 'item'
                                        },
                                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                        data: [
                                            {
                                                value: [data.attack, data.defense, data.energy, data.speed, data.dribbling, data.short, data.long, data.shoot, data.skill, data.gatek],
                                                name: '属性'
                                            }
                                        ]
                                    },
                                ]
                            }
                        });
                    }
                }, err => {

                }
            )
    }

    onUpTrain= () => {
        reqSet_Player_Experien({id:this.props.id})
            .then(
                res=>{
                    if(res.data.status===0){
                        this.setState({
                           data: res.data.data
                        });
                    }else{
                        alters(res.data.msg,"warning")
                    }
                },err=>{
                    alters(err,"error")
                }
            )
    };

    render() {
        const provalue = Math.round(this.state.data.experien/this.state.data.upgrade_experien*100);
        let tf="";
        if(this.state.data.talent===1){
            tf="无忧无虑"
        }else if(this.state.data.talent===2){
            tf="相当专业"
        }else if(this.state.data.talent===3){
            tf="敬业型"
        }else if(this.state.data.talent===4){
            tf="韧劲十足"
        }else if(this.state.data.talent===4){
            tf="钢铁般意志"
        }else if(this.state.data.talent===5){
            tf="天生领袖"
        }else if(this.state.data.talent===6){
            tf="自我鞭策"
        }else if(this.state.data.talent===7){
            tf="球员模范"
        }else if(this.state.data.talent===8){
            tf="极富魅力"
        }else if(this.state.data.talent===9){
            tf="完美主义"
        }
        return (//Math.round
            <div>
                <Row gutter={8}>
                    <Col md={12}>
                        <div>{this.state.data.truename}&nbsp;<span style={{color: "red"}}>v.{this.state.data.level}</span></div>
                        <div>{this.state.data.nation}</div>
                        <div>{this.state.data.age}岁</div>
                        <div>{this.state.data.height}cm</div>
                        <div>{this.state.data.position}</div>
                        <div>{this.state.data.feet}</div>
                        <div>{this.state.data.weight}kg</div>
                        <div>球员天赋：{tf}</div>
                        <div>经验</div>
                        <div>
                            <Tooltip title={`${this.state.data.experien}/${this.state.data.upgrade_experien}`}>
                                <Progress percent={provalue} status="active"/>
                            </Tooltip>
                        </div>
                        <div>
                            <Button type="primary" onClick={()=>this.onUpTrain()}>训练</Button>
                        </div>
                    </Col>
                    <Col md={12}>
                        <ReactEcharts option={this.state.option}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Player;