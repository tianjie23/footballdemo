import React from 'react';

import Bread from '../../components/bread/index';

const bread=[
    {href:"/index/setting",title:"设置",icon:"setting"},
];

class Setting extends React.Component{
    render(){
        return (
            <div>
                <Bread bread={bread} />
                <div className="content-bg">
                    Setting
                </div>
            </div>
        )
    }
}

export default Setting;