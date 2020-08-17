import React, { Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import SideBar from '../SideBar';
import QuestionCardSingle from './QuestionCardSingle';
import QuestionCardMultiple from './QuestionCardMultiple';
import QuestionCardSubjective from './QuestionCardSubjective';
import QuestionCardDiagram from './QuestionCardDiagram';
import { Divider } from '@material-ui/core';
import { addQuestion } from '../../actions/question';

class Paper extends Component {

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

    handleAddQuestion = () => {
        this.props.addQuestion()
        this.props.history.push(`/add-question`)
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

        // console.log(this.state)

        return (
            <div style={{backgroundColor: "#fff", height:"100%", display: "flex"}}>
            {this.renderDrawer()}
            <div className="container" style={{marginTop:"100px"}}>
                <h1 className="title">Generate Question Paper</h1>
                <div className="container">

                    {/* Show multiple choice questions */}
                    {multiple.length > 0 && <div className="box">
                        <p className="subtitle">Multiple Choise Questions</p>
                        <Divider />
                            {multiple.map(elem => {
                                count = count + 1
                                return <QuestionCardMultiple calcId={calcId} show={true} id={elem} num={count} output={this.props.question_set.get(elem.toString()).output} optionList={this.props.question_set.get(elem.toString()).optionList}/>
                            })
                        }
                    </div>}

                    {/* Show single choice questions */}
                    {single.length > 0 && <div className="box">
                        <p className="subtitle">Single Choise Questions</p>
                        <Divider />
                            {single.map(elem => {
                                count = count + 1
                                return <QuestionCardSingle calcId={calcId} show={true} id={elem} num={count} output={this.props.question_set.get(elem.toString()).output} optionList={this.props.question_set.get(elem.toString()).optionList}/>
                            })
                        }
                    </div>}

                    {/* Show subjective questions */}

                    {subjective.length > 0 && <div className="box">
                        <p className="subtitle">Subjective Questions</p>
                        <Divider />
                            {subjective.map(elem => {
                                count = count + 1
                                return <QuestionCardSubjective calcId={calcId} show={true} id={elem} num={count} output={this.props.question_set.get(elem.toString()).output} optionList={this.props.question_set.get(elem.toString()).optionList}/>
                            })
                        }
                    </div>}

                    {/* Show diagram based questions */}

                    {diagram.length > 0 && <div className="box">
                        <p className="subtitle">Diagram Bquestionased Questions</p>
                        <Divider />
                            {diagram.map(elem => {
                                count = count + 1
                                return <QuestionCardDiagram calcId={calcId} show={true} id={elem} num={count} output={this.props.question_set.get(elem.toString()).output} optionList={this.props.question_set.get(elem.toString()).optionList}/>
                            })
                        }
                    </div>}

                </div>

                {/* Button to add question and create paper*/}
                <div className="is-flex" style={{justifyContent: "start", marginBottom: "20px"}}>
                    <button className="button is-outlined is-rounded is-link" style={{marginTop: "20px"}} onClick={this.handleAddQuestion}>Add Question</button>
                    <button className="button is-outlined is-rounded is-link" style={{marginTop: "20px", marginLeft: "40px"}} onClick={this.handleCreatePaper}>Create Paper</button>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addQuestion: () => dispatch(addQuestion())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Paper))
