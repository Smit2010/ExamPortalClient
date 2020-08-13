import React from 'react';
import SideBar from '../SideBar';
import ExamCard from './examCard';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const sampleExam = [
    {"name" : "Maths",
    "duration" : "3h",
    "date" : "August 11",
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"},
    {"name" : "Maths",
    "duration" : "3h",
    "date" : "August 11",
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"},
    {"name" : "Maths",
    "duration" : "3h",
    "date" : "August 11",
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"},
];

const list = [
    {"icon" : "fas fa-bars fa-lg",
    "title" : "Profile"},
    {"icon" : "fas fa-bars fa-lg",
    "title" : "Create new exam"},
]

class Dashboard extends React.Component {
    renderDrawer = () => {
        if(this.props.isDrawerOpen){
            return(
                <div className="column is-narrow" style={{height: "93vh", justifyContent: "start", padding: 0, marginTop: "7vh", width: "240px", marginLeft: "0px", transition: "margin 0.7s"}}>
                    <SideBar list={list}/>
                </div>
            );
        } else{
            return(
                <div className="column is-narrow" style={{height: "93vh", justifyContent: "start", padding: 0, marginTop: "7vh", width: "240px", marginLeft: "-240px", transition: "margin 0.7s"}}>
                    <SideBar list={list}/>
                </div>
            );
        }
    };

    render(){
        if(!this.props.isAuthenticated){
            return(
                <Redirect to="/home"/>
            );   
        }
        return(
            <div style={{backgroundColor: "#fff", height:"100%", display: "flex"}}>
                {this.renderDrawer()}
                <div className="container">
                    <div className= "column is-offset-3 is-6"  style={{marginTop: "7vh"}}>
                    <h1 className="title">Upcoming Exams</h1>
                        <div className="card" style={{padding: 0}}>
                            {sampleExam.map((exam) => (
                                <ExamCard exam={exam}/>
                            ))}
                        </div>    
                    <h1 className="title" style={{marginTop: 20}}>Past Exams</h1>
                        <div className="card" style={{padding: 0}}>
                            {sampleExam.map((exam) => (
                                <ExamCard exam={exam}/>
                            ))}
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isDrawerOpen: state.drawer.isDrawerOpen,
});

export default withRouter(connect(mapStateToProps)(Dashboard));