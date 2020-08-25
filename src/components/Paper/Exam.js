import React, { Component } from 'react'
import QuestionCardMultiple from './QuestionCardMultiple'
import QuestionCardSingle from './QuestionCardSingle'
import QuestionCardDiagram from './QuestionCardDiagram'
import QuestionCardSubjective from './QuestionCardSubjective'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';

const SERVER_URL = "http://127.0.0.1:5000";
//import from course model in both the cases
const sampleExam = {
    courseName : "Maths",
    semester: "7",
    assignedFaculty: "xyz"
}

//import from answers model if it is past exam
const samplePastExam = {
    userId: "123",
    examId: "1",
    answers: [{
        questionId: "1",
        type: "MULTIPLE",
        questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
        marks: {
            correctAnswer: 1,
            wrongAnswer: -1,
            partiallyCorrect: 0.1,
            partialEnabled: true
        },
        options: [{
            id: "1.1",
            optionText: "<b>Energy transform into different form continuously.</b>"
        },{
            id: "1.2",
            optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
        },{
            id: "1.3",
            optionText: "<b>Energy is consumed and cannot be used again.</b>"
        },{
            id: "1.4",
            optionText: "<b>All of these</b>"
        }],
        answer: [{
            text: "1.1"
        },{
            text: "1.2"
        }],
        studentAnswer: [{
            text: "1.1"
        },{
            text: "1.2"
        }],
        correctFlag: "true"
    },{
        questionId: "2",
        type: "MULTIPLE",
        questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
        marks: {
            correctAnswer: 1,
            wrongAnswer: -1,
            partiallyCorrect: 0.1,
            partialEnabled: true
        },
        options: [{
            id: "2.1",
            optionText: "<b>Energy transform into different form continuously.</b>"
        },{
            id: "2.2",
            optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
        },{
            id: "2.3",
            optionText: "<b>Energy is consumed and cannot be used again.</b>"
        },{
            id: "2.4",
            optionText: "<b>All of these</b>"
        }],
        answer: [{
            text: "2.1"
        },{
            text: "2.2"
        }],
        studentAnswer: [{
            text: "2.3"
        },{
            text: "2.2"
        }],
        correctFlag: "partial"
    },{
        questionId: "3",
        type: "SINGEL",
        questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
        marks: {
            correctAnswer: 1,
            wrongAnswer: -1,
            partiallyCorrect: 0.1,
            partialEnabled: true
        },
        options: [{
            id: "3.1",
            optionText: "<b>Energy transform into different form continuously.</b>"
        },{
            id: "3.2",
            optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
        },{
            id: "3.3",
            optionText: "<b>Energy is consumed and cannot be used again.</b>"
        },{
            id: "3.4",
            optionText: "<b>All of these</b>"
        }],
        answer: [{
            text: "3.1"
        }],
        studentAnswer: [{
            text: "3.1"
        }],
        correctFlag: "true"
    },{
        questionId: "4",
        type: "SINGLE",
        questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
        marks: {
            correctAnswer: 1,
            wrongAnswer: -1,
            partiallyCorrect: 0.1,
            partialEnabled: true
        },
        options: [{
            id: "4.1",
            optionText: "<b>Energy transform into different form continuously.</b>"
        },{
            id: "4.2",
            optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
        },{
            id: "4.3",
            optionText: "<b>Energy is consumed and cannot be used again.</b>"
        },{
            id: "4.4",
            optionText: "<b>All of these</b>"
        }],
        answer: [{
            text: "4.1"
        }],
        studentAnswer: [{
            text: "4.2"
        }],
        correctFlag: "false"
    },{
        questionId: "5",
        type: "DIAGRAM",
        questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
        marks: {
            correctAnswer: 1,
            wrongAnswer: -1,
            partiallyCorrect: 0.1,
            partialEnabled: true
        },
        options: [{
            id: "5.1",
            optionText: "<b>Energy transform into different form continuously.</b>"
        },{
            id: "5.2",
            optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
        },{
            id: "5.3",
            optionText: "<b>Energy is consumed and cannot be used again.</b>"
        },{
            id: "5.4",
            optionText: "<b>All of these</b>"
        }],
        answer: [{
            text: "5.4"
        }],
        studentAnswer: [{
            text: "5.4"
        }],
        correctFlag: "true"
    },{
        questionId: "6",
        type: "SUBJECTIVE",
        questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
        marks: {
            correctAnswer: 1,
            wrongAnswer: -1,
            partiallyCorrect: 0.1,
            partialEnabled: true
        },
        answer: [{
            text: "xyz"
        }],
        studentAnswer: [{
            text: "xyz"
        }],
        correctFlag: "true"
    }],
    result: {
        totalMarks: 100,
        obtainedMarks: 100
    }
}

