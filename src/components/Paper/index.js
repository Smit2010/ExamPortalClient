import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import QuestionCardSingle from './QuestionCardSingle';
import QuestionCardMultiple from './QuestionCardMultiple';
import QuestionCardSubjective from './QuestionCardSubjective';
import QuestionCardDiagram from './QuestionCardDiagram';
import { Divider } from '@material-ui/core';
import { addQuestion } from '../../actions/question';
import SideBar from '../SideBar';
import { toast } from 'react-toastify';

class Paper extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            flag: false,
            showModal: false,
            subjectName: "",
            duration: "",
            date: "",
            time: ""
        }
    }

    handleAddQuestion = () => {
        this.props.addQuestion()
        this.props.history.push(`/add-question?null`)
    }

    handleclick = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                flag: !prevState.flag
            }
        })
    }

    handleshow = (val) => {
        this.setState({...this.state, showModal: val})
    }

    handleModalVisible = () => {
        if(this.props.question_set.size == 0) {
            toast.error("Please Add Some Question In Paper")
        } else {
            this.handleshow(true)
        }
    }

    handleCreatePaper = () => {
        
        let questions = []
        questions = (Array.from(this.props.question_set.values()).map(question => {
            let options = []
            options = (Array.from(question.optionList.values()).map(option => {
                return {
                    id: option.id,
                    optionText: option.optionText
                }
            }))
            return {
                _id: question.id,
                questionText: question.output,
                type: question.type,
                marks: [{
                    correcAnswer: question.positiveMarks,
                    wrongAnswer: question.negativeMarks,
                    partialEnabled: question.partialEnabled,
                    partiallyCorrect: question.partialMarks
                }],
                options,
                answer: Array.from(question.answer)
            }
        }))
        
        //upload this paper object
        let paper = {
            courseName: this.state.subjectName,
            facultyId: this.props.user._id,
            questions,
            scheduledTime: {
                date: this.state.date,
                time: this.state.time,
            },
            duration: this.state.duration,
        }
        // console.log(paper)

        this.setState({
            flag: false,
            showModal: false,
            subjectName: "",
            duration: "",
            date: "",
            time: ""
        })

        this.props.history.replace('/dashboard')
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

    render() {
        if(!this.props.isAuthenticated){
            return(
                <Redirect to="/home"/>
            );   
        }

        //split questions according to the types
        let single = []
        let subjective = []
        let multiple = []
        let diagram = []
        Array.from(this.props.question_set.values()).map(element => {
            if(element.type === "SINGLE") {
                single.push(element.id)
            } else if(element.type === "MULTIPLE") {
                multiple.push(element.id)
            } else if(element.type === "SUBJECTIVE") {
                subjective.push(element.id)
            } else if(element.type === "DIAGRAM") {
                diagram.push(element.id)
            }
        })

        let count = 0
        // function incr(val) {total = total + val}
        function calcId(type, id, flag) {
            let ans1 = id, ans2 = id
            if(type === "MULTIPLE") {
                let index = multiple.indexOf(id)
                if(flag) {
                    if(index > 0) {
                        ans2 = multiple[index - 1]
                    }
                } else {
                    if(index < multiple.length - 1) {
                        ans2 = multiple[index + 1]
                    }
                }      
            } else if(type === "SINGLE"){
                let index = single.indexOf(id)
                if(flag) {
                    if(index > 0) {
                        ans2 = single[index - 1]
                    }
                } else {
                    if(index < single.length - 1) {
                        ans2 = single[index + 1]
                    }
                } 
            } else if(type === "SUBJECTIVE"){
                let index = subjective.indexOf(id)
                if(flag) {
                    if(index > 0) {
                        ans2 = subjective[index - 1]
                    }
                } else {
                    if(index < subjective.length - 1) {
                        ans2 = subjective[index + 1]
                    }
                } 
            } else if(type === "DIAGRAM"){
                let index = diagram.indexOf(id)
                if(flag) {
                    if(index > 0) {
                        ans2 = diagram[index - 1]
                    }
                } else {
                    if(index < diagram.length - 1) {
                        ans2 = diagram[index + 1]
                    }
                } 
            }
            return [ans1, ans2]
        }
        return (
            <div style={{backgroundColor: "#fff", height:"100%", display: "flex"}}>
            {/* <div className="container" style={{marginTop:"100px"}}> */}
                {this.renderDrawer()}
                <div className="container">
                    <div className="column is-6 is-offset-3" style={{display: "flex",flexDirection: "column", width:"100%", margin: "10vh 0px"}}>
                        <h1 className="title">Generate Question Paper</h1>
                        <div className="container" style={{width: "100%"}}>

                            {/* Show multiple choice questions */}
                            {multiple.length > 0 && <div className="box">
                                <p className="subtitle">Multiple Choise Questions</p>
                                <Divider />
                                    {multiple.map(elem => {
                                        count = count + 1
                                        return <QuestionCardMultiple click={() => this.handleclick()} calcId={calcId} show={true} id={elem} num={count} 
                                            output={this.props.question_set.get(elem.toString()).output} 
                                            optionList={Array.from(this.props.question_set.get(elem.toString()).optionList.values())} from="paper"
                                            marks={{correcAnswer: this.props.question_set.get(elem.toString()).positiveMarks,
                                                wrongAnswer: this.props.question_set.get(elem.toString()).negativeMarks,
                                                partiallyCorrect: this.props.question_set.get(elem.toString()).partialMarks,
                                                partialEnabled: this.props.question_set.get(elem.toString()).partialEnabled}}
                                            correctAnswer={Array.from(this.props.question_set.get(elem.toString()).answer.values()).map(val => {return {text: val}})} />

                                    })
                                }
                            </div>}

                            {/* Show single choice questions */}
                            {single.length > 0 && <div className="box">
                                <p className="subtitle">Single Choise Questions</p>
                                <Divider />
                                    {single.map(elem => {
                                        count = count + 1
                                        return <QuestionCardSingle click={() => this.handleclick()} calcId={calcId} show={true} id={elem} num={count} 
                                        output={this.props.question_set.get(elem.toString()).output} 
                                        optionList={Array.from(this.props.question_set.get(elem.toString()).optionList.values())} from="paper"
                                        marks={{correcAnswer: this.props.question_set.get(elem.toString()).positiveMarks,
                                            wrongAnswer: this.props.question_set.get(elem.toString()).negativeMarks,
                                            partiallyCorrect: this.props.question_set.get(elem.toString()).partialMarks,
                                            partialEnabled: this.props.question_set.get(elem.toString()).partialEnabled}}
                                        correctAnswer={Array.from(this.props.question_set.get(elem.toString()).answer.values()).map(val => {return {text: val}})} />
                                    })
                                }
                            </div>}

                            {/* Show subjective questions */}

                            {subjective.length > 0 && <div className="box">
                                <p className="subtitle">Subjective Questions</p>
                                <Divider />
                                    {subjective.map(elem => {
                                        count = count + 1
                                        return <QuestionCardSubjective click={() => this.handleclick()} calcId={calcId} show={true} id={elem} num={count} 
                                        output={this.props.question_set.get(elem.toString()).output} 
                                        marks={{correcAnswer: this.props.question_set.get(elem.toString()).positiveMarks,
                                            wrongAnswer: this.props.question_set.get(elem.toString()).negativeMarks,
                                            partiallyCorrect: this.props.question_set.get(elem.toString()).partialMarks,
                                            partialEnabled: this.props.question_set.get(elem.toString()).partialEnabled}}
                                        correctAnswer={Array.from(this.props.question_set.get(elem.toString()).answer.values()).map(val => {return {text: val}})} />
                                    })
                                }
                            </div>}

                            {/* Show diagram based questions */}

                            {diagram.length > 0 && <div className="box">
                                <p className="subtitle">Diagram Based Questions</p>
                                <Divider />
                                    {diagram.map(elem => {
                                        count = count + 1
                                        return <QuestionCardDiagram click={() => this.handleclick()} calcId={calcId} show={true} id={elem} num={count} 
                                        output={this.props.question_set.get(elem.toString()).output} 
                                        optionList={Array.from(this.props.question_set.get(elem.toString()).optionList.values())} from="paper"
                                        marks={{correcAnswer: this.props.question_set.get(elem.toString()).positiveMarks,
                                            wrongAnswer: this.props.question_set.get(elem.toString()).negativeMarks,
                                            partiallyCorrect: this.props.question_set.get(elem.toString()).partialMarks,
                                            partialEnabled: this.props.question_set.get(elem.toString()).partialEnabled}}
                                        correctAnswer={Array.from(this.props.question_set.get(elem.toString()).answer.values()).map(val => {return {text: val}})} />
                                    })
                                }
                            </div>}

                        </div>
                        {/* Button to add question and create paper*/}
                        <div className="is-flex" style={{justifyContent: "center", marginBottom: "20px"}}>
                            <button className="button is-outlined is-rounded is-link" style={{marginTop: "20px"}} onClick={this.handleAddQuestion}>Add Question</button>
                            <button className="button is-outlined is-rounded is-link" style={{marginTop: "20px", marginLeft: "40px"}} onClick={this.handleModalVisible}>Create Paper</button>
                        </div>
                    </div>
                </div>

                {/* Modal for create paper */}
                <div className={`modal is-clipped ${this.state.showModal ? "is-active" : ""}`}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Create Paper</p>
                            <button className="delete" aria-label="close" onClick={() => this.handleshow(false)}></button>
                        </header>
                        <section className="modal-card-body is-flex" style={{justifyContent: "center"}}>
                            <div className="column is-flex" style={{flex: "0.8", flexDirection: "column", justifyContent: "space-evenly", height: "200px"}}>
                                <label>Enter Subject Name</label>
                                <input className="input" type="text" placeholder="Enter Subject Name" value={this.state.subjectName} onChange={e => this.setState({...this.state, subjectName: e.target.value})} />
                                <label>Enter Duration Of Exam-Paper(in Hour)</label>
                                <input className="input" type="text" placeholder="Enter Duration Of Exam-Paper(in Hour)" value={this.state.duration} onChange={e => this.setState({...this.state, duration: e.target.value})} />
                                <label>Enter Date Of Exam(dd-mm-yyyy)</label>
                                <input className="input" type="text" placeholder="Enter Date Of Exam(dd-mm-yyyy)" value={this.state.date} onChange={e => this.setState({...this.state, date: e.target.value})} />
                                <label>Enter Time Of Exam(hh:mm:ss)</label>
                                <input className="input" type="text" placeholder="Enter Time Of Exam(hh:mm:ss)" value={this.state.time} onChange={e => this.setState({...this.state, time: e.target.value})} />
                            </div>
                        </section>
                        <footer className="modal-card-foot" style={{justifyContent: "flex-end"}}>
                            <button className="button is-success" onClick={this.handleCreatePaper}>Create</button>
                            <button className="button" onClick={() => this.handleshow(false)}>Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question_set: state.question.question_set,
        currQuestionId: state.question.currQuestionId,
        isDrawerOpen: state.drawer.isDrawerOpen,
//         examPaper: state.question.examPaper,
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: () => dispatch(addQuestion())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Paper))
