import React from 'react';
import {Switch, Route } from 'react-router-dom';

import TacticsUser from './user/index';
import TacticsTrain from './train/index';
import TacticsIndex from './index/index';
import TacticsFormation from './formation/index';

class TacticsRouter extends React.Component {

    render() {
        return (
            <Switch>
                <Route path="/index/tactics/user" component={TacticsUser} />
                <Route path="/index/tactics/train" component={TacticsTrain} />
                <Route path="/index/tactics/index" component={TacticsIndex} />
                <Route path="/index/tactics/formation" component={TacticsFormation} />
            </Switch>
        )
    }
}

export default TacticsRouter;