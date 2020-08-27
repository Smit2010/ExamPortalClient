const initialState = {
    results: null
}

export default function (state = initialState, action){
    switch(action.type){
        case "GET_RESULTS":
            return{
                ...state,
                results: action.results
            }

        default:
            return state;
    }
}