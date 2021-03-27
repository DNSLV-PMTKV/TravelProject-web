import { store } from 'react-notifications-component';

export const makeErrorNotification = (message: string): void => {
    store.addNotification({
        message: message,
        title: 'Success!',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true
        }
    });
};

export const makeSuccessNotification = (message: string): void => {
    store.addNotification({
        message: message,
        title: 'Success!',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 99999999,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true
        }
    });
};
