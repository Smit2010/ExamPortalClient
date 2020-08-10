import React from 'react'
import '../../Style/MainContainer.css'
import Card from './ExamCard'

function MainContainer() {
    return (
        <div className="mainContainer">
            <h1>Upcoming Exams</h1>
            <Card name="Maths" duration="3" date="12-12-12"/>
            <Card name="Maths" duration="3" date="12-12-12"/>
            <Card name="Maths" duration="3" date="12-12-12"/>

            <h1>Past Exams</h1>
            <Card name="Maths" duration="3" date="12-12-12"/>
            <Card name="Maths" duration="3" date="12-12-12"/>
            <Card name="Maths" duration="3" date="12-12-12"/>

        </div>
    )
}
 
export default MainContainer
