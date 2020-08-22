import {QUESTIONS} from './types'

export const addQuestion = () => {
    return {
        type: QUESTIONS.ADD_QUESTION
    }
}

export const setQuestion = (id,question,output) => {
    return {
        type: QUESTIONS.SET_QUESTION,
        id,
        question,
        output
    }
}

export const setAnswer = (id, ans, flag, questionType) => {
    return {
        type: QUESTIONS.SET_ANSWER,
        id,
        ans,
        flag,
        questionType
    }
}

export const setQuestionType = (id,questionType) => {
    return {
        type: QUESTIONS.SET_QUESTION_TYPE,
        id,
        questionType
    }
}

export const removeQuestion = (id) => {
    return {
        type: QUESTIONS.REMOVE_QUESTION,
        id
    }
}

export const swapQuestion = (first,second) => {
    return {
        type: QUESTIONS.SWAP_QUESTION,
        first,
        second
    }
}

export const addOption = (questionId) => {
    return {
        type: QUESTIONS.ADD_OPTION,
        questionId
    }
}

export const setOption = (questionId,optionId,option,output) => {
    return {
        type: QUESTIONS.SET_OPTION,
        questionId,
        optionId,
        option,
        output
    }
}

export const removeOption = (questionId, optionId) => {
    return {
        type: QUESTIONS.REMOVE_OPTION,
        questionId,
        optionId
    }
}

export const toggleQuestionBoldFlag = (id) => {
    return {
        type: QUESTIONS.TOGGLE_QUESTION_BOLD_FLAG,
        id
    }
}

export const toggleQuestionItalicFlag = (id) => {
    return {
        type: QUESTIONS.TOGGLE_QUESTION_ITALIC_FLAG,
        id
    }
}

export const toggleQuestionUnderlineFlag = (id) => {
    return {
        type: QUESTIONS.TOGGLE_QUESTION_UNDERLINE_FLAG,
        id
    }
}

export const toggleQuestionModal = (id) => {
    return {
        type: QUESTIONS.TOGGLE_QUESTION_MODAL,
        id
    }
}

export const toggleOptionBoldFlag = (questionId, optionId) => {
    return {
        type: QUESTIONS.TOGGLE_OPTION_BOLD_FLAG,
        questionId,
        optionId
    }
}

export const toggleOptionItalicFlag = (questionId, optionId) => {
    return {
        type: QUESTIONS.TOGGLE_OPTION_ITALIC_FLAG,
        questionId,
        optionId
    }
}

export const toggleOptionUnderlineFlag = (questionId, optionId) => {
    return {
        type: QUESTIONS.TOGGLE_OPTION_UNDERLINE_FLAG,
        questionId,
        optionId
    }
}

export const toggleOptionModal = (questionId, optionId) => {
    return {
        type: QUESTIONS.TOGGLE_OPTION_MODAL,
        questionId,
        optionId
    }
}

export const setQuestionImgSrc = (id,value) => {
    return {
        type: QUESTIONS.SET_QUESTION_IMG_SRC,
        id,
        value
    }
}

export const setQuestionAlternative = (id,value) => {
    return {
        type: QUESTIONS.SET_QUESTION_ALTERNATIVE,
        id,
        value
    }
}

export const setQuestionHeight = (id,value) => {
    return {
        type: QUESTIONS.SET_QUESTION_HEIGHT,
        id,
        value
    }
}

export const setQuestionWidth = (id,value) => {
    return {
        type: QUESTIONS.SET_QUESTION_WIDTH,
        id,
        value
    }
}

export const setOptionImgSrc = (questionId, optionId, value) => {
    return {
        type: QUESTIONS.SET_OPTION_IMG_SRC,
        questionId,
        optionId,
        value
    }
}

export const setOptionAlternative = (questionId, optionId, value) => {
    return {
        type: QUESTIONS.SET_OPTION_ALTERNATIVE,
        questionId,
        optionId,
        value
    }
}

export const setOptionHeight = (questionId, optionId, value) => {
    return {
        type: QUESTIONS.SET_OPTION_HEIGHT,
        questionId,
        optionId,
        value
    }
}

export const setOptionWidth = (questionId, optionId, value) => {
    return {
        type: QUESTIONS.SET_OPTION_WIDTH,
        questionId,
        optionId,
        value
    }
}
