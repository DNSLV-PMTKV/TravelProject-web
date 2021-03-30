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
import React, { Fragment, useState } from 'react';
import { FormErrors } from '../../components/FormErrors/FormErrors';
import { TextInput } from '../../components/TextInput/TextInput';
import { useTitle } from '../../hooks/useTitle';
import UserRequests from '../../requests/userRequests';

interface Errors {
    email?: string[];
}

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

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [mailSend, setMailSend] = useState(false);
    const [errors, setErrors] = useState<Errors>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = { email: email };

        UserRequests.forgotPasswordEmail(data)
            .then(() => {
                setMailSend(true);
            })
            .catch((err) => {
                setErrors(err.response.data);
            });
    };

    const createErrorList = () => {
        return [errors?.email];
    };

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
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextInput
                                required
                                fullWidth
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type='submit' fullWidth variant='contained' color='primary'>
                                Send mail
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <FormErrors errors={createErrorList()} />
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
