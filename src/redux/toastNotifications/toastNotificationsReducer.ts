import {
    ADD_TOAST_NOTIFICATION,
    REMOVE_TOAST_NOTIFICATION,
    addToastNotification,
    removeToastNotification,
    Notification_T
} from './toastNotificationsActions';

export interface ToastNotificationState {
    notifications: Notification_T[];
}

export const InitialState: ToastNotificationState = {
    notifications: []
};

type Action = addToastNotification | removeToastNotification;

export const toastNotificationsReducer = (
    state: ToastNotificationState = InitialState,
    action: Action
): ToastNotificationState => {
    switch (action.type) {
        case ADD_TOAST_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.value]
            };
        case REMOVE_TOAST_NOTIFICATION:
            state.notifications.splice(state.notifications.indexOf(action.value), 1);
            return {
                ...state,
                notifications: [...state.notifications]
            };
        default:
            return state;
    }
};
