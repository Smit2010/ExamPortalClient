import React from "react";
import { connect } from "react-redux";
import { withRouter, Link, Redirect } from "react-router-dom";
import Welcome from '../Welcome/Welcome.js';

class LandingPage extends React.Component{
    
    NonAuthenticatedUser = () => {
        return [
            <div className="column is-offset-5 is-centered is-2">
                <div class="control is-centered">
                    <Link to="/signUp" class="button is-rounded is-centered is-fullwidth" type="submit" style={{backgroundColor: "DarkSlateBlue"}}>
                        <p style={{color: "white"}}>Get Started</p>
                    </Link>
                </div>
            </div>,
        ];
    }

    render(){
        const isAuthenticated = this.props.isAuthenticated;
        return(
            <div style={{backgroundColor: "#fff", height:"100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="container" style={{paddingTop: 20}}>
                    <div className="column is-centered">
                        <Welcome/>
                    </div>
                    {isAuthenticated ? <Redirect to="/dashboard"/> : this.NonAuthenticatedUser()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
	connect(mapStateToProps)(LandingPage)
);