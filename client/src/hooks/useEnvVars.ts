import React from 'react';

const useEnvVars = () => {
    return {
        apiUrl: process.env.REACT_APP_API_URL ?? '/api/',
    }
}

export default useEnvVars;