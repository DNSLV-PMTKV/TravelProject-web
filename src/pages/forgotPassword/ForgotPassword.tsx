import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    createStyles,
    makeStyles,
    Typography
} from '@material-ui/core';
import React, { Fragment } from 'react';
import { FormErrors } from '../../components/FormErrors/FormErrors';
import { ControllTextInput } from '../../components/TextInput/TextInput';
import { validateEmail } from '../../helpers/validators';
import useForgotPassword from '../../hooks/useForgotPassword';
import { useTitle } from '../../hooks/useTitle';

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            margin: '0 24px 12px 24px;'
        },
        emailMessage: {
            marginTop: '5%'
        }
    })
);

const ForgotPassword: React.FC = () => {
    useTitle('Travel Project | Forgot Password');
    const { onSubmit, control, mailSend, errors } = useForgotPassword();
    const classes = useStyles();

    const renderForm = () => {
        return (
            <Fragment>
                <Card>
                    <CardHeader
                        title={
                            <Fragment>
                                <Typography variant='h2' align='center'>
                                    Reset Your Password
                                </Typography>
                                <Typography variant='body1' align='center'>
                                    Enter your email address below to receive your password reset instructions.
                                </Typography>
                            </Fragment>
                        }
                    />
                    <CardContent>
                        <form noValidate onSubmit={onSubmit} className={classes.form}>
                            <ControllTextInput
                                required
                                fullWidth
                                id='email'
                                label='Email'
                                name='email'
                                control={control}
                                rules={{ required: 'Email is required.', validate: validateEmail }}
                            />
                            <Button type='submit' fullWidth variant='contained' color='primary'>
                                Send mail
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <FormErrors errors={errors} />
            </Fragment>
        );
    };

    const renderCheckMailMessage = () => {
        return (
            <Fragment>
                <Typography variant='h2' align='center' className={classes.emailMessage}>
                    Check your email
                </Typography>
                <Typography variant='h6' align='center'>
                    We have send you a reset password instructions on your registered email.
                </Typography>
            </Fragment>
        );
    };

    return (
        <Container component='div' maxWidth='sm'>
            {mailSend ? renderCheckMailMessage() : renderForm()}
        </Container>
    );
};

export default ForgotPassword;
