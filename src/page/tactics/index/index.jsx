import React from 'react';

import Bread from '../../../components/bread/index';

const bread=[
    {href:"/index/tactics",title:"战术",icon:"dot-chart"},
    {href:"/index/tactics/index",title:"战术",icon:"dot-chart"},
];

class TacticsIndex extends React.Component{
    render(){
        return (
            <div>
                <Bread bread={bread} />
                <div className="content-bg">
                    TacticsIndex
                </div>
            </div>
        )
    }
}

export default TacticsIndex;