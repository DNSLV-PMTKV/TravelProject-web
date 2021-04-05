import { useState } from 'react';
import { Control, DeepMap, FieldError, SubmitHandler, useForm } from 'react-hook-form';
import UserRequests from '../requests/userRequests';

type FormValues = {
    email: string;
    server: string;
};

interface ForgotPasswordReturnInterface {
    onSubmit: () => void;
    control: Control<FormValues>;
    errors: DeepMap<FormValues, FieldError>;
    mailSend: boolean;
}

const useForgotPassword = (): ForgotPasswordReturnInterface => {
    const { handleSubmit, errors, control, setError } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });
    const [mailSend, setMailSend] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        UserRequests.forgotPasswordEmail(data)
            .then(() => {
                setMailSend(true);
            })
            .catch(() => {
                setRequestErrors();
            });
    };

    const setRequestErrors = () => {
        setError('server', {
            type: 'validate',
            message: 'There is a problem with server. Please try again in a few minutes.'
        });
    };

    return {
        control,
        errors,
        onSubmit: handleSubmit(onSubmit),
        mailSend
    };
};
export default useForgotPassword;