//import from exam model if not past exam
// let samplePaper = {
//     _id: "5f43f0b16923c919343b5622",
//     courseId: "123",
//     facultyId: "1",
//     students: [],
//     totalMarks: 100,
//     duration: 2,
//     scheduledTime: {
//         date: "24-08-2020",
//         time: "22:13:00"
//     },
//     questions: [{
//         _id: "5f43f0b16923c919343b5623",
//         type: "MULTIPLE",
//         questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
//         options: [{
//             id: "1.1",
//             optionText: "<b>Energy transform into different form continuously.</b>"
//         },{
//             id: "1.2",
//             optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
//         },{
//             id: "1.3",
//             optionText: "<b>Energy is consumed and cannot be used again.</b>"
//         },{
//             id: "1.4",
//             optionText: "<b>All of these</b>"
//         }],
//         answer: [{
//             text: "1.1"
//         },{
//             text: "1.2"
//         }],
//         marks: {
//             correctAnswer: 1,
//             wrongAnswer: -1,
//             partiallyCorrect: 0.1,
//             partialEnabled: true
//         }
//     },{
//         _id: "2",
//         type: "MULTIPLE",
//         questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
//         options: [{
//             id: "2.1",
//             optionText: "<b>Energy transform into different form continuously.</b>"
//         },{
//             id: "2.2",
//             optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
//         },{
//             id: "2.3",
//             optionText: "<b>Energy is consumed and cannot be used again.</b>"
//         },{
//             id: "2.4",
//             optionText: "<b>All of these</b>"
//         }],
//         answer: [{
//             text: "2.1"
//         },{
//             text: "2.2"
//         }],
//         marks: {
//             correctAnswer: 1,
//             wrongAnswer: -1,
//             partiallyCorrect: 0.1,
//             partialEnabled: true
//         }
//     },{
//         _id: "3",
//         type: "SINGLE",
//         questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
//         options: [{
//             id: "3.1",
//             optionText: "<b>Energy transform into different form continuously.</b>"
//         },{
//             id: "3.2",
//             optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
//         },{
//             id: "3.3",
//             optionText: "<b>Energy is consumed and cannot be used again.</b>"
//         },{
//             id: "3.4",
//             optionText: "<b>All of these</b>"
//         }],
//         answer: [{
//             text: "3.1"
//         }],
//         marks: {
//             correctAnswer: 1,
//             wrongAnswer: -1,
//             partiallyCorrect: 0,
//             partialEnabled: false
//         }
//     },{
//         _id: "4",
//         type: "SINGLE",
//         questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
//         options: [{
//             id: "4.1",
//             optionText: "<b>Energy transform into different form continuously.</b>"
//         },{
//             id: "4.2",
//             optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
//         },{
//             id: "4.3",
//             optionText: "<b>Energy is consumed and cannot be used again.</b>"
//         },{
//             id: "4.4",
//             optionText: "<b>All of these</b>"
//         }],
//         answer: [{
//             text: "4.2"
//         }],
//         marks: {
//             correctAnswer: 1,
//             wrongAnswer: -1,
//             partiallyCorrect: 0.1,
//             partialEnabled: true
//         }
//     },{
//         _id: "5",
//         type: "DIAGRAM",
//         questionText: "<b>Energy can neither be created nor destroyed but still everybody discuss about the energy crisis because</b>",
//         options: [{
//             id: "5.1",
//             optionText: "<b>Energy transform into different form continuously.</b>"
//         },{
//             id: "5.2",
//             optionText: "<b>Usable form of energy is dissipated to the surroundings in less usable forms</b>"
//         },{
//             id: "5.3",
//             optionText: "<b>Energy is consumed and cannot be used again.</b>"
//         },{
//             id: "5.4",
//             optionText: "<b>All of these</b>"
//         }],
//         answer: [{
//             text: "5.2"
//         }],
//         marks: {
//             correctAnswer: 1,
//             wrongAnswer: -1,
//             partiallyCorrect: 0.1,
//             partialEnabled: true
//         }
//     },{
//         _id: "6",
//         type: "SUBJECTIVE",
//         questionText: "<b>what is your name?</b>",
//         answer: [{
//             text: "xyz"
//         }],
//         marks: {
//             correctAnswer: 1,
//             wrongAnswer: -1,
//             partiallyCorrect: 0.1,
//             partialEnabled: true
//         }
//     }]
// }

