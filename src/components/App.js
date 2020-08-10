import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import NavBar from './NavBar';
import './style.css'
import Login from './Auth/Login';
import Home from './Home';
import SignUp from './Auth/SignUp';
import Dashboard from './MainPage/Dashboard'

class App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route>
                        <NavBar/>
                        <Switch>
                            <Route path="/home">
                                <Home/>
                            </Route>
                            <Route path="/dashboard">
                                <Dashboard type="student"/>
                            </Route>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/signUp">
                                <SignUp/>
                            </Route>
                        </Switch>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
  
export default connect(mapStateToProps)(App);