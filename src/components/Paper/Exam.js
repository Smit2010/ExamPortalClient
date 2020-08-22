import React, { Component } from 'react'
import QuestionCardMultiple from './QuestionCardMultiple'
import QuestionCardSingle from './QuestionCardSingle'
import QuestionCardDiagram from './QuestionCardDiagram'
import QuestionCardSubjective from './QuestionCardSubjective'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const sampleExam = {
    subjectName : "Maths",
    subjectCode : "IT999",
    marks: 100,
    date: "22-12-2020",
    time: "12:00:00",
    duration: (1)
}

//import if it is past exam
const studentAnswers = [{
    id: "1",
    answer: ["1.1", "1.2"]
},{
    id: "2",
    answer: ["2.1", "2.2"]
}
,{
    id: "3",
    answer: ["3.1"]
},{
    id: "4",
    answer: ["4.1"]
},{
    id: "5",
    answer: ["5.1"]
},{
    id: "6",
    answer: ["xyz"]
}]

const samplePaper = [{
    id: 1,
    type: "MULTIPLE",
    output: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
    optionList: [{
        id: "1.1",
        output: "<b>Energy transform into different form continuously.</b>"
    },{
        id: "1.2",
        output: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
    },{
        id: "1.3",
        output: "<b>Energy is consumed and cannot be used again.</b>"
    },{
        id: "1.4",
        output: "<b>All of these</b>"
    }],
    answer: ["1.1", "1.2"],
    marks: {
        correctAnswer: 1,
        wrongAnswer: -1,
        partiallyCorrect: 0.1,
        partialEnabled: true
    }
},{
    id: 2,
    type: "MULTIPLE",
    output: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
    optionList: [{
        id: "2.1",
        output: "<b>Energy transform into different form continuously.</b>"
    },{
        id: "2.2",
        output: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
    },{
        id: "2.3",
        output: "<b>Energy is consumed and cannot be used again.</b>"
    },{
        id: "2.4",
        output: "<b>All of these</b>"
    }],
    answer: ["2.2", "2.4"],
    marks: {
        correctAnswer: 1,
        wrongAnswer: -1,
        partiallyCorrect: 0.1,
        partialEnabled: true
    }
},{
    id: 3,
    type: "SINGLE",
    output: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
    optionList: [{
        id: "3.1",
        output: "<b>Energy transform into different form continuously.</b>"
    },{
        id: "3.2",
        output: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
    },{
        id: "3.3",
        output: "<b>Energy is consumed and cannot be used again.</b>"
    },{
        id: "3.4",
        output: "<b>All of these</b>"
    }],
    answer: ["3.1"],
    marks: {
        correctAnswer: 1,
        wrongAnswer: -1,
        partiallyCorrect: 0.1,
        partialEnabled: true
    }
},{
    id: 4,
    type: "SINGLE",
    output: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
    optionList: [{
        id: "4.1",
        output: "<b>Energy transform into different form continuously.</b>"
    },{
        id: "4.2",
        output: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
    },{
        id: "4.3",
        output: "<b>Energy is consumed and cannot be used again.</b>"
    },{
        id: "4.4",
        output: "<b>All of these</b>"
    }],
    answer: ["4.2"],
    marks: {
        correctAnswer: 1,
        wrongAnswer: -1,
        partiallyCorrect: 0.1,
        partialEnabled: true
    }
},{
    id: 5,
    type: "DIAGRAM",
    output: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
    optionList: [{
        id: "5.1",
        output: "<b>Energy transform into different form continuously.</b>"
    },{
        id: "5.2",
        output: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
    },{
        id: "5.3",
        output: "<b>Energy is consumed and cannot be used again.</b>"
    },{
        id: "5.4",
        output: "<b>All of these</b>"
    }],
    answer: ["5.2"],
    marks: {
        correctAnswer: 1,
        wrongAnswer: -1,
        partiallyCorrect: 0.1,
        partialEnabled: true
    }
},{
    id: 6,
    type: "SUBJECTIVE",
    output: "<b>what is your name?</b>",
    answer: ["xyz"],
    marks: {
        correctAnswer: 1,
        wrongAnswer: -1,
        partiallyCorrect: 0.1,
        partialEnabled: true
    }
}
]

let interval

