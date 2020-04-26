import { LOGIN, LOGOUT, UserActions, UserData } from "./types";

export const login = (userData: UserData): UserActions => {
    return {
        type: LOGIN,
        payload: {
            isAuthorized: true,
            userData: userData }
    };
};

export const logout = (): UserActions => {
    return {
        type: LOGOUT,
        payload: {
            isAuthorized: false,
            userData: null 
        }
    };
};