import { combineReducers, Reducer } from 'redux';
import { SettingsState, settingsReducer } from './settings/settingsReducer';
import { UserState, userReducer } from './users/userReducer';

export interface ApplicationState {
    user: UserState;
    settings: SettingsState;
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    user: userReducer,
    settings: settingsReducer
});

export default reducers;
