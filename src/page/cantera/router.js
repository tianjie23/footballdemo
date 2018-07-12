import React from 'react';
import {Switch, Route } from 'react-router-dom';

import CanteraEchelon from './echelon/index';
import CanteraSelection from './selection/index';
import CanteraYouth from './youth/index';

class CanteraRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/index/cantera/echelon" component={CanteraEchelon} />
                <Route path="/index/cantera/selection" component={CanteraSelection} />
                <Route path="/index/cantera/youth" component={CanteraYouth} />
            </Switch>
        )
    }
}

export default CanteraRouter;