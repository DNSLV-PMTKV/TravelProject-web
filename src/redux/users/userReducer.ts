import { setAuthenticated, setUsername, SET_AUTHENTICATED, SET_USERNAME } from './userActions';

export interface UserState {
    isAuthenticated: boolean;
    username: string;
}

export const InitialState: UserState = {
    isAuthenticated: false,
    username: ''
};

type Action = setAuthenticated | setUsername;

export const userReducer = (state: UserState = InitialState, action: Action): UserState => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.value
            };
        case SET_USERNAME:
            return {
                ...state,
                username: action.value
            };
        default:
            return state;
    }
};
