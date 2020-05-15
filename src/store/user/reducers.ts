import { UserState, UserActions } from "./types";

const initialState: UserState = {
    userData: null,
    isAuthorized: false,
};

export default (state = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...action.payload,
            };

        case "LOGOUT":
            return {
                ...action.payload,
            };

        default:
            return state;
    }
};
