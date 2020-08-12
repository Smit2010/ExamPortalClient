import React from 'react';
import Divider from '@material-ui/core/Divider';

const ExamCard = ({exam}) => {
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

export default ExamCard;