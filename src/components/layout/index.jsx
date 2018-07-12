import React from 'react';
import {Layout} from 'antd';

import Header from '../header/index';
import Footer from '../footer/index';
import './index.less';

const { Content } = Layout;

class Main extends React.Component{
    render(){
        return (
            <Layout className="layout">
                <Header />
                <Content className="content">
                    { this.props.children }
                </Content>
                <Footer />
            </Layout>
        )
    }
}

export default Main;