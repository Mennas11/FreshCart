import axios from 'axios';
import { API_CONFIG } from '../config/api-config';

export const apiClient = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: 30000
});

apiClient.interceptors.request.use(
    (response) => {
        return Promise.resolve ({
            success: true,
            data: response.data,
        });
    } ,
    (error) => {
        return Promise.reject({
            success: false,
            error: error,
            message: error.response.data.message,
        });
        }
    );  
        
