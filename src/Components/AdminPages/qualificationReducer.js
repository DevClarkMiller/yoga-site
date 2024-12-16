export const INITIAL_QUALIFICATION = {
    qualification_ID: -1,
    text: ""
}

export const qualificationReducer = (state, action) =>{
    switch(action.type){
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]:action.payload.value
            };
        case "RESET_FIELDS":
            return state = INITIAL_QUALIFICATION;
        case "SET_QUALIFICATION": 
            return state = action.payload;
        default:
            return state;
    }
}