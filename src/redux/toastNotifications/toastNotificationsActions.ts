export const ADD_TOAST_NOTIFICATION = 'ADD_TOAST_NOTIFICATION';
type ADD_TOAST_NOTIFICATION_T = typeof ADD_TOAST_NOTIFICATION;

export const REMOVE_TOAST_NOTIFICATION = 'REMOVE_TOAST_NOTIFICATION';
type REMOVE_TOAST_NOTIFICATION_T = typeof REMOVE_TOAST_NOTIFICATION;

export type Notification_T = {
    severity: 'error' | 'warning' | 'info' | 'success';
    message: string | Node;
};

export interface addToastNotification {
    type: ADD_TOAST_NOTIFICATION_T;
    value: Notification_T;
}

export interface removeToastNotification {
    type: REMOVE_TOAST_NOTIFICATION_T;
    value: Notification_T;
}

export const addToastNotification = (data: Notification_T): addToastNotification => {
    return { type: ADD_TOAST_NOTIFICATION, value: data };
};

export const removeToastNotification = (data: Notification_T): removeToastNotification => {
    return { type: REMOVE_TOAST_NOTIFICATION, value: data };
};
