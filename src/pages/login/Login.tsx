import { Button, Container, Grid, Link, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import UserRequests from '../../requests/userRequests';
import ErrorIcon from '@material-ui/icons/Error';
import { useHistory } from 'react-router-dom';
import { setAuthenticated } from '../../redux/users/userActions';
import { useDispatch } from 'react-redux';

interface Errors {
    email?: string[];
    password?: string[];
    non_field_errors: string[];
}

const useStyles = makeStyles(() =>
    createStyles({
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
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

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
                dispatch(setAuthenticated());
            })
            .then(() => {
                history.push('/');
            })
            .catch((err) => {
                setErrors(err.response.data);
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

    return (
        <Container component='div' maxWidth='sm'>
            <Typography variant='h2' align='center'>
                Log in.
            </Typography>
            <form onSubmit={handleSumbit}>
                <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit' fullWidth variant='contained' color='primary'>
                    Log in
                    <ArrowForwardIcon />
                </Button>
            </form>
            <Grid container alignItems='center' alignContent='center' justify='space-between'>
                <Grid item>
                    <Link href='#' variant='body2' className={classes.links}>
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
