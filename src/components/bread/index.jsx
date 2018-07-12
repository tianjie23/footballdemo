import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import {Link} from 'react-router-dom';

class Bread extends React.Component{
    render(){
        const {bread} = this.props;
        return(
            <Breadcrumb className="breadcrumb">
                {
                    bread && bread.map((item,index) => {
                        return (
                            <Link to={item.href ? item.href : window.location.pathname} key={index}>
                                <Breadcrumb.Item>
                                {item.icon ? <Icon type={item.icon} /> : null}
                                {item.title ? <span>{item.title}</span> : null}
                                </Breadcrumb.Item>
                            </Link>
                            )
                    })
                }
            </Breadcrumb>
        )
    }
}

export default Bread;