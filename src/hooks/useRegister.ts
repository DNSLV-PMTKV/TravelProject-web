import { AxiosError } from 'axios';
import { useState } from 'react';
import { Control, DeepMap, FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { emailRegex } from '../constants/regex';
import UserRequests from '../requests/userRequests';

type FormValues = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
    server: string;
};

interface RegisterReturnInterface {
    register: () => void;
    onSubmit: () => void;
    renderThanks: boolean;
    control: Control<FormValues>;
    errors: DeepMap<FormValues, FieldError>;
    validatePasswords: () => boolean | string;
}

const useRegister = (): RegisterReturnInterface => {
    const { register, handleSubmit, errors, control, getValues, setError } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });
    const [renderThanks, setRenderThanks] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        UserRequests.register(data)
            .then(() => {
                setRenderThanks(true);
            })
            .catch((err: AxiosError) => {
                setRequestErrors(err);
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
    };

    const validatePasswords = (): boolean | string => {
        return getValues('password') === getValues('password2') || 'Passwords do not match.';
    };

    const setRequestErrors = (error: AxiosError) => {
        if (error.request?.response) {
            if (error.response?.data['email']) {
                setError('email', { type: 'validate', message: capitalizeMessage(error.response?.data['email'][0]) });
            }
            if (error.response?.data['detail']) {
                setError('server', { type: 'validate', message: capitalizeMessage(error.response?.data['detail']) });
            }
        } else {
            setError('server', {
                type: 'validate',
                message: 'There is a problem with server. Please try again in a few minutes.'
            });
        }
    };

    const capitalizeMessage = (message: string): string => {
        return message.charAt(0).toUpperCase() + message.slice(1);
    };

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        renderThanks,
        control,
        errors,
        validatePasswords
    };
};

export default useRegister;
