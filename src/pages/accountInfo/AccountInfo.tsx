import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    createStyles,
    Grid,
    makeStyles,
    Snackbar,
    Typography
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from '../../components/TextInput/TextInput';
import { addToastNotification } from '../../redux/toastNotifications/toastNotificationsActions';
import UserRequests, { UserInfoInterface } from '../../requests/userRequests';

const emptyValuesUserData: UserInfoInterface = {
    first_name: '',
    last_name: '',
    email: '',
    id: -1,
    is_active: false
};

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            padding: '0 12px !important'
        }
    })
);

const AccountInfo: React.FC = () => {
    const classes = useStyles();
    const [user, setUser] = useState<UserInfoInterface>(emptyValuesUserData);
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        UserRequests.getLoggedUser()
            .then((res) => {
                if (mounted) {
                    setUser(res.data);
                }
            })
            .catch((err) => {
                console.error('err', err);
                dispatch(addToastNotification({ severity: 'error', message: 'Could not fetch information' }));
            });
        return () => {
            mounted = false;
        };
    }, []);

    console.log(user);

    const updateUserInfo = (): void => {
        UserRequests.updateUserInfo(user)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error(err);
                dispatch(
                    addToastNotification({
                        severity: 'error',
                        message: 'Could not fetch information aasdasdasdasdadasdadasda asdasdasda s dasda da ds ad'
                    })
                );
            });
    };
    return (
        <Container component='div' maxWidth='sm'>
            <Card raised>
                <CardHeader
                    title={
                        <Typography variant='h2' align='center'>
                            Account
                        </Typography>
                    }
                />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} className={classes.gridItem}>
                            <TextInput
                                required
                                fullWidth
                                id='first_name'
                                label='First Name'
                                name='first_name'
                                value={user?.first_name}
                                onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.gridItem}>
                            <TextInput
                                required
                                fullWidth
                                id='last_name'
                                label='Last Name'
                                name='last_name'
                                value={user?.last_name}
                                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextInput
                                required
                                fullWidth
                                id='email'
                                label='Email'
                                name='email'
                                value={user?.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <Button onClick={updateUserInfo} variant='contained' color='primary'>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AccountInfo;
