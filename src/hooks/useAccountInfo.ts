import { RefObject, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Control, DeepMap, FieldError, SubmitHandler, useForm } from 'react-hook-form';
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

interface AccountInfoReturnInterface {
    username: string;
    profilePicture: string;
    control: Control<UserInfoInterface>;
    errors: DeepMap<UserInfoInterface, FieldError>;
    uploadRef: RefObject<HTMLInputElement>;
    onSubmit: () => void;
    handleCapture: (event: SyntheticEvent<EventTarget>) => void;
    handleUpload: () => void;
    removePhoto: () => void;
}

const useAccountInfo = (): AccountInfoReturnInterface => {
    const { handleSubmit, errors, control, setValue } = useForm<UserInfoInterface>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: emptyValuesUserData
    });

    const [username, setUsername] = useState('');
    const [id, setId] = useState(-1);
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
        setId(data.id);
        setUsername(`${data.first_name.charAt(0).toUpperCase()}${data.last_name.charAt(0).toUpperCase()}`);
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
            UserRequests.changeProfilePicture(data).then((response) => {
                makeSuccessNotification('Successfully updated your profile picture.');
                setProfilePicture(urlProfilePicture(response.data['profile_pic']));
            });
        };
    };

    const removePhoto = () => {
        const data = new FormData();
        data.append('profile_pic', '');
        UserRequests.changeProfilePicture(data).then((response) => {
            makeSuccessNotification('Successfully removed your profile picture.');
            setProfilePicture(urlProfilePicture(response.data['profile_pic']));
        });
    };

    const urlProfilePicture = (profilePic: string) => {
        if (profilePic) return `${domain}${profilePic.substring(1)}`;
        return '';
    };

    const onSubmit: SubmitHandler<UserInfoInterface> = (data) => {
        data.id = id;
        UserRequests.updateUserInfo(data)
            .then((res) => {
                makeSuccessNotification('Successfully updated account information.');
                setFormData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
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
