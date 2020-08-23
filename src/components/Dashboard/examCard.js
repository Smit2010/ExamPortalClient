import React from 'react';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';

const ExamCard = ({exam}) => {

    const history = useHistory()

    const handleExamCardClick = (id) => {
        history.push(`/exam?${id}`)
    }

    return[
        <div className="columns is-centered question" style={{height: 200, padding: 0, width: "100%", margin: 0, cursor: "pointer"}} onClick={() => handleExamCardClick(exam.id)}>
            <div className="column is-narrow" style={{display: "flex", justifyContent: "center", flexDirection: "column", padding: "0 5%"}}>
                <img src={exam.photo} className="card__photo" style={{height: 150}} />
            </div>
            <div className="column" style={{marginTop: 25}}>
                <p>Subject : {exam.subjectName}</p>
                <p>Duration : {exam.duration}</p>
                <p>Date : {exam.date}</p>
                <p>Time : {exam.time}</p>
            </div>
        </div>,
        <Divider variant="middle"/>
    ];
}

export default ExamCard;