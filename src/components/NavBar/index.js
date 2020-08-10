import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter} from "react-router-dom";
import { logoutUser } from '../../actions/auth';
import { drawerOpen, drawerClose } from '../../actions/drawer';
import IconButton from '@material-ui/core/IconButton';

const drawerWidth = 240;
 
const NavBar = ({ isAuthenticated, logoutUser, isDrawerOpen, toggleDrawer }) => {

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

    const renderBurgerIcon = () => {
        const handleClick = () => {
            toggleDrawer(isDrawerOpen);
        }
        if(isAuthenticated){
            return(    
                <div className="column is-narrow" style={{display: "flex", justifyContent: "center", marginLeft: 20}}>
                    <IconButton aria-label="open drawer" edge="start" onClick={handleClick}>
                        <span className="icon">
                            <i className="fas fa-bars" style={{color: "white", fontSize: "20px"}}/>
                        </span>
                    </IconButton>
                </div>
            );
        }
    }

	return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation" style={{backgroundColor: "DarkSlateBlue", height: "7vh"}}>   
			<div className="navbar-brand" style={{display: "flex", justifyContent: "center"}}>
                <div className="columns is-vcentered is-gapless" style={{display: "flex", flex: 1, justifyContent: "center"}}>
                    {renderBurgerIcon()}
                    <div className="column" style={{marginLeft: 20}}>
                        <Link to='/home' >
                            <h1 class="title is-4" style={{color: "white"}}>
                                ExamPortal
                            </h1>
                        </Link>
                    </div>
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
    isAuthenticated: state.auth.isAuthenticated,
    isDrawerOpen: state.drawer.isDrawerOpen,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    logoutUser: () => dispatch(logoutUser(ownProps.history)),
    toggleDrawer: (isDrawerOpen) => {isDrawerOpen ? dispatch(drawerClose()) : dispatch(drawerOpen())}
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));