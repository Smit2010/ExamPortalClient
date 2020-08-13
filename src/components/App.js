import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import './style.css'
import Login from './Auth/Login';
import Home from './Home';
import SignUp from './Auth/SignUp';
import Dashboard from './Dashboard';
import Profile from './Profile';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route>
                        <NavBar/>
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/home"/>
                            </Route>
                            <Route path="/dashboard">
                                <Dashboard type="student"/>
                            </Route>
                            <Route exact path="/home">
                                <Home/>
                            </Route>
                            <Route exact path="/login">
                                <Login/>
                            </Route>
                            <Route exact path="/signup">
                                <SignUp/>
                            </Route>
                            <Route exact path="/me">
                                <Profile/>
                            </Route>
                        </Switch>
                    </Route>
                </Switch>
                <ToastContainer position="bottom-right" />
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
  
export default connect(mapStateToProps)(App);