import Axios, { AxiosPromise } from 'axios';
import { domain } from '../constants/config';

export interface LoginInterface {
    email: string;
    password: string;
}

export default class UserRequests {
    static loginEndpoint = `${domain}api/login`;
    static logoutEndpoint = `${domain}api/revoke`;

    static login = (data: LoginInterface): AxiosPromise => {
        return Axios.post(UserRequests.loginEndpoint, data);
    };
}
