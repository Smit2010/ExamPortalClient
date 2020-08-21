import React, { Component } from 'react'
import './style.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { connect } from 'react-redux'
import {removeQuestion, swapQuestion, addQuestionInPaper, removeQuestionFromPaper } from '../../actions/question';
import { withRouter } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

class QuestionCardMultiple extends Component {

    check = (flag) => {
        this.props.swapQuestion(...this.props.calcId("MULTIPLE",this.props.id,flag))
    }

    show = (str) => {
        return {
            __html: str
        }
    }

    handleAdd = () => {
        this.props.click()
        this.props.addQuestionInPaper(this.props.id)
    }

    handleRemove = () => {
        this.props.click()
        this.props.removeQuestionFromPaper(this.props.id)
    }

    handleEdit = () => {
        this.props.history.replace(`add-question?${this.props.id}`)
    }

    render() {
        console.log(this.props.past)
        return (
            this.props.show ? ( <div className="box question is-flex" style={{marginTop: "20px", justifyContent: "space-between"}}>
                <div style={{flexDirection: "column"}}>
                    <div className="is-flex">
                        <div className="subtitle" style={{marginTop: "5px", marginRight: "10px"}}>{this.props.num}</div>
                        <p style={{fontSize:"20px", marginBottom: "10px"}} dangerouslySetInnerHTML={this.show(this.props.output)}></p>
                    </div>
                    {Array.from(this.props.optionList.values()).map(elem => {
                        return ( 
                        <div className="control" >
                            <label className="checkbox is-flex" >
                                <div style={{display: "flex", alignItems: "center"}}><input type="checkbox" id={elem.id} name={this.props.id} checked={this.props.question_set.get(this.props.id.toString()).answer.has(elem.id)} disabled style={{margin: "0 10px"}}/></div>
                                <div dangerouslySetInnerHTML={this.show(elem.output)}></div>
                            </label>
                        </div>)
                    })}
                </div>
                <div>
                    {/* {console.log(this.props.num, this.props.total)} */}
                    {this.props.examPaper.has(this.props.id) ? <CheckCircleIcon /> : ""}
                    {this.props.examPaper.has(this.props.id) ? (
                        <div onClick={this.handleRemove} style={{display: "inline-block", cursor: "pointer"}}>
                            <RemoveCircleIcon />
                        </div>) : (
                        <div onClick={this.handleAdd} style={{display: "inline-block", cursor: "pointer"}}>
                            <AddCircleIcon />
                        </div>)
                    }
                    <div onClick={this.handleEdit} style={{display: "inline-block", cursor: "pointer"}}><EditIcon /></div>
                    <div onClick={() => this.props.removeQuestion(this.props.id)} style={{display: "inline-block", cursor: "pointer"}}><DeleteIcon /></div>
                    <div onClick={() => this.check(true)} style={{display: "inline-block", cursor: "pointer"}}><ArrowUpwardIcon /></div>
                    <div onClick={() => this.check(false)} style={{display: "inline-block", cursor: "pointer"}}><ArrowDownwardIcon /></div>
                </div>
            </div>) : (<div className="box question is-flex" style={{marginTop: "20px", justifyContent: "space-between"}}>
                <div style={{flexDirection: "column", marginLeft: "30px", width: "100%"}}>
                    <div className="is-flex" style={{width: "100%"}}>
                        <div className="subtitle" style={{marginTop: "5px", marginRight: "10px"}}>{this.props.num}</div>
                        <p style={{fontSize:"20px", marginBottom: "10px", flex: 1}} dangerouslySetInnerHTML={this.show(this.props.output)}></p>
                        {this.props.past ? (this.props.correct ? <CheckCircleIcon /> : <CancelIcon />) : ""}
                    </div>
                    {this.props.optionList.map(elem => {
                        return ( 
                        <div className="control" >
                            <label className="checkbox is-flex" >
                                <div style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
                                    {
                                        this.props.past ? (
                                            <input type="checkbox" id={elem.id} name={this.props.id} style={{margin: "0 10px"}} disabled checked={this.props.answer.includes(elem.id)}/>
                                        ) : (
                                            <input type="checkbox" id={elem.id} name={this.props.id} style={{margin: "0 10px"}}/>
                                        )
                                    }
                                </div>
                                <div dangerouslySetInnerHTML={this.show(elem.output)}></div>
                            </label>
                        </div>)
                    })}
                </div>
            </div>)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question_set: state.question.question_set,
        examPaper: state.question.examPaper
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeQuestion: (id) => dispatch(removeQuestion(id)),
        swapQuestion: (first, second) => dispatch(swapQuestion(first, second)),
        addQuestionInPaper: (id) => dispatch(addQuestionInPaper(id)),
        removeQuestionFromPaper: (id) => dispatch(removeQuestionFromPaper(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionCardMultiple))
