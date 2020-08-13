import React, { Component } from 'react';
import StudentProfile from './StudentProfile';
import FacultyProfile from './FacultyProfile';
import SideBar from '../SideBar';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


class Profile extends Component {

    renderDrawer = () => {
        if(this.props.isDrawerOpen && this.props.isAuthenticated){
            return(
                <div className="column is-narrow" style={{height: "100vh", justifyContent: "start", 
                    padding: 0, marginTop: "7vh", width: "240px", marginLeft: "0px", transition: "margin 0.7s"}}>
                    <SideBar/>
                </div>
            );
        } else{
            return(
                <div className="column is-narrow" style={{height: "100vh", justifyContent: "start", 
                    padding: 0, marginTop: "7vh", width: "240px", marginLeft: "-240px", transition: "margin 0.7s"}}>
                    <SideBar/>
                </div>
            );
        }
    }

    render() {
        if(!this.props.isAuthenticated){
            return(
                <Redirect to="/home"/>
            );   
        }
        return (
            <div className="columns" style={{backgroundColor: "#fff", display: "flex"}}>
                <div className="column is-narrow">
                    {this.renderDrawer()}
                </div>
                <div className="column">
                    <div className="container">
                        {this.props.user.type === 'student' ?
                            <StudentProfile name={this.props.user.firstName + " " + this.props.user.lastName} 
                            photo={"https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"} 
                            student_id={this.props.user.studentId} email={this.props.user.email} /> 
                            : 
                            <FacultyProfile name={this.props.user.firstName + " " + this.props.user.lastName} 
                            photo={"https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"} 
                            email={this.props.user.email} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isDrawerOpen: state.drawer.isDrawerOpen,
    user : state.auth.user,
});

export default withRouter(connect(mapStateToProps)(Profile));