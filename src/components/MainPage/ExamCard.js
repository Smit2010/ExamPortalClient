import React from 'react'
import '../../Style/ExamCard.css'
import DateRangeIcon from '@material-ui/icons/DateRange';

function Card({name,duration,date,photo="https://toppng.com/uploads/preview/person-vector-11551054765wbvzeoxz2c.png"}) {
    return (
        <div className="card">
            <img src={photo} className="card__photo" />
            <div className="card__info">
                <h2>Subject : {name}</h2>
                <h4>Duration : {duration}</h4>
            </div>
            <div className="card__date">
                <h4>Date : {date}</h4>
                <div className="card__icon">
                    <DateRangeIcon />
                </div>
            </div>
        </div>
    )
}

export default Card
