import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ImageIcon from '@material-ui/icons/Image';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import { toggleQuestionBoldFlag, toggleQuestionItalicFlag, toggleQuestionUnderlineFlag, toggleQuestionModal, setQuestion, setQuestionImgSrc, setQuestionAlternative, setQuestionHeight, setQuestionWidth, toggleOptionBoldFlag, toggleOptionItalicFlag, toggleOptionUnderlineFlag, toggleOptionModal, setOption, setOptionImgSrc, setOptionAlternative, setOptionHeight, setOptionWidth } from '../../actions/question';

class CommonCard extends Component {

    //set textarea text and output acc. to flags and event
    handleChange = (e) => {
        let str = e.target.value
        let prev_str = "", prev_output = "", boldFlag = false, italicFlag = false, underlineFlag = false
        if(this.props.optionId === "") {
            prev_str = this.props.question_set.get(this.props.questionId.toString()).question
            prev_output = this.props.question_set.get(this.props.questionId.toString()).output
            boldFlag = this.props.question_set.get(this.props.questionId.toString()).boldFlag
            italicFlag = this.props.question_set.get(this.props.questionId.toString()).italicFlag
            underlineFlag = this.props.question_set.get(this.props.questionId.toString()).underlineFlag
        } else {
            prev_str = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).option
            prev_output = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).output
            boldFlag = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).boldFlag
            italicFlag = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).italicFlag
            underlineFlag = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).underlineFlag
        }
        if(prev_str.length > str.length) {
            let len = 0, pos = prev_output.length - 1, diff = prev_str.length - str.length
            let flag = 0, count = 0

            //Improvement needed
            //calculate how many character need do remove from output acc. to flags
            while(diff > 0) {
                if(prev_output.charAt(pos) === ">") {
                    flag = 0
                    while(prev_output.charAt(pos) !== "<") {
                        pos = pos - 1
                        len = len + 1
                        if(prev_output.charAt(pos) === "/" && prev_output.charAt(pos-1) === "<")
                            flag = 1
                        else if(prev_output.charAt(pos) === "/")
                            flag = 2
                    }
                    pos = pos - 1
                    len = len + 1
                    if(flag == 1)
                        count = count + 1
                    else if(flag == 0)
                        count = count - 1
                }
                else {
                    diff = diff - 1
                    len = len + 1
                    pos = pos - 1
                }
            }
            while(count > 0)
            {
                while(prev_output.charAt(pos) !== "<")
                {
                    pos = pos - 1
                    len = len + 1
                }
                pos = pos - 1
                len = len + 1
                count = count - 1
            }
            if(this.props.optionId === "") {
                this.props.setQuestion(this.props.questionId, prev_str.substring(0,str.length), prev_output.substring(0,prev_output.length - len))
            } else {
                this.props.setOption(this.props.questionId, this.props.optionId, prev_str.substring(0,str.length), prev_output.substring(0,prev_output.length - len))
            }

        } else if(prev_str.length < str.length) {
            
            let temp = ""
            // add needed tags acc. to flags
            if(boldFlag)
                temp = temp + "<b>"
            if(italicFlag)
                temp = temp + "<i>"
            if(underlineFlag)
                temp = temp + "<u>"
            temp = temp + str.substring(prev_str.length)
            if(boldFlag)
                temp = temp + "</b>"
            if(italicFlag)
                temp = temp + "</i>"
            if(underlineFlag)
                temp = temp + "</u>"
            if(this.props.optionId === "") {
                this.props.setQuestion(this.props.questionId, str, prev_output + temp)
            } else {
                this.props.setOption(this.props.questionId, this.props.optionId, str, prev_output + temp)
            }
        }
    }

    // // convert string to html element using dangerouslySetInnerHTML
    show = () => {
        let str = ""
        if(this.props.optionId === "") {
            str = this.props.question_set.get(this.props.questionId.toString()).output
        } else {
            str = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId.toString()).output
        }
        return {
            __html: str
        }
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            if(this.props.optionId === "") {
                let str_question = this.props.question_set.get(this.props.questionId.toString()).question
                let str_output = this.props.question_set.get(this.props.questionId.toString()).output + "<br />"
                this.props.setQuestion(this.props.questionId.toString(), str_question, str_output)
            } else {
                let str_option = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).option
                let str_output = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).output + "<br />"
                this.props.setOption(this.props.questionId.toString(),this.props.optionId.toString(), str_option, str_output)
            }
        }
    }

    // handle image upload button click
    handleImageUpload = () => {
        if(this.props.optionId === "") {
            this.props.toggleQuestionModal(this.props.questionId.toString())
            let str_question = this.props.question_set.get(this.props.questionId.toString()).question
            let img_src = this.props.question_set.get(this.props.questionId.toString()).img_src
            let alternative = this.props.question_set.get(this.props.questionId.toString()).alternative
            let height = this.props.question_set.get(this.props.questionId.toString()).height
            let width = this.props.question_set.get(this.props.questionId.toString()).width
            let str_output = this.props.question_set.get(this.props.questionId.toString()).output + `<img src="${img_src}" alt="${alternative}" width="${width}px" height="${height}px" /><br />`
            this.props.setQuestion(this.props.questionId.toString(), str_question, str_output)
        } else {
            this.props.toggleOptionModal(this.props.questionId.toString(), this.props.optionId)
            let str_question = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).question
            let img_src = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).img_src
            let alternative = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).alternative
            let height = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).height
            let width = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).width
            let str_output = this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).output + `<img src="${img_src}" alt="${alternative}" width="${width}px" height="${height}px" /><br />`
            this.props.setOption(this.props.questionId.toString(), this.props.optionId, str_question, str_output)
        }
    }

    render() {
        return (
            <div className="box">
                {
                    this.props.optionId === "" ? (
                        <div className="container is-flex" style={{justifyContent: "space-between", border: "1px solid lightgray", width: "100%"}} >
                            <p className="subtitle" style={{margin: "auto 0", marginLeft: "10px"}}>Question</p>
                            <div className="container is-flex" style={{justifyContent: "flex-end", alignItems: "center", padding: "10px"}}>
                                <button onClick={() => this.props.toggleQuestionModal(this.props.questionId)}><ImageIcon /></button>
                                <button onClick={() => this.props.toggleQuestionBoldFlag(this.props.questionId)}><FormatBoldIcon/></button>
                                <button onClick={() => this.props.toggleQuestionItalicFlag(this.props.questionId)}><FormatItalicIcon /></button>
                                <button onClick={() => this.props.toggleQuestionUnderlineFlag(this.props.questionId)}><FormatUnderlinedIcon /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="container is-flex" style={{justifyContent: "space-between", border: "1px solid lightgray", width: "100%"}} >
                            <p className="subtitle" style={{margin: "auto 0", marginLeft: "10px"}}>Option</p>
                            <div className="container is-flex" style={{justifyContent: "flex-end", alignItems: "center", padding: "10px"}}>
                                <button onClick={() => this.props.toggleOptionModal(this.props.questionId, this.props.optionId)}><ImageIcon /></button>
                                <button onClick={() => this.props.toggleOptionBoldFlag(this.props.questionId, this.props.optionId)}><FormatBoldIcon/></button>
                                <button onClick={() => this.props.toggleOptionItalicFlag(this.props.questionId, this.props.optionId)}><FormatItalicIcon /></button>
                                <button onClick={() => this.props.toggleOptionUnderlineFlag(this.props.questionId, this.props.optionId)}><FormatUnderlinedIcon /></button>
                            </div>
                        </div>
                    )
                }
                {/* {console.log(this.props.question_set)} */}
                <div className="container" style={{width: "100%"}}>
                    {
                        this.props.optionId === "" ? 
                        <textarea id="text" className="textarea" placeholder="Write question here..." onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.props.question_set.get(this.props.questionId.toString()).question}/>
                        : <textarea id="text" className="textarea" placeholder="Write option here..." onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId.toString()).option}/>
                    }
                </div>
                <p className="subtitle" style={{marginLeft: "20px", marginTop: "10px"}}>Output : </p>
                <div className="output" dangerouslySetInnerHTML={this.show()} style={{marginLeft: "20px"}}></div>

                {/* modal */}
                {
                    this.props.optionId === "" ? (
                        <div className={`modal is-clipped ${this.props.question_set.get(this.props.questionId.toString()).visible ? "is-active" : ""}`}>
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">Upload Image</p>
                                    <button className="delete" aria-label="close" onClick={() => this.props.toggleQuestionModal(this.props.questionId)}></button>
                                </header>
                                <section className="modal-card-body is-flex">
                                    <div className="column is-flex" style={{flex: "0.2"}}>
                                        <div style={{cursor: "pointer"}}>Upload from URL</div>
                                    </div>
                                    <div className="column is-flex" style={{flex: "0.8", flexDirection: "column", justifyContent: "space-evenly", height: "200px"}}>
                                        <input className="input" type="text" placeholder="Enter URL" value={this.props.question_set.get(this.props.questionId.toString()).img_src} onChange={e => this.props.setQuestionImgSrc(this.props.questionId, e.target.value)} />
                                        <input className="input" type="text" placeholder="Enter alternative name" value={this.props.question_set.get(this.props.questionId.toString()).alternative} onChange={e => this.props.setQuestionAlternative(this.props.questionId, e.target.value)} />
                                        <input className="input" type="text" placeholder="Enter height" value={this.props.question_set.get(this.props.questionId.toString()).height} onChange={e => this.props.setQuestionHeight(this.props.questionId, e.target.value)} />
                                        <input className="input" type="text" placeholder="Enter width" value={this.props.question_set.get(this.props.questionId.toString()).width} onChange={e => this.props.setQuestionWidth(this.props.questionId, e.target.value)} />
                                    </div>
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success" onClick={this.handleImageUpload}>Save changes</button>
                                    <button className="button" onClick={() => this.props.toggleQuestionModal(this.props.questionId.toString())}>Cancel</button>
                                </footer>
                            </div>
                        </div>
                    ) : (
                        <div className={`modal is-clipped ${this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).visible ? "is-active" : ""}`}>
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">Upload Image</p>
                                    <button className="delete" aria-label="close" onClick={() => this.props.toggleOptionModal(this.props.questionId,this.props.optionId)}></button>
                                </header>
                                <section className="modal-card-body is-flex">
                                    <div className="column is-flex" style={{flex: "0.2"}}>
                                        <div style={{cursor: "pointer"}}>Upload from URL</div>
                                    </div>
                                    <div className="column is-flex" style={{flex: "0.8", flexDirection: "column", justifyContent: "space-evenly", height: "200px"}}>
                                        <input className="input" type="text" placeholder="Enter URL" value={this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).img_src} onChange={e => this.props.setOptionImgSrc(this.props.questionId, this.props.optionId, e.target.value)} />
                                        <input className="input" type="text" placeholder="Enter alternative name" value={this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).alternative} onChange={e => this.props.setOptionAlternative(this.props.questionId, this.props.optionId, e.target.value)} />
                                        <input className="input" type="text" placeholder="Enter height" value={this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).height} onChange={e => this.props.setOptionHeight(this.props.questionId, this.props.optionId, e.target.value)} />
                                        <input className="input" type="text" placeholder="Enter width" value={this.props.question_set.get(this.props.questionId.toString()).optionList.get(this.props.optionId).width} onChange={e => this.props.setOptionWidth(this.props.questionId, this.props.optionId, e.target.value)} />
                                    </div>
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success" onClick={this.handleImageUpload}>Save changes</button>
                                    <button className="button" onClick={() => this.props.toggleQuestionModal(this.props.questionId.toString())}>Cancel</button>
                                </footer>
                            </div>
                        </div>
                    )
                }
    
            </div>
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
        toggleQuestionBoldFlag: (id) => dispatch(toggleQuestionBoldFlag(id)),
        toggleQuestionItalicFlag: (id) => dispatch(toggleQuestionItalicFlag(id)),
        toggleQuestionUnderlineFlag: (id) => dispatch(toggleQuestionUnderlineFlag(id)),
        toggleQuestionModal: (id) => dispatch(toggleQuestionModal(id)),
        setQuestion: (id, question, output) => dispatch(setQuestion(id, question, output)),
        setQuestionImgSrc: (id,value) => dispatch(setQuestionImgSrc(id,value)),
        setQuestionAlternative: (id,value) => dispatch(setQuestionAlternative(id,value)),
        setQuestionHeight: (id,value) => dispatch(setQuestionHeight(id,value)),
        setQuestionWidth: (id,value) => dispatch(setQuestionWidth(id,value)),
        
        toggleOptionBoldFlag: (id1, id2) => dispatch(toggleOptionBoldFlag(id1, id2)),
        toggleOptionItalicFlag: (id1, id2) => dispatch(toggleOptionItalicFlag(id1, id2)),
        toggleOptionUnderlineFlag: (id1, id2) => dispatch(toggleOptionUnderlineFlag(id1, id2)),
        toggleOptionModal: (id1, id2) => dispatch(toggleOptionModal(id1, id2)),
        setOption: (id1, id2, question, output) => dispatch(setOption(id1, id2, question, output)),
        setOptionImgSrc: (id1, id2, value) => dispatch(setOptionImgSrc(id1, id2, value)),
        setOptionAlternative: (id1, id2,value) => dispatch(setOptionAlternative(id1, id2, value)),
        setOptionHeight: (id1, id2,value) => dispatch(setOptionHeight(id1, id2, value)),
        setOptionWidth: (id1, id2, value) => dispatch(setOptionWidth(id1, id2, value)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommonCard))
