import React from 'react';
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import './styles.css';

const facultyList = [
    {"icon" : "fas fa-user fa-lg",
    "title" : "Profile"},
    {"icon" : "fas fa-plus-circle fa-lg",
    "title" : "Create New Exam"},
    {"icon" : "fas fa-archive fa-lg",
    "title" : "View Past Exams"}
];

const studentList = [
    {"icon" : "far fa-user fa-lg",
    "title" : "Profile"},
    {"icon" : "fas fa-cabinet-filing fa-lg",
    "title" : "View Past Exams"},
    {"icon" : "fas fa-poll fa-lg",
    "title" : "View Results"}
];

let t = [];

const SideBar = ({list, user}) => {
    const history = useHistory();
    const handleClick = (item) => {
        if(item === "Profile"){
            history.push('/me');
        } else{
            
        }
    }
    
    if(list){
        t = list;
    } else{
        if(user.type==='student'){
            t = studentList;
        } else{
            t = facultyList;
        }
    }

    return (
        <div className="card" style={{position: "fixed", height: "100%", width: "240px"}}>
            <div className="column" style={{padding: 0}}>
                {t.map((listItem) => (
                    <div className="listButton columns is-vcentered" style={{ height: 100, margin:0, padding: "5% 0"}} onClick={() => handleClick(listItem.title)} >
                        <div className="column is-narrow" style={{height: "100%", alignItems: "center", justifyContent: "center", display: "flex", padding: "5% 0", marginLeft: 20}}>
                            <div>
                                <span className="icon">
                                    <i className={listItem.icon}/>
                                </span>
                            </div>
                        </div>
                        <div className="column is-8" style={{ height: "100%", padding: 0, alignItems: "center", justifyContent: "start", display: "flex", marginLeft: 20 }}>
                            <span>
                                    <p style={{color: "black"}}>{listItem.title}</p>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
    
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default withRouter(
	connect(mapStateToProps)(SideBar)
);