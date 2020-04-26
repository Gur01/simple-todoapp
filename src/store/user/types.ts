export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export interface UserData {
    id: number;
    name: string; 
    surname: string;
}

export interface UserState {
    userData: UserData | null;
    isAuthorized: boolean;
}

interface LoginAction {
    type: typeof LOGIN;
    payload: UserState;
}

interface LogoutAction {
    type: typeof LOGOUT;
    payload: UserState;
}

export type UserActions = LoginAction | LogoutAction;
