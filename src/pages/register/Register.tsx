import { Button, Container, createStyles, Grid, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ErrorIcon from '@material-ui/icons/Error';
import React, { Fragment, useState } from 'react';
import UserRequests from '../../requests/userRequests';

// interface Props {}
interface Errors {
    email?: string[];
    non_field_errors?: string[];
    detail?: string;
}

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            marginTop: 8
        },
        gridItem: {
            padding: '0 12px !important'
        },
        linksContainer: {
            marginTop: 12
        },
        links: {
            fontWeight: 500
        },
        errorBadge: {
            marginRight: '7px'
        },
        errors: {
            marginTop: '.75rem',
            color: '#d10707',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    })
);

const Register: React.FC = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [errors, setErrors] = useState<Errors>();

    const [renderThanks, setRenderThanks] = useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password2: password2
        };

        UserRequests.register(data)
            .then(() => {
                setRenderThanks(true);
            })
            .catch((err) => {
                console.error('Eroror', err);
                setErrors(err.response.data);
            });
    };

    const renderErrors = () => {
        const errorList = [errors?.email, errors?.non_field_errors, errors?.detail];
        return errorList.map((err, key) => {
            return err ? (
                <Typography key={`err-${key}`} variant='body2' align='center' className={classes.errors}>
                    <ErrorIcon className={classes.errorBadge} />
                    {err}
                </Typography>
            ) : null;
        });
    };

    const renderForm = () => {
        return (
            <Fragment>
                <Typography variant='h2' align='center'>
                    Register.
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} className={classes.gridItem}>
                            <TextField
                                required
                                fullWidth
                                id='first_name'
                                label='First Name'
                                name='first_name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.gridItem}>
                            <TextField
                                required
                                fullWidth
                                id='last_name'
                                label='Last Name'
                                name='last_name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                required
                                fullWidth
                                id='email'
                                label='Email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                required
                                fullWidth
                                id='password2'
                                label='Re-Password'
                                name='password2'
                                type='password'
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.gridItem}>
                            <Button type='submit' fullWidth variant='contained' color='primary'>
                                Register
                                <ArrowForwardIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid
                    container
                    alignItems='center'
                    alignContent='center'
                    justify='space-between'
                    className={classes.linksContainer}
                >
                    <Grid item>
                        <Link href='#' variant='body2' className={classes.links}>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href='/login' variant='body2' className={classes.links}>
                            Already have account? Login
                        </Link>
                    </Grid>
                </Grid>
                {renderErrors()}
            </Fragment>
        );
    };

    const renderThanksMessage = () => {
        return (
            <Fragment>
                <Typography variant='h2' align='center'>
                    Thank you for registering.
                </Typography>
                <Typography variant='h6' align='center'>
                    Please confirm your email address to continue.
                </Typography>
            </Fragment>
        );
    };

    return (
        <Container component='div' maxWidth='sm'>
            {renderThanks ? renderThanksMessage() : renderForm()}
        </Container>
    );
};

export default Register;
