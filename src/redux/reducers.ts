import { combineReducers, Reducer } from 'redux';

import { UserState, userReducer } from './users/userReducer';

export interface ApplicationState {
    user: UserState;
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    user: userReducer
});

export default reducers;
