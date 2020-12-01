import { Button, Container, Grid, Link, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { emailRegex } from '../../constants/regex';

// interface Props {}

interface Errors {
    email: boolean;
    password: boolean;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState('');

    const [errors, setErrors] = useState<Errors>({ email: false, password: false });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        console.log('event.target', event.target);
        emailRegex.test(email) ? setErrors({ ...errors, email: false }) : null;
    };

    const handleOnBlur = () => {
        !emailRegex.test(email) ? setErrors({ ...errors, email: true }) : setErrors({ ...errors, email: false });
    };

    return (
        <Container component='main' maxWidth='xs'>
            <form>
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    // autoFocus
                    value={email}
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                    error={errors?.email}
                    helperText={errors?.email ? 'Please enter valid email' : ''}
                />
                <TextField
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                />
                <Button type='submit' fullWidth variant='contained' color='primary'>
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href='#' variant='body2'>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href='#' variant='body2'>
                            Don&apos;t have an account? Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Login;
