import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { makeErrorNotification, makeSuccessNotification } from '../helpers/notifications';
import UserRequests, { UserInfoInterface } from '../requests/userRequests';

const emptyValuesUserData: UserInfoInterface = {
    first_name: '',
    last_name: '',
    email: '',
    id: -1,
    is_active: false
};

const useAccountInfo = () => {
    const { handleSubmit, errors, control, setValue } = useForm<UserInfoInterface>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: emptyValuesUserData
    });

    const [username, setUsername] = useState('');

    useEffect(() => {
        UserRequests.getLoggedUser()
            .then((res) => {
                setFormData(res.data);
            })
            .catch((err) => {
                if (err.message) {
                    makeErrorNotification(err.message);
                } else {
                    makeErrorNotification('Could not fetch information');
                }
            });
    }, []);

    const setFormData = (data: UserInfoInterface) => {
        setValue('first_name', data.first_name);
        setValue('last_name', data.last_name);
        setValue('email', data.email);
        setValue('id', data.id);
        setUsername(`${data.first_name.charAt(0)} ${data.last_name.charAt(0)}`);
        // setUsername('AA');
    };

    const onSubmit: SubmitHandler<UserInfoInterface> = (data) => {
        console.log(`data`, data);
        // UserRequests.updateUserInfo(data)
        //     .then((res) => {
        //         makeSuccessNotification('Successfully updated account information.');
        //         setUser(res.data);
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });
    };

    return {
        control,
        errors,
        username,
        onSubmit: handleSubmit(onSubmit)
    };
};

export default useAccountInfo;
