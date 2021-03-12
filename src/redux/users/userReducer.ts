import { SET_AUTHENTICATED, setAuthenticated } from './userActions';

export interface UserState {
    isAuthenticated: boolean;
}

export const InitialState: UserState = {
    isAuthenticated: false
};

type Action = setAuthenticated;

export const userReducer = (state: UserState = InitialState, action: Action): UserState => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.value
            };
        default:
            return state;
    }
};