let interval
let samplePaper
const currDate = new Date()
const pastDate = new Date()

class Exam extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            total: 0,
            answers: new Map()
        }
    }

    componentDidMount = async () => {
        if(!(this.past) && this.props.user.type === "student") {
            let res = await axios.get(`${SERVER_URL}/get-exam/5f4485804ee8152448f4281a`)
            samplePaper = res.data
            console.log(samplePaper)

            pastDate.setDate(samplePaper.scheduledTime.date.split("-")[0])
            pastDate.setMonth(parseInt(samplePaper.scheduledTime.date.split("-")[1])-1)
            pastDate.setFullYear(samplePaper.scheduledTime.date.split("-")[2])
            pastDate.setHours(samplePaper.scheduledTime.time.split(":")[0])
            pastDate.setMinutes(samplePaper.scheduledTime.time.split(":")[1])
            pastDate.setSeconds(samplePaper.scheduledTime.time.split(":")[2])
            pastDate.setMinutes(pastDate.getMinutes() + parseInt(samplePaper.duration)*60)
            this.past = currDate > pastDate
            this.setState({...this.state, total: Math.floor((pastDate.getTime()-currDate.getTime())/1000)})

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
    
    find = () => {
        let num = 0
        if(this.props.user.type === "faculty") {
            return samplePaper.questions.map(question => {
                num++
                switch(question.type) {
                    case "MULTIPLE":
                        return <QuestionCardMultiple id={question._id} num={num} output={question.questionText} optionList={question.options} show={true} past={this.past} correctAnswer={question.answer} from="exam" marks={question.marks}/>
                    case "SINGLE":
                        return <QuestionCardSingle id={question._id} num={num} output={question.questionText} optionList={question.options} show={true} past={this.past} correctAnswer={question.answer} from="exam" marks={question.marks}/>
                    case "DIAGRAM":
                        return <QuestionCardDiagram id={question._id} num={num} output={question.questionText} optionList={question.options} show={true} past={this.past} correctAnswer={question.answer} from="exam" marks={question.marks}/>
                    case "SUBJECTIVE":
                        return <QuestionCardSubjective id={question._id} num={num} output={question.questionText} show={true} past={this.past} correctAnswer={question.answer} from="exam" marks={question.marks}/>
                }
            })
        }
        else if(this.past) {
            return samplePastExam.answers.map(question => {
                num++
                switch(question.type) {
                    case "MULTIPLE":
                        return <QuestionCardMultiple id={question.questionId} num={num} output={question.questionText} from="exam" optionList={question.options} show={true} past={this.past} correctAnswer={question.answer} studentAnswer={question.studentAnswer} correctFlag={question.correctFlag} marks={question.marks}/>
                    case "SINGLE":
                        return <QuestionCardSingle id={question.questionId} num={num} output={question.questionText} from="exam" optionList={question.options} show={true} past={this.past} correctAnswer={question.answer} studentAnswer={question.studentAnswer} correctFlag={question.correctFlag} marks={question.marks}/>
                    case "DIAGRAM":
                        return <QuestionCardDiagram id={question.questionId} num={num} output={question.questionText} from="exam" optionList={question.options} show={true} past={this.past} correctAnswer={question.answer} studentAnswer={question.studentAnswer} correctFlag={question.correctFlag} marks={question.marks}/>
                    case "SUBJECTIVE":
                        return <QuestionCardSubjective id={question.questionId} num={num} output={question.questionText} from="exam" show={true} past={this.past} correctAnswer={question.answer} studentAnswer={question.studentAnswer} correctFlag={question.correctFlag} marks={question.marks}/>
                }
            })  
        } else {
            return samplePaper?.questions?.map(question => {
                // console.log(studentAnswers.filter(answer => answer.id == question.id))
                // let correct = (JSON.stringify(question.answer) == JSON.stringify(studentAnswers[num].answer))
                // console.log(JSON.stringify(question.answer), studentAnswers[num].answer, correct)
                // console.log(studentAnswers)
                num++
                switch(question.type) {
                    case "MULTIPLE":
                        return <QuestionCardMultiple id={question._id} num={num} output={question.questionText} from="exam" optionList={question.options} show={false} past={this.past} handleAddAnswer={this.handleAddAnswer} marks={question.marks}/>
                    case "SINGLE":
                        return <QuestionCardSingle id={question._id} num={num} output={question.questionText} from="exam" optionList={question.options} show={false} past={this.past} handleAddAnswer={this.handleAddAnswer} marks={question.marks}/>
                    case "DIAGRAM":
                        return <QuestionCardDiagram id={question._id} num={num} output={question.questionText} from="exam" optionList={question.options} show={false} past={this.past} handleAddAnswer={this.handleAddAnswer} marks={question.marks}/>
                    case "SUBJECTIVE":
                        return <QuestionCardSubjective id={question._id} num={num} output={question.questionText} from="exam" show={false} past={this.past} handleAddAnswer={this.handleAddAnswer} marks={question.marks}/>
                }
            })
        }
    }

    handleSubmit = async () => {
        //upload this
        console.log(samplePaper.questions)
        let studentResponse = {
            userId: this.props.user._id,
            examId: samplePaper._id,
            answers: samplePaper.questions.map(question => {
                let studentAnswer = []
                if(this.state.answers.has(question._id)) {
                    studentAnswer = this.state.answers.get(question._id)
                }
                // console.log(question.answer)
                let options = []
                if(question.type !== "SUBJECTIVE") {
                    options = (question.options.map(option => {
                        return {
                            id: option.id,
                            optionText: option.optionText
                        }
                    }))
                }

                return {
                    _id: question._id,
                    questionText: question.questionText,
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
        await axios.post(`${SERVER_URL}/submit-answers`, {studentResponse})
        this.props.history.replace('/dashboard')
    }

    render() {
        // console.log(this.state.answers)
        // if(!this.props.isAuthenticated){
        //     return(
        //         <Redirect to="/home"/>
        //     );   
        // }
      
        return (
            <div>
                <div className="container" style={{marginTop: "8vh"}}>
                    <div className="box is-flex" style={{flexDirection: "column", alignItems: "center"}}>
                        <div className="column is-flex" style={{flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}> 
                            <p className="title" style={{margin: "0px"}}>{sampleExam.courseName}</p>
                            <p className="subtitle" style={{margin: "0px"}}>Semester : {sampleExam.semester}</p>
                            <p className="subtitle" style={{margin: "0px"}}>Faculty Name : {sampleExam.assignedFaculty}</p>
                            {/* {
                                this.past ? (
                                    <div>
                                        <p className="subtitle">Obtained Marks : {samplePastExam.result.obtainedMarks}</p>
                                        <p className="subtitle">Total Marks : {samplePastExam.result.totalMarks}</p>
                                    </div>
                                ) : (
                                    <p className="subtitle">Total Marks : {samplePaper.totalMarks}</p>
                                )
                            } */}
                        </div>
                    </div>
                    {/* {console.log(studentAnswers.filter(answer => answer.id === question.id))} */}
                    <div className="box">
                        {
                            this.find()
                        }
                    </div>
                    {
                        !(this.past) && this.props.user.type === "student" ? (
                            <div className="is-flex" style={{width: "100%", justifyContent: "center", marginBottom: "80px"}}>
                                <button className="button is-rounded is-outlined is-link" style={{width: "100%"}} onClick={this.handleSubmit}>Submit</button>
                            </div>
                        ) : ""
                    }
                </div>
                {
                    !(this.past) && this.props.user.type === "student" ? (
                    <div className="box is-flex" style={{position: "fixed", justifyContent: "flex-end", padding: "5px", borderRadius: "0px", fontSize: "20px", width: "100%", bottom: 0, background: "darkslateblue", color: "white"}}>
                        <p>Time left : {this.findTimeLeft()}</p>
                    </div>) : ""
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user : state.auth.user
});

export default withRouter(connect(mapStateToProps)(Exam))
