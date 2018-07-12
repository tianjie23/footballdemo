import React from 'react';
import {Button} from 'antd';


import alerts from '../../utils/alerts';
import {reqUpgrade_Facilities, reqGet_Upgrade_Facilities} from '../../api/index';
import CountDown from '../../utils/countDown';

import xlss from '../../assets/imgs/1.png';
import xyss from '../../assets/imgs/2.png';
import tyc from '../../assets/imgs/3.png';
import qtzx from '../../assets/imgs/4.png';
import ylzx from '../../assets/imgs/5.png';

import './index.less';

const nowTime = new Date().getTime();

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upgrade: false,
            level: this.props.item.level || 1,
            nowTime: this.props.item.nowTime || "",
        };
    }

    componentWillMount() {
        //console.log("nowtime",this.state.nowTime,nowTime - this.state.nowTime);
        console.log(this.state.nowTime,"zzzzzzzzzzzzzzzzzz")
        if (nowTime - this.state.nowTime >= 0) {
            this.setState({
                upgrade: true,
            })
        } else {
            this.setState({
                upgrade: false,
            });
        }
    }

    changeUpgrade = (stat) => {
        if (stat === 0) {
            reqUpgrade_Facilities({id: this.props.item._id, stat: 1}).then(
                res => {
                    if (res.data.status === 1) {
                        alerts(res.data.msg, "info");
                    } else {
                        this.setState({
                            upgrade: true,
                            level: res.data.level + 1
                        })
                    }
                }, err => {
                    console.log(err)
                }
            );
        } else {
            this.setState({
                upgrade: true,
            })
        }
    };

    handleUpgrade = (id) => {
        reqUpgrade_Facilities({id, stat: 0}).then(
            res => {
                if (res.data.status === 1) {
                    alerts(res.data.msg, "info");
                } else {
                    this.setState({
                        nowTime: res.data.nowTime,
                        upgrade: false,
                    })
                }
            }, err => {
                console.log(err)
            }
        );
    };

    render() {
        return (
            <div className="fac-list">
                <div>{
                    this.props.item.title && this.props.item.title === "训练设施" ? <img src={xlss}/> :
                        this.props.item.title === "学院设施" ? <img src={xyss}/> :
                            this.props.item.title === "体育场" ? <img src={tyc}/> :
                                this.props.item.title === "球探中心" ? <img src={qtzx}/> :
                                    this.props.item.title === "医疗中心" ? <img src={ylzx}/> : ""
                }</div>
                <div className="fac-title">{this.props.item.title}</div>
                <div className="fac-level">{this.state.level}级</div>
                <div>{
                    this.state.upgrade ?
                        this.state.level && this.state.level >= 9 ? "最高级"
                            :
                            <Button type="primary" onClick={() => this.handleUpgrade(this.props.item._id)}>升级</Button> :
                        <Button disabled>剩余时间：<CountDown changeUpgrade={(stat) => this.changeUpgrade(stat)}
                                                         nowTime={this.state.nowTime}/></Button>

                }</div>
            </div>
        )
    }
}

export default Item;