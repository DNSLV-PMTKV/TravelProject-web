import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import { removeToastNotification } from '../../redux/toastNotifications/toastNotificationsActions';
import Alert from '@material-ui/lab/Alert';
import { setInterval } from 'timers';
import { createStyles, makeStyles, Slide } from '@material-ui/core';
import TPSlide from './TPSlide';

// interface Props {}

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            position: 'absolute',
            top: 65,
            right: 10,
            width: 250
            // height: 175,
            // justifyContent: 'space-evenly',
            // display: 'flex',
            // flexDirection: 'column'
        }
    })
);

const Toast: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toastList = useSelector((state: ApplicationState) => state.notifications.notifications);

    // const [toastList, setToastList] = useState(notifications);
    // useEffect(() => {
    //     setToastList([...toastList]);
    // }, [toastList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (toastList.length) {
                dispatch(removeToastNotification(toastList[0]));
            }
        }, 6000);
        return () => {
            clearInterval(interval);
        };
    });

    return (
        <div className={classes.container}>
            {toastList.map((toast, i) => (
                <TPSlide key={i}>
                    <Alert variant='filled' severity={toast.severity} key={i}>
                        {toast.message}
                    </Alert>
                </TPSlide>
            ))}
        </div>
    );
};

export default Toast;
