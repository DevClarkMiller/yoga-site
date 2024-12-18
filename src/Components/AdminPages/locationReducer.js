export const INITIAL_LOCATION = {
    location_ID: -1,
    address: "",
    lat: 0,
    long: 0
}

export const locationReducer = (state, action) =>{
    switch(action.type){
        case "CHANGE_INPUT":
            return {
                ...state,
                [action.payload.name]:action.payload.value
            };
        case "RESET_FIELDS":
            return state = INITIAL_LOCATION;
        case "SET": 
            return state = action.payload;
        default:
            return state;
    }
}