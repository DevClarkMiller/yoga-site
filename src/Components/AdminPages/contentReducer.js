export const INITIAL_CONTENT = {
    layout: "",
    header: "",
    text: "",
    colour: "#B3FCEC",
    contentPanel_ID: -1
}

export const contentReducer = (state, action) =>{
    switch(action.type){
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]:action.payload.value
            };
        case "RESET_FIELDS":
            return state = INITIAL_CONTENT;
        case "SET_CONTENT": 
            return state = action.payload;
        default:
            return state;
    }
}