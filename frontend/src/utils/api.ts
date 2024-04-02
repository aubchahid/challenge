import axios, { AxiosError } from 'axios';

axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

const api = (baseURL = import.meta.env.VITE_API_URL, token = localStorage.getItem('token')) => {
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    });

    instance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response) {
                const { data } = error.response;
                return Promise.reject(data);
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default api;