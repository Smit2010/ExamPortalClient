import React, { Component } from 'react'
import './style.css'
import ImageIcon from '@material-ui/icons/Image';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { connect } from 'react-redux'
import {removeQuestion, swapQuestion } from '../../actions/question';

class QuestionCardMultiple extends Component {

    check = (flag) => {
        let {num,total,len} = this.props
        if(flag) {
            if(num > total) {
                this.props.swapQuestion(...this.props.calcId("multiple",num,num-1))
            }
        } else {
            if(num + 1 < total + len) {
                this.props.swapQuestion(...this.props.calcId("multiple",num,num+1))
            }
        }
    }

    show = (str) => {
        console.log(str)
        return {
            __html: str
        }
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
                                <div style={{display: "flex", alignItems: "center"}}><input type="checkbox" id={elem.id} name={this.props.id} style={{margin: "0 10px"}} /></div>
                                <div dangerouslySetInnerHTML={this.show(elem.output)}></div>
                            </label>
                        </div>)
                    })}
                </div>
                <div>
                    {/* {console.log(this.props.num, this.props.total)} */}
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
        questions: state.question.question_set
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeQuestion: (id) => dispatch(removeQuestion(id)),
        swapQuestion: (first, second) => dispatch(swapQuestion(first, second))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCardMultiple)
