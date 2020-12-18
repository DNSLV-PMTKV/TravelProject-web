import { SET_AUTHENTICATED } from '../types';

export interface UserState {
    isAuthenticated: boolean
}

type Action = {type: 'SET_AUTHENTICATED', paylod: boolean}

export const InitialState: UserState = {
    isAuthenticated: false
};


export const userReducer = (state: UserState = InitialState, action: Action): UserState => {
    switch(action.type){
        case 'SET_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: true
            };
        default:
            return state;
    }
};