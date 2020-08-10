import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter} from "react-router-dom";
import { logoutUser } from '../../actions/auth';
 
const NavBar = ({ isAuthenticated, logoutUser }) => {

    const renderLeft = () => {
		if (isAuthenticated) {
			return (
                <div className="navbar-item">
					<div className="button is-link is-light" onClick={logoutUser}>Logout</div>
				</div>
            );
		} else{
            return (
                <div className="navbar-item" key='end'>
					<div className="buttons" style={{marginTop: 5, marginBottom: 0}}>
						<Link to='/signUp' className="button is-link is-light" key='signup'>
							<strong>Sign up</strong>
						</Link>
						<Link to='/login' className="button is-link is-light" key='login'>
                            <strong>Log in</strong>
						</Link>
					</div>
				</div>
            );
        }
    }

	return (
        <nav className="navbar" role="navigation" aria-label="main navigation" style={{backgroundColor: "DarkSlateBlue", height: "7vh"}}>
			<div className="navbar-brand">
				<div className="navbar-item" key='logo'>
					<Link to='/home' >
						<h1 class="title is-4" style={{color: "white"}}>
                            ExamPortal
                        </h1>
					</Link>
				</div>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-end">
					{renderLeft()}
				</div>
			</div>
		</nav>
	)
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	logoutUser: () => dispatch(logoutUser(ownProps.history))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));