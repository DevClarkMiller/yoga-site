export const INITIAL_CLASS = {
    title: "",
    subtitle: "",
    description: "",
    fee: 10,
    image64: ""
}

export const classReducer = (state, action) =>{
    switch(action.type){
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]:action.payload.value
            };
        case "RESET_FIELDS":
            return state = INITIAL_CLASS;
        default:
            return state;
    }
}