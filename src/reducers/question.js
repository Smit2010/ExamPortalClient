import { QUESTIONS } from "../actions/types";

const initialState = {
    question_set: new Map([]),
    currQuestionId: 0,
    currOptionId: 0,
    examPaper: new Set()
}

export default function (state = initialState, action) {
    switch(action.type) {
        case QUESTIONS.ADD_QUESTION:
            let newMap = new Map(state.question_set)
            let newCurrQuestionId = (state.currQuestionId + 1).toString()
            newMap.set(newCurrQuestionId, {
                id: newCurrQuestionId,
                type: "",
                question: "",
                output: "",
                boldFlag: false,
                italicFlag: false,
                underlineFlag: false,
                visible: false,
                img_src: "",
                alternative: "",
                width: "",
                height: "",
                answer: new Set(),
                optionList: new Map()
            })
            return {...state, question_set: newMap, currQuestionId: parseInt(newCurrQuestionId)}

        case QUESTIONS.SET_QUESTION:
            let newMap1 = new Map(state.question_set)
            let currQuestionId1 = (action.id).toString()
            newMap1.set(currQuestionId1, {
                ...newMap1.get(currQuestionId1),
                question: action.question,
                output: action.output
            })
            return {...state, question_set: newMap1}

        case QUESTIONS.SET_ANSWER:
            let newMap24 = new Map(state.question_set)
            let currQuestionId24 = (action.id).toString()
            let set24 = newMap24.get(currQuestionId24).answer
            // console.log(action.flag)
            if(action.flag === true) {
                if(action.questionType !== "MULTIPLE") {
                    set24.clear()
                }
                // console.log(action.ans)
                if(action.ans !== "")
                    set24.add(action.ans)
            } else {
                set24.delete(action.ans)
            }
            // console.log(set24)
            newMap24.set(currQuestionId24, {
                ...newMap24.get(currQuestionId24),
                answer: set24
            })
            return {...state, question_set: newMap24}

        case QUESTIONS.SET_QUESTION_TYPE:
            let newMap23 = new Map(state.question_set)
            let currQuestionId23 = (action.id).toString()
            newMap23.set(currQuestionId23, {
                ...newMap23.get(currQuestionId23),
                type: action.questionType
            })
            return {...state, question_set: newMap23}

        case QUESTIONS.REMOVE_QUESTION:
            let newMap2 = new Map(state.question_set)
            let currQuestionId2 = (action.id).toString()
            newMap2.delete(currQuestionId2)
            return {...state, question_set: newMap2}

        case QUESTIONS.SWAP_QUESTION:
            let newMap3 = new Map(state.question_set)
            let currFirst3 = (action.first).toString()
            let currSecond3 = (action.second).toString()
            let newQuestionSet = new Map()
            newMap3.forEach((value, key) => {
                if(key === currFirst3) {
                    newQuestionSet.set(currSecond3, newMap3.get(currSecond3))
                } else if(key === currSecond3) {
                    newQuestionSet.set(currFirst3, newMap3.get(currFirst3))
                }
                else {
                    newQuestionSet.set(key, value)
                }
            })
            return {...state, question_set: newQuestionSet}

        case QUESTIONS.ADD_OPTION:
            let newMap4 = new Map(state.question_set)
            let currQuestionId4 = (action.questionId).toString()
            let newOptionId = state.currOptionId + 1
            let newCurrOptionId4 = currQuestionId4 + '.'  + newOptionId
            let existingQuestion4 = newMap4.get(currQuestionId4)
            existingQuestion4.optionList.set(newCurrOptionId4,{
                id: newCurrOptionId4,
                option: "",
                output: "",
                boldFlag: false,
                italicFlag: false,
                underlineFlag: false,
                visible: false,
                img_src: "",
                alternative: "",
                width: "",
                height: ""
            })
            newMap4.set(currQuestionId4, existingQuestion4)
            return {...state, question_set: newMap4, currOptionId: newOptionId}

        case QUESTIONS.SET_OPTION:
            let newMap5 = new Map(state.question_set)
            let currQuestionId5 = (action.questionId).toString()
            let newCurrOptionId5 = action.optionId
            // console.log(newCurrOptionId5)
            let existingQuestion5 = newMap5.get(currQuestionId5)
            existingQuestion5.optionList.set(newCurrOptionId5,{
                ...existingQuestion5.optionList.get(newCurrOptionId5),
                option: action.option,
                output: action.output
            })
            newMap5.set(currQuestionId5, existingQuestion5)
            return {...state, question_set: newMap5}

        case QUESTIONS.REMOVE_OPTION:
            let newMap6 = new Map(state.question_set)
            let currQuestionId6 = (action.questionId).toString()
            if(newMap6.get(currQuestionId6).type === "SUBJECTIVE") {
                newMap6.get(currQuestionId6).answer.clear()
            } else {
                newMap6.get(currQuestionId6).answer.delete(action.optionId)
            }
            let newCurrOptionId6 = action.optionId
            let existingQuestion6 = newMap6.get(currQuestionId6)
            existingQuestion6.optionList.delete(newCurrOptionId6)
            newMap6.set(currQuestionId6, existingQuestion6)
            return {...state, question_set: newMap6}

        case QUESTIONS.TOGGLE_QUESTION_BOLD_FLAG:
            let newMap7 = new Map(state.question_set)
            let currQuestionId7 = (action.id).toString()
            newMap7.set(currQuestionId7,{
                ...newMap7.get(currQuestionId7),
                boldFlag: !newMap7.get(currQuestionId7).boldFlag
            })
            return {...state, question_set: newMap7}

        case QUESTIONS.TOGGLE_QUESTION_ITALIC_FLAG:
            let newMap8 = new Map(state.question_set)
            let currQuestionId8 = (action.id).toString()
            newMap8.set(currQuestionId8,{
                ...newMap8.get(currQuestionId8),
                italicFlag: !newMap8.get(currQuestionId8).italicFlag
            })
            return {...state, question_set: newMap8}

        case QUESTIONS.TOGGLE_QUESTION_UNDERLINE_FLAG:
            let newMap9 = new Map(state.question_set)
            let currQuestionId9 = (action.id).toString()
            newMap9.set(currQuestionId9,{
                ...newMap9.get(currQuestionId9),
                underlineFlag: !newMap9.get(currQuestionId9).underlineFlag
            })
            return {...state, question_set: newMap9}

        case QUESTIONS.TOGGLE_QUESTION_MODAL:
            let newMap10 = new Map(state.question_set)
            let currQuestionId10 = (action.id).toString()
            newMap10.set(currQuestionId10,{
                ...newMap10.get(currQuestionId10),
                visible: !newMap10.get(currQuestionId10).visible
            })
            return {...state, question_set: newMap10}

        case QUESTIONS.TOGGLE_OPTION_BOLD_FLAG:
            let newMap11 = new Map(state.question_set)
            let currQuestionId11 = (action.questionId).toString()
            let newCurrOptionId11 = action.optionId
            newMap11.get(currQuestionId11).optionList.set(newCurrOptionId11,{
                ...newMap11.get(currQuestionId11).optionList.get(newCurrOptionId11),
                boldFlag: !newMap11.get(currQuestionId11).optionList.get(newCurrOptionId11).boldFlag
            })
            return {...state, question_set: newMap11}

        case QUESTIONS.TOGGLE_OPTION_ITALIC_FLAG:
            let newMap12 = new Map(state.question_set)
            let currQuestionId12 = (action.questionId).toString()
            let newCurrOptionId12 = action.optionId
            newMap12.get(currQuestionId12).optionList.set(newCurrOptionId12,{
                ...newMap12.get(currQuestionId12).optionList.get(newCurrOptionId12),
                italicFlag: !newMap12.get(currQuestionId12).optionList.get(newCurrOptionId12).italicFlag
            })
            return {...state, question_set: newMap12}

        case QUESTIONS.TOGGLE_OPTION_UNDERLINE_FLAG:
            let newMap13 = new Map(state.question_set)
            let currQuestionId13 = (action.questionId).toString()
            let newCurrOptionId13 = action.optionId
            newMap13.get(currQuestionId13).optionList.set(newCurrOptionId13,{
                ...newMap13.get(currQuestionId13).optionList.get(newCurrOptionId13),
                underlineFlag: !newMap13.get(currQuestionId13).optionList.get(newCurrOptionId13).underlineFlag
            })
            return {...state, question_set: newMap13}

        case QUESTIONS.TOGGLE_OPTION_MODAL:
            let newMap14 = new Map(state.question_set)
            let currQuestionId14 = (action.questionId).toString()
            let newCurrOptionId14 = action.optionId
            newMap14.get(currQuestionId14).optionList.set(newCurrOptionId14,{
                ...newMap14.get(currQuestionId14).optionList.get(newCurrOptionId14),
                visible: !newMap14.get(currQuestionId14).optionList.get(newCurrOptionId14).visible
            })
            return {...state, question_set: newMap14}

        case QUESTIONS.SET_QUESTION_IMG_SRC:
            let newMap15 = new Map(state.question_set)
            let currQuestionId15 = (action.id).toString()
            newMap15.set(currQuestionId15,{
                ...newMap15.get(currQuestionId15),
                img_src: action.value
            })
            return {...state, question_set: newMap15}

        case QUESTIONS.SET_QUESTION_ALTERNATIVE:
            let newMap16 = new Map(state.question_set)
            let currQuestionId16 = (action.id).toString()
            newMap16.set(currQuestionId16,{
                ...newMap16.get(currQuestionId16),
                alternative: action.value
            })
            return {...state, question_set: newMap16}

        case QUESTIONS.SET_QUESTION_HEIGHT:
            let newMap17 = new Map(state.question_set)
            let currQuestionId17 = (action.id).toString()
            newMap17.set(currQuestionId17,{
                ...newMap17.get(currQuestionId17),
                height: action.value
            })
            return {...state, question_set: newMap17}

        case QUESTIONS.SET_QUESTION_WIDTH:
            let newMap18 = new Map(state.question_set)
            let currQuestionId18 = (action.id).toString()
            newMap18.set(currQuestionId18,{
                ...newMap18.get(currQuestionId18),
                width: action.value
            })
            return {...state, question_set: newMap18}

        case QUESTIONS.SET_OPTION_IMG_SRC:
            let newMap19 = new Map(state.question_set)
            let currQuestionId19 = (action.questionId).toString()
            let newCurrOptionId19 = action.optionId
            let existingQuestion19 = newMap19.get(currQuestionId19)
            existingQuestion19.optionList.set(newCurrOptionId19,{
                ...existingQuestion19.optionList.get(newCurrOptionId19),
                img_src: action.value
            })
            newMap19.set(currQuestionId19,existingQuestion19)
            return {...state, question_set: newMap19}

        case QUESTIONS.SET_OPTION_ALTERNATIVE:
            let newMap20 = new Map(state.question_set)
            let currQuestionId20 = (action.questionId).toString()
            let newCurrOptionId20 = action.optionId
            let existingQuestion20 = newMap20.get(currQuestionId20)
            existingQuestion20.optionList.set(newCurrOptionId20,{
                ...existingQuestion20.optionList.get(newCurrOptionId20),
                alternative: action.value
            })
            newMap20.set(currQuestionId20,existingQuestion20)
            return {...state, question_set: newMap20}

        case QUESTIONS.SET_OPTION_HEIGHT:
            let newMap21 = new Map(state.question_set)
            let currQuestionId21 = (action.questionId).toString()
            let newCurrOptionId21 = action.optionId
            let existingQuestion21 = newMap21.get(currQuestionId21)
            existingQuestion21.optionList.set(newCurrOptionId21,{
                ...existingQuestion21.optionList.get(newCurrOptionId21),
                height: action.value
            })
            newMap21.set(currQuestionId21,existingQuestion21)
            return {...state, question_set: newMap21}

        case QUESTIONS.SET_OPTION_WIDTH:
            let newMap22 = new Map(state.question_set)
            let currQuestionId22 = (action.questionId).toString()
            let newCurrOptionId22 = action.optionId
            let existingQuestion22 = newMap22.get(currQuestionId22)
            existingQuestion22.optionList.set(newCurrOptionId22,{
                ...existingQuestion22.optionList.get(newCurrOptionId22),
                width: action.value
            })
            newMap22.set(currQuestionId22,existingQuestion22)
            return {...state, question_set: newMap22}

        case QUESTIONS.ADD_QUESTION_IN_PAPER:
            let newMap25 = state.examPaper
            newMap25.add(action.id)
            return {...state, examPaper: newMap25}

        case QUESTIONS.REMOVE_QUESTION_FROM_PAPER:
            let newMap26 = state.examPaper
            newMap26.delete(action.id)
            return {...state, examPaper: newMap26}
        
        default:
            return state
    }
}