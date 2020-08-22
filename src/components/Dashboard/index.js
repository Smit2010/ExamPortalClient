import React from 'react';
import SideBar from '../SideBar';
import ExamCard from './examCard';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const cmp = (a,b) => {
    let temp1 = new Date(), temp2 = new Date()
    temp1.setDate(a.date.split("-")[0])
    temp1.setMonth(parseInt(a.date.split("-")[1])-1)
    temp1.setFullYear(a.date.split("-")[2])
    temp1.setHours(a.time.split(":")[0])
    temp1.setMinutes(a.time.split(":")[1])
    temp1.setSeconds(a.time.split(":")[2])

    temp2.setDate(b.date.split("-")[0])
    temp2.setMonth(parseInt(b.date.split("-")[1])-1)
    temp2.setFullYear(b.date.split("-")[2])
    temp2.setHours(b.time.split(":")[0])
    temp2.setMinutes(b.time.split(":")[1])
    temp2.setSeconds(b.time.split(":")[2])
    
    return temp1 > temp2
}

const sampleExam = [
    {"id" : "1",
    "subjectName" : "Maths",
    "duration" : "3hr",
    "date" : '22-12-2020',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"},
    {"id" : "2",
    "subjectName" : "Maths",
    "duration" : "3hr",
    "date" : '12-12-2012',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"},
    {"id" : "3",
    "subjectName" : "Maths",
    "duration" : "3hr",
    "date" : '28-11-2020',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"},
    {"id" : "4",
    "subjectName" : "Maths",
    "subjectCode" : "IT999",
    "duration" : "3hr",
    "date" : '28-11-2009',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"},
];

const today = new Date()

const todayObject = {
    date: today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear(),
    time: today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
}

class Dashboard extends React.Component {
    renderDrawer = () => {
        if(this.props.isDrawerOpen){
            return(
                <div className="column is-narrow" style={{height: "93vh", justifyContent: "start", 
                    padding: 0, marginTop: "7vh", width: "240px", marginLeft: "0px", transition: "margin 0.7s"}}>
                    <SideBar/>
                </div>
            );
        } else{
            return(
                <div className="column is-narrow" style={{height: "93vh", justifyContent: "start", 
                    padding: 0, marginTop: "7vh", width: "240px", marginLeft: "-240px", transition: "margin 0.7s"}}>
                    <SideBar/>
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
        let upcomingExams = [], pastExams = []
        sampleExam.map(exam => {
            if(cmp(exam, todayObject)) {
                upcomingExams.push(exam)
            } else {
                pastExams.push(exam)
            }
        })
        upcomingExams.sort((a,b) => {
            return cmp(a,b)})
        pastExams.sort((a,b) => {
            return !cmp(a,b)})
      
        return(
            <div style={{backgroundColor: "#fff", height:"100%", display: "flex"}}>
                {this.renderDrawer()}
                <div className="container">
                    <div className= "column is-offset-3 is-6"  style={{marginTop: "7vh"}}>
                        <h1 className="title">Upcoming Exams</h1>
                        <div className="card" style={{padding: 0}}>
                            {
                                upcomingExams.length == 0 ? <div className="subtitle">Hurrah!! All exams are cleared..</div> :
                                upcomingExams.map(exam => <ExamCard exam={exam}/>)
                            }
                        </div>   
                        {  
                            pastExams.length == 0 ? "" : (
                                <div className="container">
                                    <h1 className="title" style={{marginTop: 20}}>Past Exams</h1>
                                    <div className="card" style={{padding: 0}}>
                                        {
                                            pastExams.map(exam => <ExamCard exam={exam}/>)
                                        }
                                    </div>
                                </div>
                            )
                        }   
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