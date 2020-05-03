import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from '../profile/profile';
import Header from '../header/header';
import Bmr from '../bmr/bmr';
import Calculators from '../calculators/calculators';
import Activity from '../activity/activity';
import Disclaimer from './disclaimer';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className={`app`}>
                    <Header/>
                    <Route path={`/`} exact component={Bmr}/>
                    <Route path={`/calculators`} exact component={Calculators}/>
                    <Route path={`/activity`} exact component={Activity}/>
                    <Route path={`/profile`} exact component={Profile}/>
                    <Route path={`/disclaimer`} exact component={Disclaimer}/>
                </div>
            </Router>
        );
    }
}
