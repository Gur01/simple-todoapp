import {UserState} from "./types";

const initialState: UserState = {
    user: null,
    isAuthorized: false
};

export default (state = initialState, action: any) => {
    switch(action.type){
    case "SET_USER":{
        const { id, name, surname } = action.payload;
        return {
            ...state,
            user: {
                id, name, surname
            }
            
        };
    }
    default:
        return state;
    }
};