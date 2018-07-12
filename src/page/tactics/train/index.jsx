import React from 'react';

import Bread from '../../../components/bread/index';

const bread=[
    {href:"/index/tactics",title:"战术",icon:"dot-chart"},
    {href:"/index/tactics/train",title:"训练",icon:"exception"},
];

class TacticsTrain extends React.Component{
    render(){
        return (
            <div>
                <Bread bread={bread} />
                <div className="content-bg">
                    TacticsTrain
                </div>
            </div>
        )
    }
}

export default TacticsTrain;