const initialState = {
    registeredCourses: []
}

export default function (state = initialState, action){
    switch(action.type){
        case "GET_COURSES":

            return Object.assign({}, state, {
                registeredCourses: action.userCourses
            })

        case "ADD_COURSE":
            return{
                ...state,
                registeredCourses: [...state.registeredCourses, action.courseName]
            }

        default:
            return state;
    }
}