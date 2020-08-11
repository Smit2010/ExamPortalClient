import React from 'react';
import Divider from '@material-ui/core/Divider';
import SideBar from '../SideBar';
import { withRouter } from "react-router-dom";
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
    RenderExamCard = (exam) => {
        return[
                <div className="columns is-centered" style={{height: 200, padding: 0, width: "100%", margin: 0}}>
                    <div className="column is-narrow" style={{display: "flex", justifyContent: "center", flexDirection: "column", padding: "0 5%"}}>
                        <img src={exam.photo} className="card__photo" style={{height: 150}} />
                    </div>
                    <div className="column" style={{marginTop: 25}}>
                        <p>Subject : {exam.name}</p>
                        <p>Duration : {exam.duration}</p>
                        <p>Date : {exam.date}</p>
                    </div>
                </div>,
            <Divider variant="middle"/>
        ];
    }
    render(){
        return(
            <div style={{backgroundColor: "#fff", height:"100%", display: "flex"}}>
                {this.renderDrawer()}
                <div className="container">
                    <div className= "column is-offset-3 is-6"  style={{marginTop: "7vh"}}>
                    <h1 className="title">Upcoming Exams</h1>
                        <div className="card" style={{padding: 0}}>
                            {sampleExam.map((exam) => (
                                this.RenderExamCard(exam)
                            ))}
                        </div>    
                    <h1 className="title" style={{marginTop: 20}}>Past Exams</h1>
                        <div className="card" style={{padding: 0}}>
                            {sampleExam.map((exam) => (
                                this.RenderExamCard(exam)
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