class Exam extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            total: 3600*sampleExam.duration,
            answers: new Map()
        }
        const currDate = new Date()
        const pastDate = new Date()
        pastDate.setDate(sampleExam.date.split("-")[0])
        pastDate.setMonth(parseInt(sampleExam.date.split("-")[1])-1)
        pastDate.setFullYear(sampleExam.date.split("-")[2])
        pastDate.setHours(sampleExam.time.split(":")[0])
        pastDate.setMinutes(sampleExam.time.split(":")[1])
        pastDate.setSeconds(sampleExam.time.split(":")[2])
        this.past = currDate > pastDate
    }

    componentDidMount = () => {
        if(!this.past) {
            interval = setInterval(() => {
                this.setState(prevState => {
                    return {total: prevState.total - 1}
                })
            }, 1000)
        }
        // window.addEventListener('blur', () => alert('You are not allowed to leave page..'))
    }

    componentWillUnmount = () => {
        if(!this.past) {
            clearInterval(interval)
        }
        // window.clearInterval('blur')
    }

    findTimeLeft = () => {
        if(this.state.total == -1) {
            //submit paper
            alert('Times up!!')
            this.props.history.replace('/dashboard')
        }
        return new Date(this.state.total * 1000).toISOString().substr(11, 8)
    }

    handleAddAnswer = (id, answer) => {
        // console.log(id, this.state.answers ,answer)
        this.setState(prevState => {
            if(prevState.answers.has(id)) {
                prevState.answers.delete(id)
            }
            return {
                ...this.state,
                answers: prevState.answers.set(id, answer)
            }
        })
    }

    handleSubmit = () => {
        //upload this
        let studentResponse = {
            userId: this.props.user.id,
            examId: window.location.href.split("?")[1],
            answers: samplePaper.map(question => {
                // console.log(question)
                let studentAnswer = []
                if(this.state.answers.has(question.id)) {
                    studentAnswer = this.state.answers.get(question.id)
                }

                let options = []
                if(question.type !== "SUBJECTIVE") {
                    options.push(question.optionList.map(option => {
                        return {
                            id: option.id,
                            optionText: option.output
                        }
                    }))
                }

                return {
                    questionId: question.id,
                    questionText: question.output,
                    type: question.type,
                    marks: {
                        correctAnswer: question.marks.correctAnswer,
                        wrongAnswer: question.marks.wrongAnswer,
                        partiallyCorrect: question.marks.partiallyCorrect,
                        partialEnabled: question.marks.partialEnabled
                    },
                    options,
                    answer: question.answer,
                    studentAnswer
                }
            })
        }
        console.log(studentResponse)
        this.props.history.replace('/dashboard')
    }

    render() {
        // console.log(this.state.answers)
        // if(!this.props.isAuthenticated){
        //     return(
        //         <Redirect to="/home"/>
        //     );   
        // }
        let num = 0
        return (
            <div>
                <div className="container" style={{marginTop: "8vh"}}>
                    <div className="box is-flex" style={{flexDirection: "column", alignItems: "center"}}>
                        <div className="column">
                            <p className="title">{sampleExam.subjectCode} - {sampleExam.subjectName}</p>
                        </div>
                        <div className="column is-flex" style={{flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}> 
                            <p className="subtitle">Date : {sampleExam.date}</p>
                            <p className="subtitle">Total Marks : {sampleExam.marks}</p>
                        </div>
                    </div>
                    {/* {console.log(studentAnswers.filter(answer => answer.id === question.id))} */}
                    <div className="box">
                        {
                            samplePaper.map(question => {
                                // console.log(studentAnswers.filter(answer => answer.id == question.id))
                                // let correct = (JSON.stringify(question.answer) == JSON.stringify(studentAnswers[num].answer))
                                // console.log(JSON.stringify(question.answer), studentAnswers[num].answer, correct)
                                // console.log(studentAnswers)
                                num++
                                switch(question.type) {
                                    case "MULTIPLE":
                                        return <QuestionCardMultiple id={question.id} num={num} output={question.output} optionList={question.optionList} show={false} past={this.past} correctAnswer={question.answer} studentAnswer={studentAnswers.filter(answer => answer.id == question.id)[0].answer} handleAddAnswer={this.handleAddAnswer}/>
                                    case "SINGLE":
                                        return <QuestionCardSingle id={question.id} num={num} output={question.output} optionList={question.optionList} show={false} past={this.past} correctAnswer={question.answer} studentAnswer={studentAnswers.filter(answer => answer.id == question.id)[0].answer} handleAddAnswer={this.handleAddAnswer}/>
                                    case "DIAGRAM":
                                        return <QuestionCardDiagram id={question.id} num={num} output={question.output} optionList={question.optionList} show={false} past={this.past} correctAnswer={question.answer} studentAnswer={studentAnswers.filter(answer => answer.id == question.id)[0].answer} handleAddAnswer={this.handleAddAnswer}/>
                                    case "SUBJECTIVE":
                                        return <QuestionCardSubjective id={question.id} num={num} output={question.output} show={false} past={this.past} correctAnswer={question.answer} studentAnswer={studentAnswers.filter(answer => answer.id == question.id)[0].answer} handleAddAnswer={this.handleAddAnswer}/>
                                }
                            })
                        }
                    </div>
                    {
                        !this.past ? (
                            <div className="is-flex" style={{width: "100%", justifyContent: "center", marginBottom: "80px"}}>
                                <button className="button is-rounded is-outlined is-link" style={{width: "100%"}} onClick={this.handleSubmit}>Submit</button>
                            </div>
                        ) : ""
                    }
                </div>
                {
                    !this.past ? (
                    <div className="box is-flex" style={{position: "fixed", justifyContent: "flex-end", padding: "5px", borderRadius: "0px", fontSize: "20px", width: "100%", bottom: 0, background: "darkslateblue", color: "white"}}>
                        <p>Time left : {this.findTimeLeft()}</p>
                    </div>) : ""
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.auth.user
});

export default withRouter(connect(mapStateToProps)(Exam))
