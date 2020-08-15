import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import QuestionCardMultiple from './QuestionCardMultiple';
import { removeQuestion, toggleQuestionBoldFlag, toggleQuestionItalicFlag, toggleQuestionUnderlineFlag, setQuestionType, toggleQuestionModal, setQuestion, setQuestionImgSrc, setQuestionAlternative, setQuestionHeight, setQuestionWidth, addOption } from '../../actions/question';
import CommonCard from './CommonCard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Question extends Component {

    notify = () => {
        toast("Please Choose Question Type")
    }

    handleAddOption = () => {
        if(this.props.question_set.get(this.props.currQuestionId.toString()).type === "")
            this.notify()
        else
            this.props.addOption(this.props.currQuestionId.toString())
    }

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

    handleSave = () => {
        if(this.props.question_set.get(this.props.currQuestionId.toString()).type === "")
            this.notify()
        else
            this.props.history.replace('/question-paper')
        // return <Redirect to="/question-paper" />
    }

    render() {
        return (
            <div className="is-flex" style={{flexDirection: "column", margin: "100px 40px"}}>
                <CommonCard questionId={this.props.currQuestionId} optionId="" />
                
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
                    <button className="button is-outlined is-rounded is-link" onClick={() => this.handleAddOption()} style={{marginRight: "50px"}}>Add option</button>
                </div>

                <div id="options" className="box">
                    {/* {console.log(this.props.question_set.get(this.props.currQuestionId.toString()))} */}
                    {
                        Array.from(this.props.question_set.get(this.props.currQuestionId.toString()).optionList.values()).map(elem => {
                        return <CommonCard questionId={elem.id.split(".")[0]} optionId={elem.id} />
                    })}
                </div>

                <div className="is-flex" style={{justifyContent: "center"}}>
                    <button className="button is-outlined is-link is-rounded" onClick={this.handleSave}>Save</button>
                </div>
                
                <ToastContainer />
                {/* modal */}
                {/* <div className={`modal is-clipped ${this.props.question_set.get(this.props.currQuestionId).visible ? "is-active" : ""}`}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Upload Image</p>
                            <button className="delete" aria-label="close" onClick={this.props.toggleQuestionModal(this.props.currQuestionId)}></button>
                        </header>
                        <section className="modal-card-body is-flex">
                            <div className="column is-flex" style={{flex: "0.2"}}>
                                <div style={{cursor: "pointer"}}>Upload from URL</div>
                            </div>
                            <div className="column is-flex" style={{flex: "0.8", flexDirection: "column", justifyContent: "space-evenly", height: "200px"}}>
                                <input className="input" type="text" placeholder="Enter URL" value={this.props.question_set.get(this.props.currQuestionId).img_src} onChange={e => this.props.setQuestionImgSrc(this.props.currQuestionId, e.target.value)} />
                                <input className="input" type="text" placeholder="Enter alternative name" value={this.props.question_set.get(this.props.currQuestionId).alternative} onChange={e => this.props.setQuestionAlternative(this.props.currQuestionId, e.target.value)} />
                                <input className="input" type="text" placeholder="Enter height" value={this.props.question_set.get(this.props.currQuestionId).height} onChange={e => this.props.setQuestionHeight(this.props.currQuestionId, e.target.value)} />
                                <input className="input" type="text" placeholder="Enter width" value={this.props.question_set.get(this.props.currQuestionId).width} onChange={e => this.props.setQuestionWidth(this.props.currQuestionId, e.target.value)} />
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.handleImageUpload}>Save changes</button>
                            <button className="button" onClick={this.props.toggleQuestionModal(this.props.currQuestionId)}>Cancel</button>
                        </footer>
                    </div>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question_set: state.question.question_set,
        currQuestionId: state.question.currQuestionId,
        currOptionId: state.question.currOptionId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeQuestion: (id) => dispatch(removeQuestion(id)),
        toggleQuestionBoldFlag: (id) => dispatch(toggleQuestionBoldFlag(id)),
        toggleQuestionItalicFlag: (id) => dispatch(toggleQuestionItalicFlag(id)),
        toggleQuestionUnderlineFlag: (id) => dispatch(toggleQuestionUnderlineFlag(id)),
        // toggleQuestionModal: (id) => dispatch(toggleQuestionModal(id)),
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