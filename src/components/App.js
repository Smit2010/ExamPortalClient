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
import Paper from './Paper';
import EditQuestion from './Paper/EditQuestion'
import Question from './Paper/Question';

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
                            <Route path="/edit-question">
                                <EditQuestion />
                            </Route>
                            <Route path="/question-paper">
                                <Paper />
                            </Route>
                            <Route path="/add-question">
                                <Question />
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
                            <Route exact path="/question-paper">
                                <Paper/>
                            </Route>
                            <Route exact path="/add-question">
                                <Question/>
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
