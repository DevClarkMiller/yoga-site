export const INITIAL_LOCATION_CLASS = {
    locationClasses_ID: -1,
    location_ID: undefined,
    class_ID: undefined,
    month: undefined,
    days: "",
    times: ""
}

export const locationClassesReducer = (state, action) =>{
    switch(action.type){
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]:action.payload.value
            };
        case "RESET_FIELDS":
            return state = INITIAL_LOCATION_CLASS;
        case "SET": 
            return state = action.payload;
        default:
            return state;
    }
}