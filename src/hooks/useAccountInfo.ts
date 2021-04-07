import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { domain } from '../constants/config';
import { makeErrorNotification, makeSuccessNotification } from '../helpers/notifications';
import UserRequests, { UserInfoInterface } from '../requests/userRequests';

const emptyValuesUserData: UserInfoInterface = {
    first_name: '',
    last_name: '',
    email: '',
    id: -1,
    is_active: false,
    profile_pic: ''
};

const useAccountInfo = () => {
    const { handleSubmit, errors, control, setValue } = useForm<UserInfoInterface>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: emptyValuesUserData
    });

    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const uploadRef = useRef<HTMLInputElement>(null);

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
        setProfilePicture(urlProfilePicture(data.profile_pic));
    };

    const handleUpload = () => {
        uploadRef.current?.click();
    };

    const handleCapture = (event: SyntheticEvent<EventTarget>) => {
        const fileReader = new FileReader();
        const file = (event.target as HTMLFormElement).files[0];

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            const data = new FormData();
            data.append('profile_pic', file);
            UserRequests.uploadPhoto(data).then((response) => {
                setProfilePicture(urlProfilePicture(response.data['profile_pic']));
            });
        };
    };

    const removePhoto = () => {
        UserRequests.removePhoto().then((response) => {
            setProfilePicture(urlProfilePicture(response.data['profile_pic']));
        });
    };

    const urlProfilePicture = (profilePic: string) => {
        if (profilePic) return `${domain}${profilePic.substring(1)}`;
        return '';
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
        uploadRef,
        profilePicture,
        onSubmit: handleSubmit(onSubmit),
        handleCapture,
        handleUpload,
        removePhoto
    };
};

export default useAccountInfo;
