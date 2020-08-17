import React, { Component } from 'react'
import { connect } from 'react-redux'
import SideBar from '../SideBar';
import { withRouter } from 'react-router-dom'
import QuestionCardMultiple from './QuestionCardMultiple';
import { removeQuestion, toggleQuestionBoldFlag, toggleQuestionItalicFlag, toggleQuestionUnderlineFlag, setQuestionType, toggleQuestionModal, setQuestion, setQuestionImgSrc, setQuestionAlternative, setQuestionHeight, setQuestionWidth, addOption, setAnswer } from '../../actions/question';
import CommonCard from './CommonCard'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Question extends Component {

    handleAddOption = () => {
        if( this.props.question_set.get(this.props.currQuestionId.toString()).type === "NONE")
            toast.error("Please Choose Question Type")
        else
            this.props.addOption(this.props.currQuestionId.toString())
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

    // handleDeleteOption = (id) => {
    //     console.log(this.state.optionList.get(parseInt(id)).children)
    //     this.setState(prevState => {
    //         let list = prevState.optionList
    //         list.delete(parseInt(id))
    //         console.log(list)
    //         return {
    //             ...prevState,
    //             optionList: list
    //         }
    //     })
    // }

    handleType = (e) => {
        this.props.setQuestionType(this.props.currQuestionId, e.target.value)
    }

    handleAnswer = (e) => {
        this.props.setAnswer(e.target.id.split(".")[0],e.target.id)
    }

    handleSave = () => {
        if(this.props.question_set.get(this.props.currQuestionId.toString()).question === "")
            toast.error("Please Enter Question")
        else if(this.props.question_set.get(this.props.currQuestionId.toString()).type === "NONE")
            toast.error("Please Choose Question Type")
        else if(this.props.question_set.get(this.props.currQuestionId.toString()).answer.size === 0 && this.props.question_set.get(this.props.currQuestionId.toString()).type !== "SUBJECTIVE")
            toast.error("Please Choose Correct Answer")
        else
            this.props.history.replace('/question-paper')
        // return <Redirect to="/question-paper" />
    }

    handleCancel = () => {
        this.props.removeQuestion(this.props.currQuestionId)
        this.props.history.replace('/question-paper')
    }

    render() {

        const findType = () => {
            if(this.props.question_set.get(this.props.currQuestionId.toString()).type === "SUBJECTIVE")
                return "none"
            else if(this.props.question_set.get(this.props.currQuestionId.toString()).type === "MULTIPLE")
                return "checkbox"
            return "radio"
        }

        return (
            <div className="is-flex" style={{flexDirection: "column", margin: "100px 40px"}}>
                <CommonCard questionId={this.props.currQuestionId} optionId="" title="Question" />
                
                {/* question type */}
                <div className="box is-flex" style={{justifyContent: "space-between"}}>
                    <div className="control is-flex" style={{marginTop: "10px", justifyContent: "center"}}>
                        <div className="select" style={{marginLeft: "50px"}}>
                            <select onChange={this.handleType}>
                                <option>None</option>
                                <option value="MULTIPLE">Multiple choise question</option>
                                <option value="SINGLE">Single choice question</option>
                                <option value="SUBJECTIVE">Subjective question</option>
                                <option value="DIAGRAM">Diagram based question</option>
                            </select>
                        </div>
                    </div>
                    {
                        this.props.question_set.get(this.props.currQuestionId.toString()).type !== "SUBJECTIVE" ?
                        <button className="button is-outlined is-rounded is-link" onClick={() => this.handleAddOption()} style={{marginRight: "50px"}}>Add option</button> : 
                        <button className="button is-outlined is-rounded is-link" onClick={() => this.handleAddOption()} style={{marginRight: "50px"}}>Add answer</button>
                    }      
                </div>
                    
                
                    {/* {console.log(this.props.question_set.get(this.props.currQuestionId.toString()))} */}
                {
                    Array.from(this.props.question_set.get(this.props.currQuestionId.toString()).optionList.values()).map(elem => {
                    return (
                    <div className="is-flex">
                        {
                            this.props.question_set.get(this.props.currQuestionId.toString()).type !== "SUBJECTIVE" ? (
                                <div id="options" className="box">
                                    <div className="is-flex" style={{alignItems: "center", marginRight: "10px"}}><input id={elem.id} name={this.props.currQuestionId} type={findType()} onChange={this.handleAnswer} /></div> 
                                    <CommonCard questionId={elem.id.split(".")[0]} optionId={elem.id} title="Option"/>
                                </div>
                            ) : (
                                <div id="options" className="box" style={{width: "100%"}}>
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
                
                <ToastContainer />
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
        setAnswer: (id, ans) => dispatch(setAnswer(id, ans)),
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
