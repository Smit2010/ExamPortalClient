import React, { Component } from 'react'
import './style.css'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux'
import {removeQuestion, swapQuestion, addQuestionInPaper, removeQuestionFromPaper } from '../../actions/question';
import { withRouter } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

class QuestionCardSingle extends Component {

    check = (flag) => {
        this.props.swapQuestion(...this.props.calcId("SINGLE",this.props.id,flag))
    }

    show = (str) => {
        return {
            __html: str
        }
    }

    findStatus = () => {
        // let count = 0
        // this.props.correctAnswer.map(answer => {
        //     if(this.props.studentAnswer.includes(answer)) {
        //         count++
        //     }
        // })
        // console.log(this.props.correctFlag)
        switch(this.props.correctFlag) {
            case "true":
                return <img style={{width: "20px", height: "20px", marginLeft: "auto"}} src="data:image/png;base64,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" alt="correct"/>
            case "false":
                return <img style={{width: "20px", height: "20px", marginLeft: "auto"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAADUCAMAAACs0e/bAAAAolBMVEX+/v7+AAD8AADvAAD0AAD+/v/1AAD5AADuAAD+9fX//Pz84OD//v3+9PT/+Pj97u795+fzqan52Njtm5v4xMTzpaXsNTXsJibsQUH3ycn83t7uGBjsOTntHx7+6+rtXV3rLi7tdHTuf3/40dH2tLPuDg3sSUnsZWXsUlLtdXXwkZH3vbz0i4v0Y2TzeHjwvL3tbWzvjI3whIPtVlburKzyJiaIO6qoAAAIWUlEQVR4nO2da0PiOhCGSakUS7iDqMjiKhXW27pe/v9fOy2XVRBoM/NOEs7yftMvk4eZSdLcplQ66qijjjrqqKP8lN78e/Mf/0+duDL8b/y8zhS3et3H5+nT9Pmx32vFLhpw0c8a8PT82P1dE21Asz1NKlGgFgqiSjLu10oWY7vVng7XGlAe91tCth7ewpWhTwWVs25TyOAXZTlbb59va0B4PsH7WLeH0TdTK4MvHbi9b2rdlL+zLhtQ7TawxnqDXbBzhU81rL1N/fgZ7rMfJBOgsfrLXtg58Cv4B/6q+L6cZz+a/UBZux3lGcs0ukDZ21TnbFcYf1W5x7eUdRGT3J92ocofvr1t6he0H/b5tk5K/b1Z81XBrM43uKk4P5FWigC/d79S1FqqAXwQrJ8bmOfzPhT27VzVSwTjp5rXRuajPm9afVkwb/6qDOVtDgzNh6z+MjY1h+U1pk3Di9N9vBYZAcR4mx/m1tWYbq9jlrg43vk3B8G3qaLfZKt3FHspL39Gqam0Sn1QPxh6hUe8TV5APFNpVdAmWiQ6F8JLpk0Hf5p7OyYTjE1eZjwbjrdrImbvDd0il5dDS+yc4yHHpKqSeTWTVpUpyyu31I6KzcukVQHlW/+eZ5Mez1xapZ4JVmdco0T/1tm06trcapywraqEwFs/49sNzRdyWoxh6K/MeRG0Kro1xuX2VAslht/7EFpKX/VA+BjaosK8GkerVNcY9x1juDBvhnsKolWPxrhdkGWDeIbRqhtDWI3DLcyLimRFGXj7MNtqmMe7yNsrnEVT76a5i+mq5srj1WBaZb4AC+qZF8r1L5ZWme8ndCDj7kp5vKdQ2uDBGPcHaVlup5K987oGlFZF5vvNutC2X3ENd/BqPC3pg/cJ24Q98YyN5FRX5rTAgXepXbxwWsI4hO6rMo228p6a7PEVUkBZm4vByau+82oR2ix1CUefWCuR2zVa769S3AaelrhNhPniXddm/yxBS1qZS+MBN2X/1DovegSaq0o8A9RGziNXSuN5/kWghXxLmTAvf3vA6tx3LfNXKG+Ji+rz9vQl3Ks+lvEsQ6teic4VGYsyDX4I0pYZpxUeBDpnteBt0LdT9ylgnSUbi7RJjZqxjG9J0+VPNasyrbqW8a0KWfvoutRDbCZYU8Q+FvlHJn1l9MK8J6Dx372CugOc0o+F0gyvQRNxz0hogIRrBDqvfhi8KNrD4B0Cr/f4z4vz7SHwYmlFlpSAQtP6zbt9iZPJK7HQAlH+hpuhtM+8cNql/OTdtfnElfaSV4o2E3bTGSGpSE6dq/3jFaNdyi9eaVqNPA7EljRtJn94TQ9cGmuev7jDbTyJ0y51yj9gDZAtWj/y1xZtJve8Nmnd81KO/XPUdMprmxZx/YUu+hUlugAXYKi0VvN2Ie2M1wVtJjfx7CKS3fHa76WW0i543fkWcPXUWIBr/XTYEuvS+GHRLmXTv85pGQ8+HCDtHNgWrwe0FvMX+3gQRzZ4/aG1wesTrTyvR7QW8tcj2qUkef2jPRGcbwy9o80kdrwOcRgOrqnI0XZfeQVpPeQVpfWOV5jWM15xWm94s0mGBVpveC3ResNriVapmQ+8L7ZoveC1SOuWV1undcqr7dM6jmfrtE55HdCqYOaqSI8L2lSOeB3Rprz/FK2T/P3pjlYFb7bj2SVtqje7/nVMm/rXJq9r2lQW49kD2pTXFu0vH2ht8GqPaC351xtapcby+fvLo6cHgrF0/+wTrSiv9o8245XE9Y02m29I8fpIK8l74yGtSDxrf2kl+ivtMa1Mf+UvrQSvz7RQXq/zdiUcr995uxIynv2nVawCgOt6PQRaFUwxtIfy/FrwwiXN8rZ7ILRKRfQHQP+qh31BX1T8hwRbphVpnSo0r7u0LqF3IyoijwMrNTxl0d7LLEyVL2pCUcPqrmoyiZvVQO7I8FY45ZX5xfG2KZxXqBfivaayanpF2r1a0ErxRtR6tEL91IpWindI/di/kHDuJ60QL7nc8JtAY77SprwSzz+f0WhbAt3yOq2Mfwk1HjMJjLmbtDK8lAKtEh3Vd1oR3oRS9qIGf2Z8G22pdAvnJUUzsjLeXOGOgmZ4XkqZjxdwG7b7NrtfBo/nOwIu+I7bLtpMaF5CzZomtgkZ7e69djBvZH5t/RI6pdqVtyth8zfYE0k71EP2VHm0aN53Y9wJEDefFsx7b4wLLEib0eafkUHymhcCxFU9LOJbMK/5NBKGW5QWyWuO2wZZLk4L5DVfXwd1VSa0OF7Trgq1TmVGC+M1H4hqCFxT2lLpAsEbma++1gHrKiGhvCTCvxXCW4P8sg8U2hMEr/FipAYUaDWP5IX4vE8Eq7+ZyUul5fOSagHWeUYpkQzirZCeLZu6oj1h9s/npHpxnJGXQ5uJw0usaxl/OKNl8VKLlpLr0fJpObyPRIvx0B0tPX+J5YZTTUjZC6CddzU03qBLN0vZvUf4diES74BxlptwzCik754jeHlHjSamG0VIWgJvxAjlTI9m6YuL5EX9FFNe9jFQoyv2ZfI8eZfM5pN3zEuB2ujBojL3jN4W1Qzen7yjbOxuquhlqeBcpIpZfVzUPuiCTbfQIY2QsqtaSP1CAV0BHO9d6HaU/9NeCQTySrVZvoNR3UaW/Y2bHAcn0PHnuyaD/T1I5QVYfjfV5Xg3cJB0EX3EXsXvg90ertzhQ6vzq7r1Fy7fPdh5w6I33p7D5alMHtUnT+V1H4flt7bFgirN96fqegMqaQOwYbymxm37dXY2SpLk4+rttX0rHsSbijuTP+Orj6SaDM9mN33BBmi9mrPEjdOG/UeFMuurRShbDdAFNqal9bnwZqMt7nmPOuqoo4466qhD0H/PQcSe+opSQQAAAABJRU5ErkJggg==" alt="wrong"/>
            case "partial":
                return <img style={{width: "20px", height: "20px", marginLeft: "auto"}} src="data:image/png;base64,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" alt="partial" />
            default:
                return ""
        }
    }
    // handleAdd = () => {
    //     this.props.click()
    //     this.props.addQuestionInPaper(this.props.id)
    // }

    // handleRemove = () => {
    //     this.props.click()
    //     this.props.removeQuestionFromPaper(this.props.id)
    // }

    handleChange = () => {
        let temp = []
        document.getElementsByName(this.props.id).forEach(option => {
            if(option.checked) {
                temp.push({text: option.id})
            }
        })
        // console.log(temp)
        this.props.handleAddAnswer(this.props.id, temp)
    }
    
    handleEdit = () => {
        this.props.history.replace(`add-question?${this.props.id}`)
    }

    render() {
        return (
            this.props.show ? ( 
            <div className="box question is-flex" style={{marginTop: "20px", justifyContent: "space-between"}}>
                <div style={{flexDirection: "column"}}>
                    <div className="is-flex">
                        <div className="subtitle" style={{marginTop: "5px", marginRight: "10px"}}>{this.props.num}</div>
                        <p style={{fontSize:"20px", marginBottom: "10px"}} dangerouslySetInnerHTML={this.show(this.props.output)}></p>
                    </div>
                    <div>
                        {this.props.optionList.map(option => {
                            return ( 
                            <div className="control" >
                                <label className="radio is-flex" >
                                    {
                                        this.props.user.type === "faculty" ? (
                                            <div style={{display: "flex", alignItems: "center"}}><input type="radio" id={option.id} name={this.props.id} checked={this.props.correctAnswer.filter(answer => answer.text === option.id).length} disabled style={{margin: "0 10px"}}/></div>
                                        ) : (
                                            <div style={{display: "flex", alignItems: "center"}}><input type="radio" id={option.id} name={this.props.id} checked={this.props.studentAnswer.filter(answer => answer.text === option.id).length} disabled style={{margin: "0 10px"}}/></div>
                                        )
                                    }
                                    <div dangerouslySetInnerHTML={this.show(option.optionText)}></div>
                                </label>
                            </div>)
                        })}
                    </div>
                    {
                        this.props.past && this.props.user.type === "student" ? (
                            <div>
                                <p className="subtitle" style={{marginTop: "20px", marginBottom: "0px"}}>Correct Answers</p>
                                {/* {console.log(this.props.correctAnswer, this.props.studentAnswer)} */}
                                <div style={{marginLeft: "20px", marginTop: "10px"}}>
                                    {this.props.optionList.filter(option => this.props.correctAnswer.filter(answer => answer.text === option.id).length)
                                    .map(option => 
                                        <div className="is-flex" style={{alignItems: "center"}}>
                                            <ArrowForwardIcon />
                                            <div dangerouslySetInnerHTML={this.show(option.optionText)}></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : ""
                    }
                </div>
                {
                    this.props.from === "exam" ? (
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", width: "270px"}}>
                            {this.props.past && this.props.user.type === "student" ? this.findStatus() : ""}
                            <div style={{display: "flex", flexDirection: "column", width: "270px", alignItems: "flex-end", justifyContent: "flex-end", flex: 1}}>
                                <p>Correct Answer Marks : {this.props.marks.correctAnswer}</p>
                                <p>Wrong Answer Marks : {this.props.marks.wrongAnswer}</p>
                                {
                                    this.props.marks.partialEnabled ? 
                                    <p>Partial Marks : {this.props.marks.partiallyCorrect}</p> : ""
                                }
                            </div>
                        </div>
                    ) : (
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                {/* {console.log(this.props.num, this.props.total)} */}
                                {/* {this.props.examPaper.has(this.props.id) ? <CheckCircleIcon /> : ""} */}
                                {/* {this.props.examPaper.has(this.props.id) ? (
                                    <div onClick={this.handleRemove} style={{display: "inline-block", cursor: "pointer"}}>
                                        <RemoveCircleIcon />
                                    </div>) : (
                                    <div onClick={this.handleAdd} style={{display: "inline-block", cursor: "pointer"}}>
                                        <AddCircleIcon />
                                    </div>)
                                } */}
                                <div onClick={this.handleEdit} style={{display: "inline-block", cursor: "pointer"}}><EditIcon /></div>
                                <div onClick={() => this.props.removeQuestion(this.props.id)} style={{display: "inline-block", cursor: "pointer"}}><DeleteIcon /></div>
                                <div onClick={() => this.check(true)} style={{display: "inline-block", cursor: "pointer"}}><ArrowUpwardIcon /></div>
                                <div onClick={() => this.check(false)} style={{display: "inline-block", cursor: "pointer"}}><ArrowDownwardIcon /></div>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", width: "270px", alignItems: "flex-end", justifyContent: "flex-end", flex: 1}}>
                                <p>Correct Answer Marks : {this.props.question_set.get(this.props.id).positiveMarks}</p>
                                <p>Wrong Answer Marks : {this.props.question_set.get(this.props.id).negativeMarks}</p>
                                {
                                    this.props.question_set.get(this.props.id).partialEnabled ? 
                                    <p>Partial Marks : {this.props.question_set.get(this.props.id).partialMarks}</p> : ""
                                }
                            </div>
                        </div>
                    )
                }
            </div>) : (
            <div className="box question is-flex" style={{marginTop: "20px", justifyContent: "space-between"}}>
                <div style={{flexDirection: "column", marginLeft: "30px", width: "100%"}}>
                    <div className="is-flex" style={{width: "100%"}}>
                        <div className="subtitle" style={{marginTop: "5px", marginRight: "10px"}}>{this.props.num}</div>
                        <p style={{fontSize:"20px", marginBottom: "10px", flex: 1}} dangerouslySetInnerHTML={this.show(this.props.output)}></p>
                    </div>
                    <div>
                        {this.props.optionList.map(option => {
                            return ( 
                            <div className="control" >
                                <label className="radio is-flex" >
                                    <div style={{display: "flex", alignItems: "center", marginLeft: "20px"}}>
                                        <input type="radio" id={option.id} name={this.props.id} style={{margin: "0 10px"}} onChange={this.handleChange}/>
                                    </div>
                                    <div dangerouslySetInnerHTML={this.show(option.optionText)}></div>
                                </label>
                            </div>)
                        })}
                    </div>
                    <b>
                        <div className="is-flex" style={{justifyContent: "space-evenly", marginTop: "20px"}}>
                            <p>Correct Answer Marks : {this.props.marks.correctAnswer}</p>
                            <p>Wrong Answer Marks : {this.props.marks.wrongAnswer}</p>
                            {
                                this.props.marks.partialEnabled ? 
                                <p>Partial Marks : {this.props.marks.partiallyCorrect}</p> : ""
                            }
                        </div>
                    </b>
                </div>
            </div>)
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question_set: state.question.question_set,
        user : state.auth.user
        // examPaper: state.question.examPaper
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeQuestion: (id) => dispatch(removeQuestion(id)),
        swapQuestion: (first, second) => dispatch(swapQuestion(first, second)),
        // addQuestionInPaper: (id) => dispatch(addQuestionInPaper(id)),
        // removeQuestionFromPaper: (id) => dispatch(removeQuestionFromPaper(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionCardSingle))
