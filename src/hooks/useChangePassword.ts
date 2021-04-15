import { AxiosError } from 'axios';
import { useState } from 'react';
import { Control, DeepMap, FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { makeSuccessNotification } from '../helpers/notifications';
import UserRequests, { ChangePasswordInterface } from '../requests/userRequests';

interface ChangePassowrdReturnInterface {
    changePasswordSubmit: () => void;
    changePasswordControl: Control<ChangePasswordInterface>;
    changePassowordErrors: DeepMap<ChangePasswordInterface, FieldError>;
    changePasswordModalOpen: boolean;
    setChangePasswordModalOpen: (value: boolean) => void;
    closeModal: () => void;
}

const useChangePassword = (): ChangePassowrdReturnInterface => {
    const { handleSubmit, errors, control, reset, setError } = useForm<ChangePasswordInterface>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });
    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

    const onSubmit: SubmitHandler<ChangePasswordInterface> = (data) => {
        UserRequests.changePassword(data)
            .then(() => {
                closeModal();
                makeSuccessNotification('Successfully updated your password.');
            })
            .catch((err: AxiosError) => {
                setRequestErrors(err);
            });
    };

    const setRequestErrors = (error: AxiosError) => {
        if (error.request?.response) {
            if (error.response?.data['non_field_errors']) {
                setError('new_password', { type: 'validate', message: error.response?.data['non_field_errors'] });
            }
        } else {
            setError('old_password', {
                type: 'validate',
                message: 'There is a problem with server. Please try again in a few minutes.'
            });
        }
    };

    const closeModal = () => {
        reset();
        setChangePasswordModalOpen(false);
    };

    return {
        changePassowordErrors: errors,
        changePasswordModalOpen,
        setChangePasswordModalOpen,
        changePasswordSubmit: handleSubmit(onSubmit),
        changePasswordControl: control,
        closeModal
    };
};

export default useChangePassword;
