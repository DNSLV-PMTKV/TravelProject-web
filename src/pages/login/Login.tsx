import { Button, Card, CardContent, CardHeader, Container, Grid, Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { FormErrors } from '../../components/FormErrors/FormErrors';
import { ControllTextInput } from '../../components/TextInput/TextInput';
import { validateEmail } from '../../helpers/validators';
import useLogin from '../../hooks/useLogin';
import { useTitle } from '../../hooks/useTitle';

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
    const { onSubmit, control, errors } = useLogin();
    const classes = useStyles();

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
                    <form noValidate className={classes.form} onSubmit={onSubmit}>
                        <ControllTextInput
                            required
                            fullWidth
                            id='email'
                            label='Email'
                            name='email'
                            control={control}
                            rules={{ required: 'Email is required.', validate: validateEmail }}
                        />
                        <ControllTextInput
                            required
                            fullWidth
                            id='password'
                            label='Password'
                            name='password'
                            type='password'
                            control={control}
                            rules={{ required: 'Password is required.' }}
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
            <FormErrors errors={errors} />
        </Container>
    );
};

export default Login;
