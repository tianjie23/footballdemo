import React from 'react';
import {Layout, Row, Col} from 'antd';

import SilderMenu from '../menu/index';

class Header extends React.Component {

    render() {
        return (
            <Layout.Header className="rowmp">
                <Row>
                    <Col md={3}>
                        <div className="logo">
                            <span>F</span>
                            <span>O</span>
                            <span>O</span>
                            <span>T</span>
                            <span>B</span>
                            <span>A</span>
                            <span>L</span>
                            <span>L</span>
                            <span>M</span>
                            <span>A</span>
                            <span>N</span>
                            <span>A</span>
                            <span>G</span>
                            <span>E</span>
                            <span>R</span>
                        </div>
                    </Col>
                    <Col md={21}>
                        <SilderMenu />
                    </Col>
                </Row>
            </Layout.Header>
        )
    }
}

export default Header;