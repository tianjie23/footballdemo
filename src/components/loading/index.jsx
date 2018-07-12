import React from 'react';
import { Spin, Icon, message } from 'antd';

const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Loading extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:true
        }
    }

    componentDidMount(){
        //typeof this.props.onRef ==='function' && this.props.onRef(this);
        this.setState({
            loading:false
        })
    }

    onChangeLoading=(s)=>{
        this.setState({
            loading:s
        })
    };

    render(){
        return (
            <Spin spinning={this.state.loading} indicator={loadingIcon} tip="加载中...">
                {this.props.children}
            </Spin>
        );
    }
}

export default Loading;