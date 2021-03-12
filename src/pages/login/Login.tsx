import { Button, Card, CardContent, CardHeader, Container, Grid, Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../redux/reducers';
import { useHistory } from 'react-router-dom';
import { TextInput } from '../../components/TextInput/TextInput';
import { useTitle } from '../../helpers/useTitle';
import { setAuthenticated } from '../../redux/users/userActions';
import UserRequests from '../../requests/userRequests';

interface Errors {
    email?: string[];
    password?: string[];
    non_field_errors: string[];
}

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            margin: '0 24px 12px 24px;'
        },
        submitButton: {
            margin: '24px auto 0 auto'
        },
        errors: {
            marginTop: '.75rem',
            color: '#d10707',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        errorBadge: {
            marginRight: '7px'
        },
        links: {
            fontWeight: 500
        }
    })
);

const Login: React.FC = () => {
    useTitle('Travel Project | Login');

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const deviceWidth = useSelector((state: ApplicationState) => state.settings.width);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState<Errors>();

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        };

        UserRequests.login(data)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(setAuthenticated(true));
            })
            .then(() => {
                history.push('/');
            })
            .catch((err: AxiosError) => {
                if (err.response) {
                    setErrors(err.response.data);
                } else {
                    setErrors({ non_field_errors: ['Something went wrong. Please try again in a few minutes.'] });
                }
            });
    };

    const renderErros = () => {
        const errorsList = [errors?.email, errors?.password, errors?.non_field_errors];
        return errorsList.map((err, key) => {
            return err ? (
                <Typography key={`err-${key}`} variant='body2' align='center' className={classes.errors}>
                    <ErrorIcon className={classes.errorBadge} />
                    {err}
                </Typography>
            ) : null;
        });
    };

    // TODO fix errros to component

    return (
        <Container component='div' maxWidth='sm'>
            <Card raised>
                <CardHeader
                    title={
                        <Typography variant='h2' align='center'>
                            Log in.
                        </Typography>
                    }
                />
                <CardContent>
                    <form className={classes.form} onSubmit={handleSumbit}>
                        <TextInput
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextInput
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            className={classes.submitButton}
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Log in
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Grid container alignItems='center' alignContent='center' justify='space-between'>
                <Grid item>
                    <Link href='/forgot-password' variant='body2' className={classes.links}>
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href='/register' variant='body2' className={classes.links}>
                        Don&apos;t have account? Register
                    </Link>
                </Grid>
            </Grid>
            {renderErros()}
        </Container>
    );
};

export default Login;
