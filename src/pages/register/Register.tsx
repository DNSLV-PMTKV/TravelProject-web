import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    createStyles,
    Grid,
    Link,
    makeStyles,
    Typography
} from '@material-ui/core';
import React from 'react';
import { FormErrors } from '../../components/FormErrors/FormErrors';
import { ControllTextInput } from '../../components/TextInput/TextInput';
import { validateEmail } from '../../helpers/validators';
import useRegister from '../../hooks/useRegister';
import { useTitle } from '../../hooks/useTitle';

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            margin: '0 24px 12px 24px;'
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
    useTitle('Travel Project | Register');
    const { onSubmit, renderThanks, control, errors, validatePasswords } = useRegister();
    const classes = useStyles();

    const renderForm = () => {
        return (
            <>
                <Card raised>
                    <CardHeader
                        title={
                            <Typography variant='h2' align='center'>
                                Register.
                            </Typography>
                        }
                    />
                    <CardContent>
                        <form noValidate onSubmit={onSubmit} className={classes.form}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} className={classes.gridItem}>
                                    <ControllTextInput
                                        required
                                        fullWidth
                                        id='first_name'
                                        label='First Name'
                                        name='first_name'
                                        control={control}
                                        rules={{ required: 'First name is required.' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.gridItem}>
                                    <ControllTextInput
                                        required
                                        fullWidth
                                        id='last_name'
                                        label='Last Name'
                                        name='last_name'
                                        control={control}
                                        rules={{ required: 'Last name is required.' }}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <ControllTextInput
                                        required
                                        fullWidth
                                        id='email'
                                        label='Email'
                                        name='email'
                                        control={control}
                                        rules={{ required: 'Email is required.', validate: validateEmail }}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
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
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <ControllTextInput
                                        required
                                        fullWidth
                                        id='password2'
                                        label='Re-Password'
                                        name='password2'
                                        type='password'
                                        control={control}
                                        rules={{ required: 'Re-Password is required.', validate: validatePasswords }}
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Button type='submit' fullWidth variant='contained' color='primary'>
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                <Grid
                    container
                    alignItems='center'
                    alignContent='center'
                    justify='center'
                    className={classes.linksContainer}
                >
                    <Grid item>
                        <Link href='/login' variant='body2' className={classes.links}>
                            Already have account? Login
                        </Link>
                    </Grid>
                </Grid>
                <FormErrors errors={errors} />
            </>
        );
    };

    const renderThanksMessage = () => {
        return (
            <>
                <Typography variant='h2' align='center'>
                    Thank you for registering.
                </Typography>
                <Typography variant='h6' align='center'>
                    Please confirm your email address to continue.
                </Typography>
            </>
        );
    };

    return (
        <Container component='div' maxWidth='sm'>
            {renderThanks ? renderThanksMessage() : renderForm()}
        </Container>
    );
};

export default Register;
