import React from 'react';
import SideBar from '../SideBar';
import ExamCard from './examCard';
import { withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import axios from 'axios';

const SERVER_URL = "http://127.0.0.1:5000";
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
    "duration" : "3",
    "date" : '22-12-2020',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png",
    "instructions" : [{
        "id" : "123",
        "text" : "xyz"
    },{
        "id" : "456",
        "text" : "lmn"
    },{
        "id" : "789",
        "text" : "abc"
    }]},
    {"id" : "2",
    "subjectName" : "Maths",
    "duration" : "3",
    "date" : '23-08-2020',
    "time" : '21:30:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png",
    "instructions" : [{
        "id" : "123",
        "text" : "xyz"
    },{
        "id" : "456",
        "text" : "lmn"
    },{
        "id" : "789",
        "text" : "abc"
    }]},
    {"id" : "3",
    "subjectName" : "Maths",
    "duration" : "3",
    "date" : '28-11-2020',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png",
    "instructions" : [{
        "id" : "123",
        "text" : "xyz"
    },{
        "id" : "456",
        "text" : "lmn"
    },{
        "id" : "789",
        "text" : "abc"
    }]},
    {"id" : "4",
    "subjectName" : "Maths",
    "subjectCode" : "IT999",
    "duration" : "3",
    "date" : '24-08-2020',
    "time" : '16:57:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png",
    "instructions" : [{
        "id" : "123",
        "text" : "xyz"
    },{
        "id" : "456",
        "text" : "lmn"
    },{
        "id" : "789",
        "text" : "abc"
    }]},
    {"id" : "5",
    "subjectName" : "Maths",
    "subjectCode" : "IT999",
    "duration" : "3",
    "date" : '28-11-2009',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png",
    "instructions" : [{
        "id" : "123",
        "text" : "xyz"
    },{
        "id" : "456",
        "text" : "lmn"
    },{
        "id" : "789",
        "text" : "abc"
    }]},
    {"id" : "6",
    "subjectName" : "Maths",
    "subjectCode" : "IT999",
    "duration" : "3",
    "date" : '28-11-2009',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png",
    "instructions" : [{
        "id" : "123",
        "text" : "xyz"
    },{
        "id" : "456",
        "text" : "lmn"
    },{
        "id" : "789",
        "text" : "abc"
    }]},
    {"id" : "7",
    "subjectName" : "Maths",
    "subjectCode" : "IT999",
    "duration" : "3",
    "date" : '28-11-2009',
    "time" : '12:00:00',
    "photo" : "https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png",
    "instructions" : [{
        "id" : "123",
        "text" : "xyz"
    },{
        "id" : "456",
        "text" : "lmn"
    },{
        "id" : "789",
        "text" : "abc"
    }]},
];

class Dashboard extends React.Component {
    
    constructor(props) {
        super(props)

        this.sampleExam = []
        axios.get(`${SERVER_URL}/get-all-exams`).then(res => {
            this.sampleExam = res.data
            // console.log(this.sampleExam)
        }).catch(err => {
            console.log(err)
        })
    }

    today = new Date()

    todayObject = {
        date: this.today.getDate() + '-' + (this.today.getMonth()+1) + '-' + this.today.getFullYear(),
        time: this.today.getHours() + ':' + this.today.getMinutes() + ':' + this.today.getSeconds()
    }

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

    handleLoadMorePapers = () => {
        this.props.history.replace('/pastexams')
    }

    findPastExams = (pastExams) => {
        let output = []
        let len = pastExams.length
        if(this.props.from === "dashboard")
            len = Math.min(3,len)
        for(let i=0;i<len;i++) {
            output.push(<ExamCard exam={pastExams[i]}/>)
        }
        return output
    }

    render(){
        // if(!this.props.isAuthenticated){
        //     return(
        //         <Redirect to="/home"/>
        //     );   
        // }
        let upcomingExams = [], pastExams = [], onGoingExams = []
        
        sampleExam.map(exam => {
            let temp = [...exam.date.split("-").reverse(), ...exam.time.split(":")]
            temp[1] = parseInt(temp[1]) - 1
            let endExamTime = new Date(...temp)
            endExamTime.setMinutes(endExamTime.getMinutes() + parseInt(exam.duration)*60)
            endExamTime = {
                date: endExamTime.getDate() + "-" + (parseInt(endExamTime.getMonth())+1) + "-" + endExamTime.getFullYear(),
                time: endExamTime.getHours() + ":" + endExamTime.getMinutes() + ":" + endExamTime.getSeconds()
            }
            if(cmp(exam, this.todayObject)) {
                upcomingExams.push(exam)
            } else if(cmp(endExamTime, this.todayObject)) {
                onGoingExams.push(exam)
            } else {
                pastExams.push(exam)
            }
        })
        upcomingExams.sort((a,b) => {
            return cmp(a,b)})
        onGoingExams.sort((a,b) => {
            return cmp(a,b)})
        pastExams.sort((a,b) => {
            return !cmp(a,b)})
            
        let count = 0

        return(
            <div style={{backgroundColor: "#fff", height:"100%", display: "flex"}}>
                {this.renderDrawer()}
                <div className="container">
                    <div className= "column is-offset-3 is-6"  style={{marginTop: "7vh"}}>
                        {
                            this.props.from === "dashboard" && onGoingExams.length > 0 ? (
                                <div>
                                    <h1 className="title">Ongoing Exams</h1>
                                    <div className="card" style={{padding: 0}}>
                                        {
                                            onGoingExams.map(exam => <ExamCard exam={exam}/>)
                                        }
                                    </div> 
                                </div> 
                            ) : ""
                        } 
                        {
                            this.props.from === "dashboard" ? (
                                <div>
                                    <h1 className="title" style={{marginTop: "20px"}}>Upcoming Exams</h1>
                                    <div className="card" style={{padding: 0}}>
                                        {
                                            upcomingExams.length == 0 ? <div className="subtitle">Hurrah!! All exams are cleared..</div> :
                                            upcomingExams.map(exam => <ExamCard exam={exam}/>)
                                        }
                                    </div> 
                                </div> 
                            ) : ""
                        } 
                        {  
                            pastExams.length == 0 ? "" : (
                                <div className="container">
                                    <h1 className="title" style={{marginTop: 20}}>Past Exams</h1>
                                    <div className="card" style={{padding: 0}}>
                                        {
                                            this.findPastExams(pastExams)
                                        }
                                    </div>
                                    {
                                        this.props.from === "dashboard" && pastExams.length > 3 ? (
                                            <div className="is-flex" style={{justifyContent: "center", marginTop: "20px"}}>
                                                <button className="button is-rounded is-link is-outlined" onClick={this.handleLoadMorePapers}>Load More Papers</button>
                                            </div>
                                        ) : ""
                                    }
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