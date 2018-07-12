import React from 'react';
import {connect} from "react-redux";
import { Row, Col } from 'antd';

import Bread from '../../components/bread/index';
import {getFacilities} from "../../redux/actions";
import Item from './item';

const bread=[
    {href:"/index/facilities",title:"设施",icon:"bar-chart"},
];

class Facilities extends React.Component{
    componentWillMount(){
        const {facilities} = this.props;
        if(!facilities.title){
            this.props.getFacilities();
        }
    }
    render(){
        const {facilities} = this.props;
        return (
            <div>
                <Bread bread={bread} />
                <div className="content-bg">
                    <Row gutter={16}>
                        {
                            facilities.length && facilities.map(item=>{
                                return (
                                    <Col md={4} key={item._id}>
                                        <Item item={item} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div>
        )
    }
}

export default connect(
    state=>({facilities:state.facilities}),
    {getFacilities}
)(Facilities);