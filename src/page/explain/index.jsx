import React from 'react';

import Bread from '../../components/bread/index';

const bread=[
    {href:"/index/explain",title:"项目说明",icon:"question-circle-o"},
];

class Explain extends React.Component{
    render(){
        return (
            <div>
                <Bread bread={bread} />
                <div className="content-bg">
                    explain
                </div>
            </div>
        )
    }
}

export default Explain;