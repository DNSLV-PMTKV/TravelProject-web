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

export default class UserRequests {
    static loginEndpoint = `${domain}api/login`;
    static registerEndpoint = `${domain}api/register`;
    static logoutEndpoint = `${domain}api/revoke`;

    static login = (data: LoginInterface): AxiosPromise => {
        return Axios.post(UserRequests.loginEndpoint, data);
    };

    static register = (data: RegisterInterface): AxiosPromise => {
        return Axios.post(UserRequests.registerEndpoint, data);
    };
}
