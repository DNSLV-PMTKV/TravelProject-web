import Axios, { AxiosPromise } from 'axios';
import { domain } from '../constants/config';

export interface LoginInterface {
    email: string;
    password: string;
}

export interface RegisterInterface {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
}

export interface ForgotPasswordEmailInterface {
    email: string;
}

export interface ResetPasswordInterface {
    token: string;
    password: string;
    password2: string;
}

export interface UserInfoInterface {
    first_name: string;
    last_name: string;
    email: string;
    id: number;
    is_active: boolean;
}

export default class UserRequests {
    static baseEndpoint = `${domain}api/users`;
    static loginEndpoint = `${domain}api/login`;
    static registerEndpoint = `${domain}api/register`;
    static confirmAccountEndpoint = `${domain}api/confirm`;
    static logoutEndpoint = `${domain}api/revoke`;
    static forgotPasswordEndpoint = `${domain}api/forgot_password`;
    static loggedUserEndpoint = `${domain}api/users/me`;

    static login = (data: LoginInterface): AxiosPromise => {
        return Axios.post(UserRequests.loginEndpoint, data);
    };

    static register = (data: RegisterInterface): AxiosPromise => {
        return Axios.post(UserRequests.registerEndpoint, data);
    };

    static forgotPasswordEmail = (data: ForgotPasswordEmailInterface): AxiosPromise => {
        return Axios.post(UserRequests.forgotPasswordEndpoint, data);
    };

    static verifyResetPasswordToken = (token: string): AxiosPromise => {
        return Axios.get(`${UserRequests.forgotPasswordEndpoint}?token=${token}`);
    };

    static resetPassword = (data: ResetPasswordInterface): AxiosPromise => {
        return Axios.put(UserRequests.forgotPasswordEndpoint, data);
    };

    static confirmAccount = (token: string): AxiosPromise => {
        return Axios.get(`${UserRequests.confirmAccountEndpoint}?token=${token}`);
    };

    static getLoggedUser = (): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return Axios.get(UserRequests.loggedUserEndpoint, { headers: headers });
    };

    static updateUserInfo = (userInfo: UserInfoInterface): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return Axios.put(`${UserRequests.baseEndpoint}/${userInfo.id}`, userInfo, { headers: headers });
    };
}
