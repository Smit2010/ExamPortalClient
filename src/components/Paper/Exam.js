import React, { Component } from 'react'
import QuestionCardMultiple from './QuestionCardMultiple'
import QuestionCardSingle from './QuestionCardSingle'
import QuestionCardDiagram from './QuestionCardDiagram'
import QuestionCardSubjective from './QuestionCardSubjective'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVER_URL } from '../../utils/constants';
//import from course model in both the cases
const sampleExam = {
    courseName : "Maths",
    semester: "7",
    assignedFaculty: "xyz"
}

let interval
let paper
const currDate = new Date()
const pastDate = new Date()

class Exam extends Component {

    constructor(props) {
        super(props)
        

        let id = window.location.href.split("?")[1]
        paper = this.props.pastExams.filter(exam => JSON.stringify(exam._id) === JSON.stringify(id))[0]
        // console.log(typeof paper === "undefined")

        if(typeof paper === "undefined" || this.props.user.type === "faculty") {
            paper = this.props.exams.filter(exam => JSON.stringify(exam._id) === JSON.stringify(id))[0]
            console.log(this.props.exams, id)
            //set end exam time
            pastDate.setDate(paper.scheduledTime.date.split("-")[0])
            pastDate.setMonth(parseInt(paper.scheduledTime.date.split("-")[1])-1)
            pastDate.setFullYear(paper.scheduledTime.date.split("-")[2])
            pastDate.setHours(paper.scheduledTime.time.split(":")[0])
            pastDate.setMinutes(paper.scheduledTime.time.split(":")[1])
            pastDate.setSeconds(paper.scheduledTime.time.split(":")[2])
            pastDate.setMinutes(pastDate.getMinutes() + parseFloat(paper.duration)*60)
            this.past = currDate > pastDate
        } else {
            this.past = true
        }
        sampleExam.courseName = paper.courseName
        sampleExam.assignedFaculty = paper.facultyName
        this.state = {
            total: 0,
            answers: new Map()
        }
    }

    componentDidMount = async () => {
        if(!(this.past) && this.props.user.type === "student") {
            
            this.setState({...this.state, total: Math.floor((pastDate.getTime()-currDate.getTime())/1000)})

            interval = setInterval(() => {
                this.setState(prevState => {
                    return {total: Math.floor((pastDate.getTime()-new Date().getTime())/1000)}
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
        if(this.state.total === -1) {
            //submit paper
            alert('Times up!!')
            this.handleSubmit()
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
            return paper.questions.map(question => {
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
                    default:
                        return ""
                }
            })
        }
        else if(this.past) {
            return paper.answers.map(question => {
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
                    default:
                        return ""
                }
            })  
        } else {
            return paper?.questions?.map(question => {
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
                    default:
                        return ""
                }
            })
        }
    }

    handleSubmit = async () => {
        //upload this
        // console.log(paper)
        let studentResponse = {
            userId: this.props.user._id,
            examId: paper._id,
            duration: paper.duration,
            scheduledTime: paper.scheduledTime,
            answers: paper.questions.map(question => {
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
        // console.log(studentResponse)
        // console.log(typeof studentResponse.userId, typeof studentResponse.examId)
        let res = await axios.post(`${SERVER_URL}/submit-answers`, {studentResponse})
        toast.info(res.data)
        this.props.history.replace('/dashboard')
    }

    render() {
        // console.log(this.state.answers)
        if(!this.props.isAuthenticated){
            return(
                <Redirect to="/home"/>
            );   
        }
      
        return (
            <div>
                <div className="container" style={{marginTop: "8vh"}}>
                    <div className="box is-flex" style={{}}>
                        <div className="column is-flex" style={{flexDirection: "column", justifyContent: "space-between"}}> 
                            <p className="title" style={{margin: "0px"}}>{sampleExam.courseName}</p>
                            <p className="subtitle" style={{margin: "0px"}}>Semester : {sampleExam.semester}</p>
                            <p className="subtitle" style={{margin: "0px"}}>Faculty Name : {sampleExam.assignedFaculty}</p>
                        </div>
                        {
                            this.past && this.props.user.type === "student" ? (
                                <div className="column is-flex" style={{flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end"}}> 
                                    <p className="subtitle" style={{margin: "0px"}}>Total Marks : {paper.result.totalMarks}</p>
                                    <p className="subtitle" style={{margin: "0px"}}>Obtained Marks : {paper.result.obtainedMarks}</p>
                                </div>
                            ) : (
                                <div className="column is-flex" style={{flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end"}}> 
                                    <p className="subtitle" style={{margin: "0px"}}>Total Marks : {paper.totalMarks}</p>
                                </div>
                            )
                        }
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
    user : state.auth.user,
    exams: state.auth.exams,
    pastExams: state.auth.pastExams
});

export default withRouter(connect(mapStateToProps)(Exam))
