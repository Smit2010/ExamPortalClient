import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const ExamCard = ({exam, user}) => {

    const history = useHistory()
    const [flag, setFlag] = useState(false)
    let temp = [...exam.date.split("-").reverse(), ...exam.time.split(":")]
    temp[1] = parseInt(temp[1]) - 1
    const examDate = new Date(...temp)
    const currDate = new Date()
    const endExamTime = new Date(...temp)
    endExamTime.setMinutes(endExamTime.getMinutes() + parseInt(exam.duration)*60)
    let diffInTimeFlag = 0
    let interval
    const [total, setTotal] = useState(Math.floor((examDate.getTime() - currDate.getTime())/1000))
    let diff
    if(examDate.getFullYear() > currDate.getFullYear()) {
        diff = examDate.getFullYear() - currDate.getFullYear() + " Years"
    } else if(examDate.getFullYear() == currDate.getFullYear() && examDate.getMonth() > currDate.getMonth()) {
        diff = examDate.getMonth() - currDate.getMonth() + " Months"
    } else if(examDate.getFullYear() == currDate.getFullYear() && examDate.getMonth() == currDate.getMonth() && examDate.getDate() > currDate.getDate()) {
        diff = examDate.getDate() - currDate.getDate() + " Days"
    } else if(examDate.getFullYear() == currDate.getFullYear() && examDate.getMonth() == currDate.getMonth() && examDate.getDate() == currDate.getDate() && examDate.getTime() > currDate.getTime()){
        diffInTimeFlag = 2
    } else {
        diffInTimeFlag = 1
    }

    const handleFlag = () => {
        if(currDate > endExamTime)
            history.push(`/exam?${exam.id}`)
        else
            setFlag(!flag)
    }

    const handleGoToExam = () => {
        history.push(`/exam?${exam.id}`)
    }

    const findTimeLeft = () => {
        if(diffInTimeFlag == 2) {
            return `Paper will be shown in ${new Date(total * 1000).toISOString().substr(11, 8)}`
        } else if(diffInTimeFlag == 0){
            return `Paper will be shown in ${diff}`
        } else {
            diffInTimeFlag = 1
            clearInterval(interval)
            return ""
        }
    }

    const find = () => {
        if(currDate >= examDate || user.type === "faculty") {
            return <button className="button is-success" onClick={() => handleGoToExam()}>Go to Exam</button>
        } else {
            return ""
        }
    }
    
    useEffect(() => {
        if(diffInTimeFlag == 2)
            interval = setInterval(() => setTotal(total => total-1), 1000)
        return () => {
            if(diffInTimeFlag == 2)
                clearInterval(interval)
        }
    }, [])

    return[
        <div className="columns is-centered question" style={{height: 200, padding: 0, width: "100%", margin: 0, cursor: "pointer"}} onClick={() => handleFlag()}>
            <div className="column is-narrow" style={{display: "flex", justifyContent: "center", flexDirection: "column", padding: "0 5%"}}>
                <img src={exam.photo} className="card__photo" style={{height: 150}} />
            </div>
            <div className="column" style={{marginTop: 25}}>
                <div style={{width: "fit-content", margin: "0px auto"}}>
                    <p>Subject : {exam.subjectName}</p>
                    <p>Duration : {exam.duration}</p>
                    <p>Date : {exam.date}</p>
                    <p>Time : {exam.time}</p>
                </div>
            </div>
            {/* Modal for Instructions */}
            <div className={`modal is-clipped ${flag ? "is-active" : ""}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Instructions</p>
                        <p className="subtitle" style={{margin: "0px 20px"}}>{findTimeLeft()}</p>
                        <button className="delete" aria-label="close" onClick={() => handleFlag()}></button>
                    </header>
                    <section className="modal-card-body is-flex" style={{justifyContent: "center"}}>
                        <div className="column is-flex" style={{flexDirection: "column"}}>
                        <b style={{marginLeft: "40px"}}><ol>{
                            exam.instructions.map(elem => <li>{elem.text}</li>)
                        }
                        <li>{`Exam paper duration is ${exam.duration} hours`}</li>
                        </ol></b>
                        </div>
                    </section>
                    <footer className="modal-card-foot" style={{justifyContent: "flex-end"}}>
                        {find()}
                        <button className="button is-success" onClick={() => handleFlag()}>Close</button>
                    </footer>
                </div>
            </div>
        </div>,
        <Divider variant="middle"/>
    ];
}

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(ExamCard);