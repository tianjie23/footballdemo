import React from 'react';

import Bread from '../../../components/bread/index';

const bread=[
    {href:"/index/user/info",title:"个人信息",icon:""},
];

class UserInfo extends React.Component{
    render(){
        return (
            <div>
                <Bread bread={bread} />
                <div className="content-bg">
                    UserInfo
                </div>
            </div>
        )
    }
}

export default UserInfo;