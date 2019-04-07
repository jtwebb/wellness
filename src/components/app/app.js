import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from '../profile/profile';
import Header from '../header/header';
import Bmr from '../bmr/bmr';

class App extends Component {
    render() {
        return (
            <Router>
                <div className={`app`}>
                    <Header/>
                    <Route path={`/`} exact component={Bmr}/>
                    <Route path={`/profile`} exact component={Profile}/>
                </div>
            </Router>
        );
    }
}

export default App;
