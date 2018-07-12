import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux/store';
import './assets/css/style.less';
import Login from './page/login/index';
import Register from './page/register/index';
import CustomRouter from './page/router';
import Error from "./page/error";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Redirect exact from="/" to="/login"/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/index" component={CustomRouter}/>
                        <Route component={Error}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));