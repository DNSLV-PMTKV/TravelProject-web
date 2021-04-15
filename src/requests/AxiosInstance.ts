import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { domain } from '../constants/config';

const axiosInstance: AxiosInstance = axios.create();

let isRefreshing = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = [];

const processQueue = (error: AxiosError | null, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        const originalRequest = error.config;
        const url = error.config.url;
        if (error.response?.status === 401 && url !== `${domain}api/users/login`) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Autorization'] = 'Bearer ' + token;
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;
            const refreshToken = window.localStorage.getItem('refresh');
            return new Promise((resolve, reject) => {
                axios
                    .post(`${domain}api/token/refresh`, { refresh: refreshToken })
                    .then((response) => {
                        window.localStorage.setItem('token', response.data['access']);
                        window.localStorage.setItem('refresh', response.data['refresh']);
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data['access'];
                        originalRequest.headers['Authorization'] = 'Bearer ' + response.data['access'];
                        processQueue(null, response.data['access']);
                        resolve(axios(originalRequest));
                    })
                    .catch((err: AxiosError) => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
