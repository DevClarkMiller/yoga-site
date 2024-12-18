export const INITIAL_CLASS = {
    title: "",
    subtitle: "",
    description: "",
    fee: 10,
    image64: "",
    class_ID: -1
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
        case "SET": 
            return state = action.payload;
        default:
            return state;
    }
}