export interface UserState {
    user: {
        id: number;
        name: string; 
        surname: string;
    } | null;
    isAuthorized: boolean;
}
