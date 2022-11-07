import axios from 'axios';
import { useMemo } from 'react';
import useEnvVars from './useEnvVars';

const useHttpService = () => {
    const { apiUrl } = useEnvVars();

    const apiClient = useMemo(() => {

        const _client = axios.create({
            baseURL: apiUrl,
            headers: {
                ['Content-Type']: 'application/json',
                ['Access-Control-Allow-Origin']: '*',
                ['Cache-Control']: 'no-cache, no-store, must-revalidate',
                ['Pragma']: 'no-cache',
                ['Expires']: '0',
            }
        });

        return _client;
    }, [apiUrl]);

    const authGet = (url: string) => {
        return apiClient.get(url);
    };

    const authPost = (url: string, data?: any) => {
        return apiClient.post(url, data ?? {});
    };

    return {
        apiClient,
        authGet,
        authPost,
    };
};

export default useHttpService;
