import { AxiosPromise } from 'axios';
import axios from './AxiosInstance';
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
    profile_pic: string;
}

export interface ChangePasswordInterface {
    old_password: string;
    new_password: string;
    re_password: string;
}

export default class UserRequests {
    static baseEndpoint = `${domain}api/users`;
    static loginEndpoint = `${UserRequests.baseEndpoint}/login`;
    static logoutEndpoint = `${UserRequests.baseEndpoint}/logout`;
    static registerEndpoint = `${UserRequests.baseEndpoint}/register`;
    static confirmAccountEndpoint = `${UserRequests.baseEndpoint}/confirm`;
    static forgotPasswordEndpoint = `${UserRequests.baseEndpoint}/forgot_password`;
    static loggedUserEndpoint = `${UserRequests.baseEndpoint}/me`;
    static changePhotoEndpoint = `${UserRequests.baseEndpoint}/change_photo`;
    static changePasswordEndpoint = `${UserRequests.baseEndpoint}/change_password`;

    static login = (data: LoginInterface): AxiosPromise => {
        return axios.post(UserRequests.loginEndpoint, data);
    };

    static register = (data: RegisterInterface): AxiosPromise => {
        return axios.post(UserRequests.registerEndpoint, data);
    };

    static forgotPasswordEmail = (data: ForgotPasswordEmailInterface): AxiosPromise => {
        return axios.post(UserRequests.forgotPasswordEndpoint, data);
    };

    static verifyResetPasswordToken = (token: string): AxiosPromise => {
        return axios.get(`${UserRequests.forgotPasswordEndpoint}?token=${token}`);
    };

    static resetPassword = (data: ResetPasswordInterface): AxiosPromise => {
        return axios.put(UserRequests.forgotPasswordEndpoint, data);
    };

    static confirmAccount = (token: string): AxiosPromise => {
        return axios.get(`${UserRequests.confirmAccountEndpoint}?token=${token}`);
    };

    static getLoggedUser = (): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`
        };
        return axios.get(UserRequests.loggedUserEndpoint, { headers: headers });
    };

    static updateUserInfo = (userInfo: UserInfoInterface): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`
        };
        return axios.put(`${UserRequests.baseEndpoint}/${userInfo.id}`, userInfo, { headers: headers });
    };

    static changeProfilePicture = (data: FormData): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`
        };
        return axios.put(UserRequests.changePhotoEndpoint, data, { headers: headers });
    };

    static changePassword = (data: ChangePasswordInterface): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`
        };
        return axios.put(UserRequests.changePasswordEndpoint, data, { headers: headers });
    };

    static logout = (): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`
        };
        return axios.get(UserRequests.logoutEndpoint, { headers: headers });
    };
}
