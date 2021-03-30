// import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import UserRequests from '../requests/userRequests';

type FormValues = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
};

const useRegister = () => {
    const { register, handleSubmit, errors, control } = useForm<FormValues>();
    // const [renderThanks, setRenderThanks] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('data', data);
        // UserRequests.register(data)
        //     .then(() => {
        //         setRenderThanks(true);
        //     })
        //     .catch((err) => {
        //         // setErrors(err.response.data);
        //         window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        //     });
    };

    return {
        register,
        onSubmit: handleSubmit(onSubmit),
        renderThanks: false,
        control
    };
};

export default useRegister;
