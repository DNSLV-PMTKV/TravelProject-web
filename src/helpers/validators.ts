import { emailRegex } from '../constants/regex';

export const validateEmail = (email: string): boolean | string => {
    const re = emailRegex;
    return re.test(email.toLowerCase()) || 'Please enter valid email address.';
};
