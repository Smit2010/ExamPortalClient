import React, { Component } from 'react'
import { connect } from 'react-redux'
import SideBar from '../SideBar';
import { withRouter } from 'react-router-dom'
import { removeQuestion, toggleQuestionBoldFlag, toggleQuestionItalicFlag, toggleQuestionUnderlineFlag, setQuestionType, toggleQuestionModal, setQuestion, setQuestionImgSrc, setQuestionAlternative, setQuestionHeight, setQuestionWidth, addOption, setAnswer } from '../../actions/question';
import CommonCard from './CommonCard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class Question extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            id: window.location.href.split("?")[1] !== "null" ? window.location.href.split("?")[1] : this.props.currQuestionId
        }
    }
    

    handleAddOption = () => {
        if( this.props.question_set.get(this.state.id.toString()).type === "") {
            toast.error("Please Choose Question Type")
            console.log("Please Choose Question Type")
        }
        else {
            this.props.addOption(this.state.id.toString())
        }
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

    handleType = (e) => {
        this.props.setQuestionType(this.state.id, e.target.value)
        document.getElementById("options").disabled = "true"
    }

    handleAnswer = (e) => {
        let questionType = this.props.question_set.get(e.target.id.split(".")[0]).type
        this.props.setAnswer(e.target.id.split(".")[0], e.target.id, e.target.checked, questionType)
    }

    handleSave = () => {
        if(this.props.question_set.get(this.state.id.toString()).question === "")
            toast.error("Please Enter Question")
        else if(this.props.question_set.get(this.state.id.toString()).type === "NONE")
            toast.error("Please Choose Question Type")
        else if(this.props.question_set.get(this.state.id.toString()).answer.size === 0)
            toast.error("Please Choose Correct Answer")
        else
            this.props.history.replace('/question-paper')
        // return <Redirect to="/question-paper" />
    }

    handleCancel = () => {
        this.props.removeQuestion(this.state.id)
        this.props.history.replace('/question-paper')
    }

    render() {
        const findType = () => {
            if(this.props.question_set.get(this.state.id.toString()).type === "SUBJECTIVE")
                return "none"
            else if(this.props.question_set.get(this.state.id.toString()).type === "MULTIPLE")
                return "checkbox"
            return "radio"
        }

        return (
           <div style={{backgroundColor: "#fff", height:"100%", display: "flex"}}>
                {this.renderDrawer()}
                 <div className="container">
                     <div className="column is-6 is-offset-3" style={{display: "flex",flexDirection: "column", margin: "10vh 0px", width:"100%"}}>
                         <div style={{justifyContent: "space-between"}}>
                             <div className="control is-flex" style={{marginTop: "10px", justifyContent: "start"}}>
                                 <div className="select" style={{marginBottom: 10}}>
                                     {window.location.href.split("?")[1] === "null" ? (
                                         <select id="options" onChange={this.handleType} placeholder="Select Question type">
                                            <option value="" disabled selected>Select Question type</option>
                                            <option value="MULTIPLE">Multiple choise question</option>
                                            <option value="SINGLE">Single choice question</option>
                                            <option value="SUBJECTIVE">Subjective question</option>
                                            <option value="DIAGRAM">Diagram based question</option>
                                        </select>
                                     ) : (
                                        <select id="options" onChange={this.handleType} placeholder="Select Question type" disabled >
                                            <option value="MULTIPLE" selected={this.props.question_set.get(this.state.id).type === "MULTIPLE"}>Multiple choise question</option>
                                            <option value="SINGLE" selected={this.props.question_set.get(this.state.id).type === "SINGLE"}>Single choice question</option>
                                            <option value="SUBJECTIVE" selected={this.props.question_set.get(this.state.id).type === "SUBJECTIVE"}>Subjective question</option>
                                            <option value="DIAGRAM" selected={this.props.question_set.get(this.state.id).type === "DIAGRAM"}>Diagram based question</option>
                                        </select>
                                     )}
                                  </div>
                            </div>  
                        </div>
                        <CommonCard questionId={this.state.id} optionId="" title="Question" />	
                                            
                    {
                        this.props.question_set.get(this.state.id.toString()).type !== "SUBJECTIVE" ?
                        <button className="button is-outlined is-rounded is-link" onClick={() => this.handleAddOption()} style={{margin: "10px 50px"}}>Add option</button> : 
                        this.props.question_set.get(this.state.id.toString()).optionList.size == 0 ? 
                        <button className="button is-outlined is-rounded is-link" onClick={() => this.handleAddOption()} style={{margin: "10px 50px"}}>Add answer</button> : ""
                    } 
                    
                
                    {/* {console.log(this.props.question_set.get(this.props.currQuestionId.toString()))} */}
                {
                    Array.from(this.props.question_set.get(this.state.id.toString()).optionList.values()).map(elem => {
                    return (
                    <div className="is-flex">
                        {
                            this.props.question_set.get(this.state.id.toString()).type !== "SUBJECTIVE" ? (
                                <div className="box is-flex" style={{width: "100%"}}>
                                    <div className="is-flex" style={{alignItems: "center", marginRight: "10px"}}><input id={elem.id} name={this.state.id} type={findType()} onChange={this.handleAnswer} checked={this.props.question_set.get(this.state.id.toString()).answer.has(elem.id)} /></div> 
                                    <CommonCard questionId={elem.id.split(".")[0]} optionId={elem.id} title="Option"/>
                                </div>
                            ) : (
                                <div className="box is-flex" style={{width: "100%"}}>
                                    <CommonCard questionId={elem.id.split(".")[0]} optionId={elem.id} title="Answer"/>
                                </div>
                            )
                        }
                    </div>)
                })}

                <div className="is-flex" style={{justifyContent: "space-evenly", marginTop: "10px"}}>
                    <button className="button is-outlined is-link is-rounded" style={{width: "150px"}} onClick={this.handleSave}>Save</button>
                    <button className="button is-outlined is-danger is-rounded" style={{width: "150px"}} onClick={this.handleCancel}>Cancel</button>
                </div>
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
        currOptionId: state.question.currOptionId,
        isDrawerOpen: state.drawer.isDrawerOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeQuestion: (id) => dispatch(removeQuestion(id)),
        toggleQuestionBoldFlag: (id) => dispatch(toggleQuestionBoldFlag(id)),
        toggleQuestionItalicFlag: (id) => dispatch(toggleQuestionItalicFlag(id)),
        toggleQuestionUnderlineFlag: (id) => dispatch(toggleQuestionUnderlineFlag(id)),
        setAnswer: (id, ans, flag, type) => dispatch(setAnswer(id, ans, flag, type)),
        setQuestionType: (id,questionType) => dispatch(setQuestionType(id,questionType)),
        setQuestion: (id, question, output) => dispatch(setQuestion(id, question, output)),
        setQuestionImgSrc: (id,value) => dispatch(setQuestionImgSrc(id,value)),
        setQuestionAlternative: (id,value) => dispatch(setQuestionAlternative(id,value)),
        setQuestionHeight: (id,value) => dispatch(setQuestionHeight(id,value)),
        setQuestionWidth: (id,value) => dispatch(setQuestionWidth(id,value)),
        addOption: (id) => dispatch(addOption(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Question))
