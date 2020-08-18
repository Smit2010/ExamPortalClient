import React, { Component } from 'react'
import './style.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { connect } from 'react-redux'
import {removeQuestion, swapQuestion } from '../../actions/question';
import { withRouter } from 'react-router-dom';

class QuestionCardSingle extends Component {

    check = (flag) => {
        this.props.swapQuestion(...this.props.calcId("SINGLE",this.props.id,flag))
    }

    show = (str) => {
        return {
            __html: str
        }
    }

    handleEdit = () => {
        this.props.history.replace(`add-question?${this.props.id}`)
    }

    render() {

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
                                <div style={{display: "flex", alignItems: "center"}}><input type="radio" id={elem.id} name={this.props.id} checked={this.props.question_set.get(this.props.id.toString()).answer.has(elem.id)} disabled style={{margin: "0 10px"}}/></div>
                                <div dangerouslySetInnerHTML={this.show(elem.output)}></div>
                            </label>
                        </div>)
                    })}
                </div>
                <div>
                    {/* {console.log(this.props.num, this.props.total)} */}
                    <div onClick={this.handleEdit} style={{display: "inline-block", cursor: "pointer"}}><EditIcon /></div>
                    <div onClick={() => this.props.removeQuestion(this.props.id)} style={{display: "inline-block", cursor: "pointer"}}><DeleteIcon /></div>
                    <div onClick={() => this.check(true)} style={{display: "inline-block", cursor: "pointer"}}><ArrowUpwardIcon /></div>
                    <div onClick={() => this.check(false)} style={{display: "inline-block", cursor: "pointer"}}><ArrowDownwardIcon /></div>
                </div>
            </div>) : (<div className="control is-flex" >
                {/* <label className="checkbox is-flex" style={{width: "100%"}}>
                    <div className="is-flex" style={{alignItems: "center", marginRight: "20px"}}>
                        <input type="checkbox" id={this.props.id} name={this.props.curr} />
                    </div>
                    <div className="box" style={{flex: 1}}>
                        <div className="container is-flex" style={{justifyContent: "space-between", border: "1px solid lightgray", width: "100%"}} >
                            <div className="subtitle is-flex" style={{margin: "auto 20px"}}>Option</div>
                            <div className="container is-flex" style={{justifyContent: "flex-end", alignItems: "center", padding: "10px"}}>
                                <button onClick={() => this.setState({visible: true})}><ImageIcon /></button>
                                <button onClick={this.handleBold}><FormatBoldIcon/></button>
                                <button onClick={this.handleItalic}><FormatItalicIcon /></button>
                                <button onClick={this.handleUnderline}><FormatUnderlinedIcon /></button>
                                <button id={this.props.id} onClick={(e) => this.props.handleDeleteOption(e.currentTarget.id)}><DeleteIcon /></button>
                            </div>
                        </div>
                        <div className="container" style={{width: "100%"}}>
                            <textarea id="text" className="textarea" placeholder="Write option here..." onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.question}/>
                        </div>
                        <p className="subtitle" style={{marginLeft: "20px", marginTop: "10px"}}>Output : </p>
                        <div className="output" dangerouslySetInnerHTML={this.show()} style={{marginLeft: "20px"}}></div>
                    </div>
                </label> */}
            </div>)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question_set: state.question.question_set
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeQuestion: (id) => dispatch(removeQuestion(id)),
        swapQuestion: (first, second) => dispatch(swapQuestion(first, second))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionCardSingle))
