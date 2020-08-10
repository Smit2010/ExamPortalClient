import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Welcome from '../Welcome/Welcome.js';

class LandingPage extends React.Component{

    AuthenticatedUser = () => {
        return [
            <div className="column is-offset-5 is-centered is-2">
                <div class="control is-centered">
                    <button class="button is-rounded is-centered is-fullwidth" type="submit" style={{backgroundColor: "DarkSlateBlue"}}>
                    <p style={{color: "white"}}>Go to Chats</p>
                    </button>
                </div>
            </div>,
        ];
    }
    
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
            <div style={{backgroundColor: "#d6dbd7", height:"100vh"}}>
                <div className="container" style={{paddingTop: 20}}>
                    <div className="column is-centered">
                        <Welcome/>
                    </div>
                    {isAuthenticated ? this.AuthenticatedUser() : this.NonAuthenticatedUser()}
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