import { combineReducers, Reducer } from 'redux';
import { SettingsState, settingsReducer } from './settings/settingsReducer';
import { ToastNotificationState, toastNotificationsReducer } from './toastNotifications/toastNotificationsReducer';
import { UserState, userReducer } from './users/userReducer';

export interface ApplicationState {
    user: UserState;
    settings: SettingsState;
    notifications: ToastNotificationState;
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    user: userReducer,
    settings: settingsReducer,
    notifications: toastNotificationsReducer
});

export default reducers;
