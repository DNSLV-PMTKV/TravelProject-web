import { AxiosPromise } from 'axios';
import axiosInstance from './AxiosInstance';
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

export default class UserRequests {
    static baseEndpoint = `${domain}api/users`;
    static loginEndpoint = `${domain}api/login`;
    static registerEndpoint = `${domain}api/register`;
    static confirmAccountEndpoint = `${domain}api/confirm`;
    static logoutEndpoint = `${domain}api/revoke`;
    static forgotPasswordEndpoint = `${domain}api/forgot_password`;
    static loggedUserEndpoint = `${domain}api/users/me`;
    static uploadPhotoEndpoint = `${domain}api/users/upload_photo`;
    static removePhotoEndpoint = `${domain}api/users/remove_photo`;

    static login = (data: LoginInterface): AxiosPromise => {
        return axiosInstance.post(UserRequests.loginEndpoint, data);
    };

    static register = (data: RegisterInterface): AxiosPromise => {
        return axiosInstance.post(UserRequests.registerEndpoint, data);
    };

    static forgotPasswordEmail = (data: ForgotPasswordEmailInterface): AxiosPromise => {
        return axiosInstance.post(UserRequests.forgotPasswordEndpoint, data);
    };

    static verifyResetPasswordToken = (token: string): AxiosPromise => {
        return axiosInstance.get(`${UserRequests.forgotPasswordEndpoint}?token=${token}`);
    };

    static resetPassword = (data: ResetPasswordInterface): AxiosPromise => {
        return axiosInstance.put(UserRequests.forgotPasswordEndpoint, data);
    };

    static confirmAccount = (token: string): AxiosPromise => {
        return axiosInstance.get(`${UserRequests.confirmAccountEndpoint}?token=${token}`);
    };

    static getLoggedUser = (): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return axiosInstance.get(UserRequests.loggedUserEndpoint, { headers: headers });
    };

    static updateUserInfo = (userInfo: UserInfoInterface): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return axiosInstance.put(`${UserRequests.baseEndpoint}/${userInfo.id}`, userInfo, { headers: headers });
    };

    static uploadPhoto = (data: any): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return axiosInstance.put(`${UserRequests.uploadPhotoEndpoint}`, data, { headers: headers });
    };

    static removePhoto = (): AxiosPromise => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return axiosInstance.put(`${UserRequests.removePhotoEndpoint}`, null, { headers: headers });
    };
}
