import { AxiosError } from 'axios';
import { Control, DeepMap, FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { emailRegex } from '../constants/regex';
import { setAuthenticated } from '../redux/users/userActions';
import UserRequests from '../requests/userRequests';

type FormValues = {
    email: string;
    password: string;
    server: string;
};

interface LoginReturnInterface {
    register: () => void;
    onSubmit: () => void;
    control: Control<FormValues>;
    errors: DeepMap<FormValues, FieldError>;
}

const useLogin = (): LoginReturnInterface => {
    const { register, handleSubmit, errors, control, setError } = useForm<FormValues>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        UserRequests.login(data)
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(setAuthenticated(true));
            })
            .then(() => {
                history.push('/');
            })
            .catch((err: AxiosError) => {
                setRequestErrors(err);
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            });
    };

    const setRequestErrors = (error: AxiosError) => {
        if (error.request?.response) {
            if (error.response?.data['non_field_errors']) {
                setError('server', { type: 'validate', message: error.response?.data['non_field_errors'][0] });
            }
        } else {
            setError('server', {
                type: 'validate',
                message: 'There is a problem with server. Please try again in a few minutes.'
            });
        }
    };

    return {
        register,
        control,
        errors,
        onSubmit: handleSubmit(onSubmit)
    };
};

export default useLogin;
