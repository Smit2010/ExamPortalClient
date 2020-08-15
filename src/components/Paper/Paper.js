import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import QuestionCardSingle from './QuestionCardSingle';
import QuestionCardMultiple from './QuestionCardMultiple';
import QuestionCardSubjective from './QuestionCardSubjective';
import QuestionCardDiagram from './QuestionCardDiagram';
import { Divider } from '@material-ui/core';
import { addQuestion } from '../../actions/question';

class Paper extends Component {

    handleAddQuestion = () => {
        this.props.addQuestion()
        this.props.history.replace(`/add-question`)
    }

    handleCreatePaper = () => {

    }

    render() {
        //split questions according to the types
        let single = []
        let subjective = []
        let multiple = []
        let diagram = []
        Array.from(this.props.question_set.values()).map(element => {
            if(element.type === "SINGLE") {
                single.push(element)
            } else if(element.type === "MULTIPLE") {
                multiple.push(element)
            } else if(element.type === "SUBJECTIVE") {
                subjective.push(element)
            } else if(element.type === "DIAGRAM") {
                diagram.push(element)
            }
        })

        let count = 0, total = 1
        function incr() {total = total + multiple.length}
        function calcId(type, num1,num2) {
            let ans1, ans2
            if(type === "multiple") {
                ans1 = multiple[num1-1].id
                ans2 = multiple[num2-1].id
            } else {

            }
            return [ans1, ans2]
        }

        // console.log(this.state)

        return (
            <div className="container" style={{marginTop:"100px"}}>
                <h1 className="title">Generate Question Paper</h1>
                <div className="container">

                    {/* Show multiple choice questions */}
                    {multiple.length > 0 && <div className="box">
                        <p className="subtitle">Multiple Choise Questions</p>
                        <Divider />
                            {multiple.map(elem => {
                                count = count + 1
                                return <QuestionCardMultiple calcId={calcId} show={true} id={elem.id} len={multiple.length} num={count} total={total} output={elem.output} optionList={elem.optionList}/>
                            })
                        }
                    </div>}

                    {incr()}

                    {/* Show single choice questions */}
                    {single.length > 0 && <div className="box">
                        <p className="subtitle">Single Choise Questions</p>
                        <Divider />
                            {single.map(elem => {
                                count = count + 1
                                return <QuestionCardSingle calcId={calcId} show={true} id={elem.id} len={single.length} num={count} total={total} output={elem.output} optionList={elem.optionList}/>
                            })
                        }
                    </div>}

                    {incr()}

                    {/* Show subjective questions */}

                    {subjective.length > 0 && <div className="box">
                        <p className="subtitle">Subjective Questions</p>
                        <Divider />
                            {subjective.map(elem => {
                                count = count + 1
                                return <QuestionCardSubjective calcId={calcId} show={true} id={elem.id} len={subjective.length} num={count} total={total} output={elem.output} optionList={elem.optionList}/>
                            })
                        }
                    </div>}

                    {incr()}

                    {/* Show diagram based questions */}

                    {diagram.length > 0 && <div className="box">
                        <p className="subtitle">Diagram Based Questions</p>
                        <Divider />
                            {diagram.map(elem => {
                                count = count + 1
                                return <QuestionCardDiagram calcId={calcId} show={true} id={elem.id} len={diagram.length} num={count} total={total} output={elem.output} optionList={elem.optionList}/>
                            })
                        }
                    </div>}

                </div>

                {/* Button to add question and create paper*/}
                <div className="is-flex" style={{justifyContent: "center", marginBottom: "20px"}}>
                    <button className="button is-outlined is-rounded is-link" style={{marginTop: "20px"}} onClick={this.handleAddQuestion}>Add Question</button>
                    <button className="button is-outlined is-rounded is-link" style={{marginTop: "20px", marginLeft: "40px"}} onClick={this.handleCreatePaper}>Create Paper</button>
                </div>
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
        addQuestion: () => dispatch(addQuestion())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Paper))
